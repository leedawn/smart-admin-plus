import { effectScope, ref } from "vue";

export const piniaSymbol = Symbol("pinia");

export function createPinia() {
  const scope = effectScope();
  const state = scope.run(() => ref({}));

  const pinia = {
    install(app) {
      app.provide(piniaSymbol, pinia);
    },
    _s: new Map(),
    state,
  };
  return pinia;
}
