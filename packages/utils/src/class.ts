/**
 * @name 发布订阅模式
 */
export class EventEmitter {
  events: Map<unknown, Set<Function>>;
  constructor() {
    this.events = new Map();
  }

  on(type: string, callback: Function) {
    let set = this.events.get(type);
    if (!set) {
      this.events.set(type, (set = new Set()));
    }
    set!.add(callback);
  }
  emit(type: string, ...args: unknown[]) {
    const set = this.events.get(type);
    if (set) {
      set.forEach((cb) => cb.apply(this, args));
    }
  }
  off(type: string, callback: Function) {
    let set = this.events.get(type);
    if (set) {
      set.delete(callback);
    }
  }
  once(type: string, callback: Function) {
    const fn = () => {
      callback();
      this.off(type, fn);
    };
    this.on(type, fn);
  }
}
