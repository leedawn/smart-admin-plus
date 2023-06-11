function buildState(back, current, forward, replace = false, computedScroll = false) {
    return {
        back,
        current,
        forward,
        replace,
        scroll: computedScroll ? { left: window.pageXOffset, top: window.pageYOffset } : null,
        position: window.history.length - 1
    }
}
function stripBase(pathname, base) {
    // no base or base is not found at the beginning
    if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
      return pathname
    return pathname.slice(base.length) || '/'
  }
  
function createCurrentLocation(base) {
    const { pathname, search, hash } = window.location;

      // 找到 base 中 # 出现的位置
      const hashPos = base.indexOf('#'); // 就是hash  / /about ->  #/ #/about
      if(hashPos > -1){
          /**
           *  base.slice(hashPos)：将 base #号之前的字符串删掉
           *  hash.includes：hash中是否存在 base #号之后字符
           * 
           * 如果存在 slicePos就是 # 号之后的字符长度，否则 就是 1
           * 
           * 因为base可能是 #!/ 。。。。
           */
          let slicePos = hash.includes(base.slice(hashPos))
              ? base.slice(hashPos).length
              : 1
          
              // 去除掉hash路径等#，拿到类似于 his 的路径
          let pathFromHash = hash.slice(slicePos)
          // prepend the starting slash to hash so the url starts with /#
          if (pathFromHash[0] !== '/') pathFromHash = '/' + pathFromHash

          return stripBase(pathFromHash, '')

          // return hash.slice(base.length) || '/'
    }
    return pathname + search + hash
}

function useHistoryStateNavigation(base) {
    const currentLocation = {
        value: createCurrentLocation(base)
    }
    const historyState = {
        value: window.history.state
    }
    // 第一次刷新页面 此时没有任何状态，那么我就自己维护一个状态 （后退后是哪个路径、当前路径是哪个、要去哪里，我是用的push跳转还是replace跳转，跳转后滚动条位置是哪）
    if (!historyState.value) {
        changeLocation(currentLocation.value, buildState(null, currentLocation.value, null, true), true)
    }

    function changeLocation(to, state, replace) {
        // 如果是hash模式，在前面拼一个 #
        const hasPos = base.indexOf('#');
        const url = hasPos > -1 ? base + to : to;
        // window.history会同步更新window.history.state
        window.history[replace ? 'replaceState' : 'pushState'](state, null, url);
        historyState.value = state; // 将自己生成的状态同步到了 路由系统中了
    }

    // 去哪，带的新的状态是谁？
    function push(to, data) { 
        // 跳转的时候 我需要做两个状态 一个是跳转前 从哪去哪 
        const currentState = Object.assign({},
            historyState.value, // 当前的状态
            { forward: to, scroll: { left: window.pageXOffset, top: window.pageYOffset } }
        )
        // 本质是没有跳转的 只是更新了状态，后续在vue中我可以详细监控到状态的变化
        changeLocation(currentState.current, currentState, true)
        const state = Object.assign({},
            buildState(currentLocation.value, to, null), { position: currentState.position + 1 },
            data
        )
        changeLocation(to, state, false); // 真正的更改路径
        currentLocation.value = to;
        // 跳转后 从这到了那
    }

    function replace(to, data) {
        const state = Object.assign({},
            buildState(historyState.value.back, to, historyState.value.forward, true),
            data
        )
        changeLocation(to, state, true);
        currentLocation.value = to; // 替换后需要将路径变为现在的路径
    }
    return {
        location: currentLocation,
        state: historyState,
        push,
        replace
    }
}
// 前进后退的时候 要更新historyState 和 currentLocation这两个边路
function useHistoryListeners(base,historyState, currentLocation) {
    let listeners = []
    const popStateHandler = ({ state }) => { // 最新的状态，已经前进后退完毕后的状态
        const to = createCurrentLocation(base); // 去哪
        const from = currentLocation.value; // 从哪来
        const fromState = historyState.value; // 从哪来的状态

        // 更新最新的状态
        currentLocation.value = to;
        historyState.value = state; // state 可能会为null
        // 判断前进还是后退
        let isBack = state.position - fromState.position < 0

        // 用户在这扩展.....
        listeners.forEach(listener => {
            listener(to, from, { isBack })
        })
    }

    window.addEventListener('popstate', popStateHandler); // 只能监听浏览器的前进厚涂
    function listen(cb) {
        listeners.push(cb);
    }
    return {
        listen
    }
}
export function createWebHistory(base = '') {
    // 1.路由系统最基本的 得包含当前的路径，当前路径下他的状态是什么, 需要提供两个切换路径的方法 push replace
    const historyNavigation = useHistoryStateNavigation(base);
    // 2.监听浏览器的前进、后退按钮
    const historyListeners = useHistoryListeners(base,historyNavigation.state, historyNavigation.location);
    // 3.将上面两个数据合并导出
    const routerHistory = Object.assign({}, historyNavigation, historyListeners)

    Object.defineProperty(routerHistory, 'location', { // 代理模式
        get: () => historyNavigation.location.value
    })
    Object.defineProperty(routerHistory, 'state', {
        get: () => historyNavigation.state.value
    })
    return routerHistory

    // routerHistory.location 代表当前的路径
    // routerHistory.state 代表当前的状态
    // push / replace 切换路径和状态

    // listen 可以接受用户的一个回调，当用户前进后退时可以触发此方法
}


