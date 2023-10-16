function createStore(reducer, initState, enhancer) {
  let state = initState;
  let listeners = [];
  if (enhancer) {
    return enhancer(createStore)(reducer, initState);
  }

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((cb) => cb());
  }

  function subscribe(cb) {
    listeners.push(cb);
  }

  function unscribe(cb) {
    const index = listeners.indexOf(cb);
    listeners.splice(index, 1);
  }

  return {
    subscribe,
    unscribe,
    dispatch,
    getState,
  };
}

// @ts-ignore
const initState = {
  milk: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "PUT_MILK":
      return { ...state, milk: state.milk + action.count };
    case "TAKE_MILK":
      return { ...state, milk: state.milk - action.count };
    default:
      return state;
  }
}

// 记录日志
const loggerMiddleware = (store) => (next) => (action) => {
  console.log("this.state", store.getState());
  console.log("action", action);
  next(action);
  console.log("next state", store.getState());
};

// 记录异常
const exceptionMiddleware = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (error) {
    console.log("错误报告", error);
  }
};

// 时间戳
const timeMiddleware = (store) => (next) => (action) => {
  console.log("time", new Date().getTime());
  next(action);
};

const applyMiddleware = (...middlewares) => {
  return (oldCreateStore) => {
    return (reducer, initState) => {
      const store = oldCreateStore(reducer, initState);
      // 以下为新增
      const chain = middlewares.map((middleware) => middleware(store));
      // 获得老 dispatch
      let dispatch = store.dispatch;
      chain.reverse().map((middleware) => {
        // 给每个中间件传入原派发器，赋值中间件改造后的dispatch
        dispatch = middleware(dispatch);
      });
      // 赋值给 store 上的 dispatch
      store.dispatch = dispatch;
      return store;
    };
  };
};

// @ts-ignore
let store = createStore(reducer, initState, applyMiddleware(loggerMiddleware, exceptionMiddleware, timeMiddleware));

store.subscribe(() => console.log(store.getState()));

// 将action发出去要用dispatch
store.dispatch({ type: "PUT_MILK", count: 1 }); // milk: 1
// store.dispatch({ type: "PUT_MILK", count: 1 }); // milk: 2
// store.dispatch({ type: "TAKE_MILK", count: 1 }); // milk: 1
