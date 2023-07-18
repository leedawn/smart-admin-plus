// 9. 策略。context 拥有保存对象的变量，使用不同对象的方法可以得到不同的结果
export class Context {
  private strategy: Strategy;
  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }
  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }
  public doSomeLogic(): string[] {
    const arr = ["a", "b", "c", "d"];
    this.strategy.doAlgorithm(arr);
    return arr;
  }
}

interface Strategy {
  doAlgorithm(data: string[]): string[];
}

export class ConcreteStrategyA implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}
export class ConcreteStrategyB implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}
