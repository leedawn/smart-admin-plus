// 8. 状态
// 上下文对象保存状态对象，调用状态对象的方法。
// 每个状态对象不仅定义方法，还保存了上下文。
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
