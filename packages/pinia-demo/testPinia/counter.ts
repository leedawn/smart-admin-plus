import { defineStore } from "./store";

export const useCounterStore = defineStore({
  id: "count",
  options: {
    state() {
      return {
        num: 1,
      };
    },
    getters: {
      double: (state) => {
        console.log("🚀 ~ file: counter.ts:13 ~ state:", state)
        return state.num * 2;
      },
    },
    actions: {
      add() {
        this.num++;
      },
    },
  },
});
