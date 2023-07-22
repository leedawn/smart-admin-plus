// 3. 抽象工厂。创建一系列对象，无需指定具体类。
interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

export class ConcreteFactory implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA();
  }
  public createProductB(): AbstractProductB {
    return new ConcreteProductB();
  }
}

interface AbstractProductA {
  usefulFunction(): void;
}

class ConcreteProductA implements AbstractProductA {
  public usefulFunction(): string {
    return "this is from productA";
  }
}

interface AbstractProductB {
  usefulFunction(): void;
  anotherUsefulFunction(collaborate: AbstractProductA): void;
}

class ConcreteProductB implements AbstractProductB {
  public usefulFunction(): string {
    return "this is from productB";
  }
  public anotherUsefulFunction(collaborate: AbstractProductA) {
    return `${collaborate.usefulFunction()} and ${this.usefulFunction()}`;
  }
}
