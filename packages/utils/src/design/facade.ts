//  5. 外观。为复杂的系统提供一个简单的接口。
export class Facade {
  private system1: Subsystem1;
  private system2: Subsystem2;
  constructor(system1: Subsystem1, system2: Subsystem2) {
    this.system1 = system1;
    this.system2 = system2;
  }
  public operation(): string {
    return `${this.system1.operation()} ${this.system2.operation()}`;
  }
}

export class Subsystem1 {
  public operation(): string {
    return "system1 ready!";
  }
}
export class Subsystem2 {
  public operation(): string {
    return "system2 ready!";
  }
}
