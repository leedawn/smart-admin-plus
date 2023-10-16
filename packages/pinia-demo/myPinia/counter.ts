import { createStore } from "./store";

export const useCounterStore = createStore({
  id: "counter",
  state() {
    return {
      num: 0,
    };
  },
  getters: {
    double: (state) => state.num * 2,
  },
  actions: {
    addNum() {
      console.log("add", this);
      this.num++;
    },
  },
});
