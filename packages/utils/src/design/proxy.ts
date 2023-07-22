// 7. 代理。代理对象保存着原对象，通过代理对象的方法才可以调用原对象的方法。
interface Subject {
  request(): void;
}

export class RealSubject implements Subject {
  public request(): string {
    return "realSubject";
  }
}

export class ProxySubject implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request(): string | void {
    if (this.checkAccess()) {
      this.logAccess();
      return this.realSubject.request();
    }
  }

  private checkAccess() {
    return true;
  }

  private logAccess() {
    console.log("logAccess");
  }
}
