import { computed, inject, reactive, toRefs } from "vue";
import { piniaSymbol } from "./pinia";

import { Pinia } from "./pinia";

export interface storeOptions {
  state: Record<string, any>;
  getters: () => any;
  actions: Record<string, Function>;
}

export function createStore(id: string, options) {
  function useStore() {
    const pinia = inject(piniaSymbol) as Pinia;
    let store = pinia._s.get(id);
    if (!store) {
      store = createOptionStore(id, options, pinia);
    }
    return store;
  }
  return useStore;
}

function createOptionStore(id, options, pinia) {
  const { state, getters, actions } = options;
  function setup() {
    pinia.state.value[id] = state();
    const localState = toRefs(pinia.state.value[id]);
    const computedGetters = Object.keys(getters).reduce((obj, name) => {
      obj[name] = computed(() => {
        const store = pinia._s.get(id);
        return getters[name].call(store, store);
      });
      return obj;
    }, {});
    return Object.assign({}, localState, computedGetters, actions);
  }
  const store = createSetupStore(id, setup, pinia);
  return store;
}

function createSetupStore(id, setup, pinia) {
  const particalStore = {};
  const store = reactive(Object.assign(particalStore, setup()));
  pinia._s.set(id, store);
  return store;
}
