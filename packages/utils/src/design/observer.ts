// 7. 观察者。主体对象可以保存或者删除观察者对象。当状态变化后会通知观察者对象。

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}
export class ConcreteSubject implements Subject {
  public state!: number;
  private observers: Observer[] = [];
  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      console.log("this observer has exist");
    }
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const target = this.observers.indexOf(observer);
    if (target === -1) {
      console.log("this observer has not exist");
    }
    this.observers.splice(target, 1);
  }

  public notify(): void {
    if (this.observers.length == 2) {
      this.state = 6;
    } else {
      this.state = 2;
    }
    for (const observer of this.observers) {
      return observer.update(this);
    }
  }
}

interface Observer {
  update(subject: Subject): void;
}

export class ConcreteObserverA implements Observer {
  public update(subject: Subject): string | void {
    if (subject instanceof ConcreteSubject && subject.state > 3) {
      return "concreteObserverA";
    }
  }
}

export class ConcreteObserverB implements Observer {
  public update(subject: Subject): string | void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      return "concreteObserverB";
    }
  }
}
