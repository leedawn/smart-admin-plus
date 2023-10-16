import { computed, getCurrentInstance, inject, reactive, toRefs } from "vue";
import { piniaSymbol } from "./pinia";

export function defineStore({ id, options }) {
  function useStore() {
    const vue = getCurrentInstance();
    let pinia;
    if (vue) {
      pinia = inject(piniaSymbol);
    }
    if (!pinia._s.has(id)) {
      createOptionsStore(id, options, pinia);
    }
    const store = pinia._s.get(id);
    return store;
  }
  return useStore;
}

function createOptionsStore(id, options, pinia) {
  const { state, getters = {}, actions } = options;

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
    return Object.assign(localState, actions, computedGetters);
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
