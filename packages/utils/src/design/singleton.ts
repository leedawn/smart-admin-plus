// 5. 单例模式。一个 class 只有一个实例提供给全局访问
export class Singleton {
  private static instance: Singleton;
  public static getInstance(): Singleton {
    if (!Singleton.instance) Singleton.instance = new Singleton();
    return Singleton.instance;
  }
}
