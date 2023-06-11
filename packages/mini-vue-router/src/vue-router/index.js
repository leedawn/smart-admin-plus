import { createWebHashHistory } from './history/hash'
import { createWebHistory } from './history/html5'
import { ref, shallowRef, computed, reactive, unref,inject } from 'vue'
import { RouterLink } from './router-link'
import { RouterView } from './router-view'
import { createRouterMatcher } from './matcher'
// 数据处理 options.routes 是用户的配置 ， 难理解不好维护

// /  =>  record {Home}
// /a =>  record {A,parent:Home}
// /b => record {B,parent:Home}
// /about=>record

// 初始化路由系统中的默认参数
const START_LOCATION_NORMALIZED = { 
    path: '/',
    // params:{}, // 路径参数
    // query:{},
    matched: [], // 当前路径匹配到的父子组件
}

// 添加存储 router上全局的钩子
function useCallback() {
    const handlers = [];

    function add(handler) {
        handlers.push(handler)
    }
    return {
        add,
        list: () => handlers
    }
}
// 判断组件是进入、还是离开、还是更新extractChangingRecords
function extractChangeRecords(to, from) {
    // 离开
    const leavingRecords = [];
    // 更新
    const updatingRecords = [];
    // 进入
    const enteringRecords = [];
    // 因为to和from两个页面中用到的组件长度不一定，为了全部遍历到，我们取两者最长的。
    const len = Math.max(to.matched.length, from.matched.length);
    console.log(to,from,22222);
    // matched中存着的是当前路由从 顶层开始的所有子孙路由信息
    for (let i = 0; i < len; i++) {
        const recordFrom = from.matched[i];
        if (recordFrom) { // / [home]  /a   [home,A]  /b [home,B]
            // 如果to的路由信息中 有 和from一样的  那么该路由对应的vue组件 就是更新
            if (to.matched.find(record => record.path == recordFrom.path)) {
                updatingRecords.push(recordFrom);
            } else {
                // 如果没有，那么就是离开
                leavingRecords.push(recordFrom)
            }
        }
        const recrodTo = to.matched[i]
        if (recrodTo) {
            // 来的中没有去的
            // from来的路由中 没有 to到达的路由，那么该路由对应的vue组件就是进入
            if(!from.matched.find(record=>record.path === recrodTo.path)){
                enteringRecords.push(recrodTo)
            }
        }
    }
    return [leavingRecords,updatingRecords,enteringRecords]

}

// 将函数用promise包装 
function guardToPromise(guard,to,from,record){
    // return promise
    return ()=> new Promise((resolve,reject)=>{
        const next = () => resolve()
        let guardReturn = guard.call(record,to,from,next)
        // 如果不调用next最终也会调用next， 用户可以不调用next方法
        return Promise.resolve(guardReturn).then(next)
    })
}
// 组件中的钩子函数，将所有用到的组件中需要触发对应路由钩子函数添加到数组中返回
function extractComponentsGuards(matched,guradType,to,from){ 
    const guards = [];
    // matched：该离开状态下对应的所有vue文件，而排序是从父到子
    for(const record of matched){
       let rawComponent =  record.components.default
       // 获取组件中的路由钩子函数
       const guard = rawComponent[guradType];
       // 我需要将钩子 全部串联在一起  用promise包装
       guard && guards.push(guardToPromise(guard,to,from,record))
    }
    return guards;
}


