// 概述：设计模式和设计原则都是针对面向对象编程来说的。设计模式是针对一系列重复问题的解决方案。分成创建，结构，行为三类。

// 创建模式：用于对象创建，封装对象创建的过程，对外只暴露必要的 API。
// 区别：工厂方法模式关注创建特定类型的对象，抽象工厂模式关注创建一系列相关对象，单例模式限制对象的实例化，原型模式关注通过
//     克隆创建对象，建造者模式关注构建复杂对象


// 1. 工厂方法模式。通过工厂方法代替直接通过调用构造函数来创建对象。

abstract class Product {
  abstract say(): void;
}

class ConcreteProduct extends Product {
  say(): string {
    return "ConcreteProduct";
  }
}

abstract class Creator {
  abstract factoryMethod(): Product;
  someOperation() {
    const product = this.factoryMethod();
    return product.say();
  }
}
export class ConcreteCreator extends Creator {
  factoryMethod(): Product {
    return new ConcreteProduct();
  }
}
