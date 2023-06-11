import { h, inject, provide, computed } from 'vue'
export const RouterView = {
    name: 'RouterView',
    // props:{
    //     name:
    // }
    setup(props, { slots }) { // 只会执行一次
        // 渲染组件的顺序，因为matched是一个深层父子组件数组。可能router-view可能有好几个
        // 例如 /a是在/下面，这时候要先渲染最顶层的router-view，进入home文件在渲染home中的router-view，这时候就是a

        // 默认是 0
        const depth = inject('depth', 0);
        const injectRoute = inject('route location')
        const matchedRouteRef = computed(() => injectRoute.matched[depth])
        // 执行完第一次后，让其 + 1
        provide('depth', depth + 1)
        provide('router view location matched',matchedRouteRef)
        

        return () => { // /a路由：  [home,a]
            const matchRoute = matchedRouteRef.value; // record
            // 获取到组件
            const viewComponent = matchRoute && matchRoute.components.default

            if (!viewComponent) {
                return slots.default && slots.default();
            }
            // 渲染组件
            return h(viewComponent)
        }
    }
}