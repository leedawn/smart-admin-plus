// 6. 享元。将不同对象的相同数据进行缓存来减少内存。
export class Flyweight {
  private sharedState: string[];
  constructor(state: string[]) {
    this.sharedState = state;
  }
  operation(uniqueState: string[]): string {
    return uniqueState.join(",") + ": " + this.sharedState.join(",");
  }
}

export class FlyweightFactory {
  private flyweights: Record<string, Flyweight> = {};
  constructor(states: string[][]) {
    for (const state of states) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }

  private getKey(keys: string[]): string {
    return keys.join("_");
  }

  public getFlyweight(state: string[]): Flyweight {
    const key = this.getKey(state);
    if (!this.flyweights[key]) this.flyweights[key] = new Flyweight(state);
    return this.flyweights[key];
  }

  public listFlyweights(): number {
    return Object.keys(this.flyweights).length;
  }
}
