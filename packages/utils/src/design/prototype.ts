// 2. 原型
//   2.1 复制对象，同时使新对象不依赖原对象所属的类。
//   2.2 克隆过程委托给被克隆对象，该对象有一个克隆方法。

export class Prototype {
  public primitive: unknown;
  public component!: Object;
  public circularComponent!: ComponentWithBackReference;
  clone(): this {
    const clone = Object.create(this);
    clone.component = Object.create(this.component);
    clone.circularComponent = {
      ...this.circularComponent,
      prototype: { ...this },
    };
    return clone;
  }
}

export class ComponentWithBackReference {
  public prototype;
  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}
