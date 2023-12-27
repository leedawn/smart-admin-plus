import { createStore } from "./defineStore";

export const useCounterStore = createStore("counter", {
  state() {
    return { num: 1 };
  },
  getters: {
    double(store) {
      return store.num * 2;
    },
  },
  actions: {
    add() {
      this.num++;
    },
  },
});
