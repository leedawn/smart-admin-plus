// 8. 状态
// 一个对象的内部状态发生变化时，改变其行为
export class StateContext {
  private state!: State;
  constructor(state: State) {
    this.transitionTo(state);
  }
  public transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this);
  }

  public request1(): string {
    return this.state.handle1() as unknown as string;
  }

  public request2(): string {
    return this.state.handle2() as unknown as string;
  }
}

abstract class State {
  protected context!: StateContext;

  public setContext(context: StateContext) {
    this.context = context;
  }

  public handle1(): void {}

  public handle2(): void {}
}

export class ConcreteStateA extends State {
  public handle1(): string {
    this.context.transitionTo(new ConcreteStateB());
    return "concreteStateA";
  }
}

export class ConcreteStateB extends State {
  public handle2(): string {
    this.context.transitionTo(new ConcreteStateA());
    return "concreteStateB";
  }
}