function createRouter(options) {
    console.log(options,'options');
    const routerHistory = options.history;

    const matcher = createRouterMatcher(options.routes); // 格式化路由的配置 拍平 
    console.log(matcher,'matcher')
    
    // 为什么要用shallowRef？因为最后在路由跳转中会直接改变value，给currentRoute.value绑定响应式，但是value里面的数据不是响应式
    // 在install中会将currentRoute.value里面的值变成计算属性
    const currentRoute = shallowRef(START_LOCATION_NORMALIZED);

    const beforeGuards = useCallback();
    const beforeResolveGuards = useCallback();
    const afterGuards = useCallback();

    // vue2 中有两个属性 $router 里面包含的时方法  $route 里面包含的属性


    function resolve(to) { // to的两种数据结构：to="/"   to={path:'/'}
        if (typeof to === 'string') {
            return matcher.resolve({ path: to })
        }
    }


    let ready;// 只执行一次
    // 监听浏览器的前进、后退
    function markAsReady() {
        if (ready) return
        ready = true; // 用来标记已经渲染完毕了
        routerHistory.listen((to) => {
            const targetLocation = resolve(to);
            console.log(targetLocation,'targetLocation');
            const from = currentRoute.value;
            // 因为listen注入一次，之后的每次浏览器前进都退都会调用这个函数，在markAsReady中调用finalizeNavigation
            finalizeNavigation(targetLocation, from, true); // 在切换前进后退 true 替换模式  false push模式
        })
    }



    // 路由跳转，并且判断是否是第一次进入路由页面
    function finalizeNavigation(to, from, replaced) {
        if (from === START_LOCATION_NORMALIZED || replaced) {
            routerHistory.replace(to.path);
        } else {
            routerHistory.push(to.path);
        }
        // 路由系统的响应式，就是靠currentRoute来实现
        currentRoute.value = to; // 更新最新的路径

        // 如果是初始化 我们还需要注入一个listen 去更新currentRoute的值，这样数据变化后可以重新渲染视图
        // 监听浏览器的前进后退
        markAsReady();
        
    }
    // promise的组合函数
    function runGuardQueue(guards){ // []
        return guards.reduce((promise,guard)=>promise.then(()=> guard()),Promise.resolve())
    }

    async function navigate(to, from) {
        // 在做导航的时候 我要知道哪个组件是进入，哪个组件是离开的，还要知道哪个组件是更新的
        const [leavingRecords, updatingRecords, enteringRecords] = extractChangeRecords(to, from)
        
        // 我离开的时候 需要从后往前   /home/a  -> about  先从a离开，在离开home
        // 不是组合式api的组件离开钩子函数
        let guards = extractComponentsGuards(
            leavingRecords.reverse(), // 将数组反转
            'beforeRouteLeave', // 离开的钩子函数名称
            to,
            from
        )
        // 获取组合式api的组件离开钩子函数
        for (const record of leavingRecords) {
            // 还没有实现组合式api
            record.leaveGuards.forEach(guard => {
              guards.push(guardToPromise(guard, to, from))
            })
          }

        // 组件离开钩子 --> 全局beforeEach --> 组件更新钩子 --> 路由独享钩子 --> 组件进入钩子 --> 全局路由解析钩子
        console.log('组件离开钩子');
        return runGuardQueue(guards).then(()=>{
            guards = [];
            // 全局的 beforeEach
            for(const guard of beforeGuards.list()){
                guards.push(guardToPromise(guard,to,from,guard))
            }
            console.log('全局的 beforeEach');
            // 只有当
            return runGuardQueue(guards)
        }).then(()=>{
            // 获取不是组合式api的组件钩子函数
            guards = extractComponentsGuards(
                updatingRecords,
                'beforeRouteUpdate',
                to,
                from
            )
            // 组合式api组件更新钩子
            for (const record of updatingRecords) {
                // 还没有实现组合式api
                record.updateGuards.forEach(guard => {
                  guards.push(guardToPromise(guard, to, from))
                })
              }
            
            console.log(guards,'组件更新');
            return runGuardQueue(guards)
        }).then(()=>{
            guards = [];
            for(const record of to.matched){
                if(record.beforeEnter){
                    guards.push(guardToPromise(record.beforeEnter,to,from,record))
                }
            }
            console.log('路由独享钩子');
            return runGuardQueue(guards)
        }).then(()=>{
            // 获取不是组合式api的组件钩子函数
            guards = extractComponentsGuards(
                enteringRecords,
                'beforeRouteEnter',
                to,
                from
            )
            // 组合式api组件没有进入钩子
            
            console.log('进入组件的钩子');
            return runGuardQueue(guards)
        }).then(()=>{
            guards = []
            for(const guard of beforeResolveGuards.list()){
                guards.push(guardToPromise(guard,to,from,guard))
            }
            console.log('全局的 解析钩子');
            return runGuardQueue(guards)
        })
    }

    // 通过路径匹配到对应的记录，更新currentRoute
    function pushWithRedirect(to) { 
        // 通过初始化时拍平的数组来解析 to 找到它 和 它所有的父路由，构建出一个父子组件的数组
        const targetLocation = resolve(to);
        console.log(to,targetLocation,'targetLocation');
        // 从哪里来
        const from = currentRoute.value;
        // 路由的钩子 在跳转前我们可以做路由的拦截

        // 路由的导航守卫 有几种呢？ 全局钩子 路由钩子 组件上的钩子 
        navigate(targetLocation, from).then(() => {
            // 根据是不是第一次，来决定是 push 还是replace
            return finalizeNavigation(targetLocation, from)
        }).then(() => {
            // 当导航切换完毕后执行 afterEach
            for (const guard of afterGuards.list()) guard(to, from)
        })

        
    }

    function push(to) {
        return pushWithRedirect(to);
    }
    // reactive computed
    const router = {
        push,
        beforeEach: beforeGuards.add, // 可以注册多个 所以是一个发布订阅模式
        afterEach: afterGuards.add,
        beforeResolve: beforeResolveGuards.add,
        install(app) { // 路由的核心就是 页面切换 ，重新渲染
            const router = this;
            app.config.globalProperties.$router = router; // 方法
            // 使用 defineProperty的 原因是，如果直接赋值 = currentRoute，不是动态的，
            // 当我们使用defineProperty的时，每次在get中获取动态的值
            Object.defineProperty(app.config.globalProperties, '$route', { // 属性
                enumerable: true,
                get: () => unref(currentRoute)
            })
            const reactiveRoute = {};
            // 将currentRoute.value里面的数据变成计算属性
            for (let key in START_LOCATION_NORMALIZED) { //
                reactiveRoute[key] = computed(() => currentRoute.value[key]);
            }
     
            // vuex const store = useStore()
            app.provide('router', router); // 暴露路由对象 

            // route 将 reactive(reactiveRoute)的意义，reactiveRoute对象是计算属性要用.value 访问，使用reactive包裹可以去掉.value
            app.provide('route location', reactive(reactiveRoute)); // 用于实现useApi

            
            // vur-router4也可以使用一个函数将userRouter 或者 userRoute将 inject('router')d导出

            // let router = useRouter(); // inject('router')a
            // let route = useRoute();// inject('route location')

            app.component('RouterLink', RouterLink);
            app.component('RouterView', RouterView);

            // 初始化安装router时
            if (currentRoute.value == START_LOCATION_NORMALIZED) {
                // 默认就是初始化, 需要通过路由系统先进行一次跳转 发生匹配
                push(routerHistory.location)
            }

        }
    }
    return router;
}



// api组件生命钩子
function onBeforeRouteLeave(leaveGuard) {
   
    // 通过inject获取从<router-view />组件中传递下去的数据
    const activeRecord = inject('router view location matched', {}).value;
    if (!activeRecord) {
        warn('No active route record was found. Are you missing a <router-view> component?');
        return;
    }
    registerGuard(activeRecord, 'leaveGuards', leaveGuard);
}
function onBeforeRouteUpdate(updateGuard) {
    
    const activeRecord = inject('router view location matched', {}).value;
    if (!activeRecord) {
        warn('No active route record was found. Are you missing a <router-view> component?');
        return;
    }
    registerGuard(activeRecord, 'updateGuards', updateGuard);
}

function registerGuard(record, name, guard) {
    // const removeFromList = () => {
    //     record[name].delete(guard);
    // };
    // vue.onUnmounted(removeFromList);
    // vue.onDeactivated(removeFromList);
    // vue.onActivated(() => {
    //     record[name].add(guard);
    // });
    // 将当前路由信息上绑定 组件式api 的钩子函数。
    record[name].push(guard);
}
export {
    createWebHashHistory,
    createWebHistory,
    createRouter,
    onBeforeRouteLeave,
    onBeforeRouteUpdate
}