export class VueClass {
  _data: Record<string, unknown> = {};
  _listeners: Map<string, Set<Function>> = new Map();
  constructor(data: Record<string, unknown>) {
    this._data = data;
    this._listeners = new Map();
    for (const key in this._data) {
      this._defineProperty(key, this._data[key]);
    }
  }
  _defineProperty(key: string, value: unknown) {
    Object.defineProperty(this, key, {
      get: () => value,
      set: (newVal) => {
        const oldVal = value;
        value = newVal;
        this._emit(key, newVal, oldVal);
      },
    });
  }

  _emit(key: string, newVal: unknown, oldVal: unknown) {
    const cbs = this._listeners.get(key);
    for (const cb of (cbs as Set<Function>)) {
      cb(newVal, oldVal);
    }
  }

  $on(key: string, cb: Function) {
    let cbs = this._listeners.get(key);
    if (!cbs) {
      this._listeners.set(key, (cbs = new Set()));
    }
    cbs.add(cb);
  }
}
