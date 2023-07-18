// 行为模式：包含算法和对象间的职责分配

// 1. 职责链。将请求沿着责任链进行传输，直至请求被处理

type HandlerReturn = string | null;

interface Handler {
  setNext(handler: AbstractHandler): AbstractHandler;
  handle(food: string): HandlerReturn;
}

abstract class AbstractHandler implements Handler {
  private nextHandler!: AbstractHandler; // 每个实例对象会创建不同的 nextHandler
  public setNext(handler: AbstractHandler): AbstractHandler {
    this.nextHandler = handler;
    return handler;
  }
  public handle(food: string): HandlerReturn {
    if (this.nextHandler) {
      return this.nextHandler.handle(food);
    }
    return null;
  }
}

export class MonkeyHandler extends AbstractHandler {
  public handle(food: string): HandlerReturn {
    if (food === "banana") {
      return "monkey";
    }
    return super.handle(food);
  }
}

export class DogHandler extends AbstractHandler {
  public handle(food: string): HandlerReturn {
    if (food === "meat") {
      return "dog";
    }
    return super.handle(food);
  }
}

export class PeopleHandler extends AbstractHandler {
  public handle(food: string): HandlerReturn {
    if (food === "coffee") {
      return "people";
    }
    return super.handle(food);
  }
}
