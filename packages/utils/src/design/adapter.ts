// 1. 适配器。使不兼容的对象相互合作。
export class Adaptee {
  public specialRequest(): string {
    return "tseuqer laiceps";
  }
}

export class Target {
  public request(): string {
    return "request";
  }
}

export class Adapter extends Target {
  private adaptee: Adaptee;
  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }
  public request(): string {
    return this.adaptee.specialRequest().split("").reverse().join("");
  }
}
