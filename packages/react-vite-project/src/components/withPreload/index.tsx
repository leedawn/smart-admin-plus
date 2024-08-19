class DataPreload {
  map: Map<string, unknown>;
  constructor() {
    this.map = new Map();
  }
  preload(id: string, func: any) {
    const entry: any = {
      promise: func()
    };
    // entry.promise
    //   .then((res: any) => {
    //     entry.result = res;
    //   })
    //   .catch((err: any) => {
    //     entry.err = err;
    //   });
    this.map.set(id, entry);
    return entry.promise;
  }
  consume(id: string) {
    const res: any = this.map.get(id);
    return res.promise;
  }
}
const dataPreload = new DataPreload();
export function withPreload(id: string, func: any) {
  const preloadAbleFunc = () => {
    const promise = dataPreload.consume(id);
    if (promise) {
      return promise;
    } else {
      return func();
    }
  };
  preloadAbleFunc.preload = () => dataPreload.preload(id, func);

  return preloadAbleFunc;
}
