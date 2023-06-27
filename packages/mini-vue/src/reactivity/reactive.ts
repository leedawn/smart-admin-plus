enum ReactiveTypes {
  Reactive = "__v__reactive",
}

const handler = {
  get: function <T extends object, K extends keyof T>(obj: T, prop: K) {
    if (prop === ReactiveTypes.Reactive) return true;
    return obj[prop];
  },
};

export function reactive(value: Record<string, unknown>): unknown {
  const res = new Proxy(value, handler);
  return res;
}

export function isReactive(obj: Record<string, unknown>): boolean {
  return !!obj[ReactiveTypes.Reactive] as boolean;
}
