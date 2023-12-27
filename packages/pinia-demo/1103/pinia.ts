import { Ref, ref } from "vue";

export const piniaSymbol = Symbol("pinia");

export type Pinia = {
  install: (vue: any) => void;
  state: Ref;
  _s: Map<string, any>;
};

export function createPinia() {
  let state = ref({});

  const pinia: Pinia = {
    install(vue) {
      vue.provide(piniaSymbol, pinia);
    },
    state,
    _s: new Map(),
  };
  return pinia;
}
