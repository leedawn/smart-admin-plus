function normalizeRouteRecord(record) { // 格式化用户的参数
    return {
        path: record.path, // 状态机 解析路径的分数，算出匹配规则
        meta: record.meta || {},
        beforeEnter: record.beforeEnter,
        name: record.name,
        components: { // a? b?
            default: record.component // 循环
        },
        children: record.children || [],
        // 离开 更新的组合式api存储
        leaveGuards:[],
        updateGuards:[]
    };
}

function createRouteRecordMatcher(record, parent) { // 创造匹配记录 ，构建父子关系
    // record 中的path 做一些修改 正则的情况 
    const matcher = {
        path: record.path,
        record,
        parent,
        children: []
    }
    if (parent) {
        parent.children.push(matcher);
    }
    return matcher;
}
// 树的遍历
function createRouterMatcher(routes) {
    const matchers = [];
    // 动态添加路由，构建父子关系
    function addRoute(route, parent) {
        let normalizedRecord = normalizeRouteRecord(route);
        if (parent) {
            normalizedRecord.path = parent.path + normalizedRecord.path
        }
        const matcher = createRouteRecordMatcher(normalizedRecord, parent);
        if ('children' in normalizedRecord) {
            let children = normalizedRecord.children;
            for (let i = 0; i < children.length; i++) {
                // 如果当前路由有子孙，那就可以开始构建父子关系
                addRoute(children[i], matcher);
            }
        }
        matchers.push(matcher)
    }

    routes.forEach(route => addRoute(route));
    console.log(matchers,'matchers');
    // 拍平数组
    function resolve(location){ // {path:/,matched:HomeRecord} {path:/a,matched:[HomeRecord,aRecord]}
        const matched = []; // /a
        let path =  location.path;
        let matcher =  matchers.find(m=> m.path === path);
        while(matcher){
            // 向matched开头添加元素, 数组顺序是 先父后子
            matched.unshift(matcher.record); // 将用户的原始数据 放到matched中
            // 不断向父亲寻找，直到尽头
            matcher = matcher.parent;
        }
        return {
            path,
            matched
        }
    }
    return {
        resolve,
        addRoute // 动态的添加路由， 面试问路由 如何动态添加 就是这个api
    }
}

export {createRouterMatcher}