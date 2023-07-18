// 5. 中介。让程序通过中介对象进行交互，减少相互之间的依赖。
interface Mediator {
  notify(event: string): void;
}
export class ConcreteMediator implements Mediator {
  private componentA: ComponentA;
  private componentB: ComponentB;
  constructor(componentA: ComponentA, componentB: ComponentB) {
    this.componentA = componentA;
    this.componentA.setMediator(this);
    this.componentB = componentB;
    this.componentB.setMediator(this);
  }
  public notify(event: string): string | void {
    if (event === "A2") {
      return this.componentA.doA1() + " " + this.componentB.doB();
    }
  }
}

class BaseComponent {
  protected mediator!: Mediator;
  setMediator(mediator: Mediator) {
    this.mediator = mediator;
  }
}
export class ComponentA extends BaseComponent {
  public doA1(): string {
    this.mediator.notify("A1");
    return "A1";
  }
  public doA2(): void {
    return this.mediator.notify("A2");
  }
}
export class ComponentB extends BaseComponent {
  public doB(): string {
    return "B";
  }
}
