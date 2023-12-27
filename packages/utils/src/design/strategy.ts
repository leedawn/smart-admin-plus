// 9. 策略。一组行为转换为对象，可以在上下文对象内部相互替换
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

/**
 * 
 */
