import { computed, effectScope, getCurrentInstance, inject, reactive, toRaw, toRefs } from "vue";
import { piniaSymbol } from "./pinia";

export function createStore(options) {
  const { id } = options;

  return function useStore() {
    let pinia;
    const currentInstance = getCurrentInstance();
    if (currentInstance) {
      pinia = inject(piniaSymbol); // 从 vue 实例中获取注册的 pinia 对象
    }
    if (!pinia._s.has(id)) {
      createOptionsStore(id, options, pinia);
    }
    const store = pinia._s.get(id);
    return store;
  };
}

function createOptionsStore(id, options, pinia) {
  const { state, actions, getters = {} } = options;
  function setup() {
    pinia.state.value[id] = state();
    const localState = toRefs(pinia.state.value[id]);

    // 对计算属性进行转换，使用 computed 进行包装。  觉得非常牛逼
    const computedGetters = Object.keys(getters).reduce((obj, name) => {
      obj[name] = computed(() => {
        const store = pinia._s.get(id);
        return getters[name].call(store, store);
      });
      return obj;
    }, {});
    return Object.assign(localState, actions, computedGetters); // setup 函数把数据保存到 pinia.state，并把每个数据转成 ref 对象
  }

  const store = createSetupStore(id, setup, pinia);

  // 将 state 进行重置
  store.$reset = function () {
    this.$patch((store) => {
      Object.assign(store, state());
    });
  };

  return store;
}

function createSetupStore(id, setup, pinia) {
  // 修改 state
  function $patch(mutation) {
    if (typeof mutation === "function") {
      mutation(pinia.state.value[id]);
    }
  }

  const particalStore = {
    _p: pinia,
    $patch,
  };

  let scope;
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup());
  });

  const store = reactive(Object.assign(particalStore, setupStore)); // 将返回的内容都变成响应式的，比如 action 变成响应式后，触发就会使界面上的数据变动
  pinia._s.set(id, store);
  return store;
}
