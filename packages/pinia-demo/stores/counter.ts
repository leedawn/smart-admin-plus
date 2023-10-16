import { defineStore } from "pinia";
import { ref } from "vue";

export const useCounterStore = defineStore(
  "counter",
  {
    state: () => {
      return { counter: 0 };
    },
    getters: {
      double(state) {
        console.log(this.counter);
        return state.counter * 2;
      },
    },
    actions: {
      increment() {
        this.counter++;
      },
    },
  }

  //   () => {
  //     let counter = ref(0);
  //     function increment() {
  //       counter.value++;
  //     }
  //     return { counter, increment };
  //   }
);
