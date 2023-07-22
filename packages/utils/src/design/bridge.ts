// 2. 桥接。将一个大类或者是一系列相关的类进行拆分，分成抽象和实现两个层次，分别进行开发使用。
export class Abstraction {
  public implementation: Implementation;
  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }
  public operation(): string {
    return "Abstraction: " + this.implementation.operationImplementation();
  }
}

export class ExtendedAbstraction extends Abstraction {
  public operation(): string {
    return "ExtendedAbstraction: " + this.implementation.operationImplementation();
  }
}

interface Implementation {
  operationImplementation(): string;
}

export class ConcreteImplementation implements Implementation {
  public operationImplementation(): string {
    return "operationImplementation";
  }
}
