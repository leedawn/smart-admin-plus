import { effectScope, ref } from "vue";

export const piniaSymbol = Symbol("pinia");

export function createTestPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => {
    return ref({});
  });
  const pinia = {
    install(app) {
      app.provide(piniaSymbol, pinia);
    },
    _s: new Map(),
    _e: scope,
    state,
  };
  return pinia;
}
