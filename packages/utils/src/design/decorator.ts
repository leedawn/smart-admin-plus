//  4. 装饰器。把对象放入到已封装的对象里面从而给原对象增加行为。
interface Component {
  operation(): string;
}

export class DecoratorConcreteComponent implements Component {
  public operation(): string {
    return "ConcreteComponent";
  }
}

class Decorator implements Component {
  private component: Component;
  constructor(component: Component) {
    this.component = component;
  }
  public operation(): string {
    return this.component.operation();
  }
}

export class ConcreteDecorator extends Decorator {
  public operation(): string {
    return `ConcreteDecorator(${super.operation()})`;
  }
}
