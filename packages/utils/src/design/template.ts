// 10. 模板方法。基类定义算法框架，子类在不修改结构的情况下重写特定的步骤。
abstract class AbstractClass {
  protected operation1(): string {
    return "default operation1";
  }
  protected operation2(): string {
    return "default operation2";
  }
  public templateMethod(): string {
    return this.operation1() + " " + this.operation2();
  }
}
export class ConcreteClass extends AbstractClass {
  protected operation1(): string {
    return "concrete operation1";
  }
}
