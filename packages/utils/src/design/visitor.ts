//  11. 拜访者。将算法和作用的对象分开。接受其他对象来调用自身的方法。
interface Component {
  accept(visitor: Visitor): void;
}

export class ConcreteComponent implements Component {
  public accept(visitor: Visitor) {
    return visitor.visitConcreteComponent(this);
  }
  public componentMethod(): string {
    return "a";
  }
}
interface Visitor {
  visitConcreteComponent(element: ConcreteComponent): string;
}
export class ConcreteVisitor implements Visitor {
  public visitConcreteComponent(element: ConcreteComponent): string {
    return element.componentMethod();
  }
}
