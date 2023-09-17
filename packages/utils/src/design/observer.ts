// 7. 观察者。一个对象状态改变后可以通知其他对象

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

// proxy 实现观察者模式
type ObserveCb = () => void;

export const observable = (obj: object) => new Proxy(obj, { set });

const observeQueue: Set<ObserveCb> = new Set();

export const observe = (fn: ObserveCb) => observeQueue.add(fn);

function set(target: object, key: any, value: any, receiver: object) {
  const res = Reflect.set(target, key, value, receiver);
  observeQueue.forEach((fn) => fn());
  return res;
}
