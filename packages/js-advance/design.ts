// 概述：设计模式和设计原则都是针对面向对象编程来说的。设计模式是针对一系列重复问题的解决方案。分成创建，结构，行为三类。

// 创建模式：用于对象创建，封装对象创建的过程，对外只暴露必要的 API。
// 区别：工厂方法模式关注创建特定类型的对象，抽象工厂模式关注创建一系列相关对象，单例模式限制对象的实例化，原型模式关注通过
//     克隆创建对象，建造者模式关注构建复杂对象

// 1. 工厂方法模式。通过工厂方法代替直接通过调用构造函数来创建对象。
/*
abstract class Product {
  abstract say(): void;
}

class ConcreteProduct extends Product {
  say(): void {
    console.log("hehe");
  }
}

abstract class Creator {
  abstract factoryMethod(): Product;
  someOperation() {
    const product = this.factoryMethod();
    product.say();
  }
}
class ConcreteCreator extends Creator {
  factoryMethod(): Product {
    return new ConcreteProduct();
  }
}
new ConcreteCreator().someOperation(); */

// 2. 原型
//   2.1 复制对象，同时使新对象不依赖原对象所属的类。
//   2.2 克隆过程委托给被克隆对象，该对象有一个克隆方法。

/* 
class Prototype {
  public primitive: unknown;
  public component: Object;
  public circularComponent: ComponentWithBackReference;
  clone(): this {
    const clone = Object.create(this);
    clone.component = Object.create(this.component);
    clone.circularComponent = {
      ...this.circularComponent,
      prototype: { ...this },
    };
    return clone;
  }
}

class ComponentWithBackReference {
  public prototype;
  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

function clientCode() {
  const p = new Prototype();
  p.primitive = 2;
  p.component = new Date();
  p.circularComponent = new ComponentWithBackReference(p);
  const p2 = p.clone();
  console.log(p.primitive === p2.primitive);
  console.log(p.component !== p2.component);
  console.log(p.circularComponent !== p2.circularComponent);
  console.log(p.circularComponent.prototype !== p2.circularComponent.prototype);
}
clientCode(); */

// 3. 抽象工厂。创建一系列对象，无需指定具体类。
/* interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

class ConcreteFactory implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA();
  }
  public createProductB(): AbstractProductB {
    return new ConcreteProductB();
  }
}

interface AbstractProductA {
  usefulFunction(): void;
}

class ConcreteProductA implements AbstractProductA {
  public usefulFunction() {
    console.log("this is from productA");
  }
}

interface AbstractProductB {
  usefulFunction(): void;
  anotherUsefulFunction(collaborate: AbstractProductA): void;
}

class ConcreteProductB implements AbstractProductB {
  public usefulFunction() {
    console.log("this is from productB");
  }
  public anotherUsefulFunction(collaborate: AbstractProductA) {
    collaborate.usefulFunction();
    this.usefulFunction();
  }
}

function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  productA.usefulFunction();
  const productB = factory.createProductB();
  productB.anotherUsefulFunction(productA);
}

clientCode(new ConcreteFactory()); */

// 4. 建造者。分步骤创建复杂对象，存储查看和创建修改分离
/* 
interface Builder {
  producePartA(): void;
}

class ConcreteBuilder implements Builder {
  private product: Product;
  constructor() {
    this.reset();
  }
  public reset() {
    this.product = new Product();
  }
  public producePartA(): void {
    this.product.parts.push("partA");
  }
  public getProducts() {
    const res = this.product;
    this.reset();
    return res;
  }
}

class Product {
  public parts: string[] = [];
  public listParts() {
    console.log(`all products: ${this.parts.join(",")}`);
  }
}

function clientCode() {
  const builder = new ConcreteBuilder();
  builder.producePartA();
  builder.getProducts().listParts();
}
clientCode(); */

// 5. 单例模式。一个 class 只有一个实例提供给全局访问
/* 
class Singleton {
  private static instance: Singleton;
  public static getInstance(): Singleton {
    if (!Singleton.instance) Singleton.instance = new Singleton();
    return Singleton.instance;
  }
}
console.log(Singleton.getInstance() === Singleton.getInstance()); */

// 结构型模式：用于组合类和对象
// 1. 适配器。使不兼容的对象相互合作。
/* class Adaptee {
  public specialRequest(): string {
    return "tseuqer laiceps";
  }
}

class Target {
  public request(): string {
    return "request";
  }
}

class Adapter extends Target {
  private adaptee: Adaptee;
  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }
  public request(): string {
    return this.adaptee.specialRequest().split("").reverse().join("");
  }
}

function clientCode(target: Target) {
  console.log(target.request());
}
const target = new Target();
clientCode(target);

const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);
clientCode(adapter); */

// 2. 桥接。将一个大类或者是一系列相关的类进行拆分，分成抽象和实现两个层次，分别进行开发使用。
/* class Abstraction {
  public implementation: Implementation;
  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }
  public operation(): string {
    return "Abstraction: " + this.implementation.operationImplementation();
  }
}

class ExtendedAbstraction extends Abstraction {
  public operation(): string {
    return (
      "ExtendedAbstraction: " + this.implementation.operationImplementation()
    );
  }
}

interface Implementation {
  operationImplementation(): string;
}

class ConcreteImplementation implements Implementation {
  public operationImplementation(): string {
    return "operationImplementation";
  }
}

function clientCode(abstraction: Abstraction) {
  console.log(abstraction.operation());
}

const implementation = new ConcreteImplementation();

const abstraction = new Abstraction(implementation);
clientCode(abstraction);
const extendedAbstraction = new ExtendedAbstraction(implementation);
clientCode(extendedAbstraction); */

// 3. 组合。将一组对象保存为树形结构，包含简单叶节点和复杂容器。
/* abstract class Component {
  private parent: null | Component;

  public setParent(component: Component | null) {
    this.parent = component;
  }

  public getParent(): Component | null {
    return this.parent;
  }

  public add(component: Component): void {}

  public remove(component: Component): void {}

  public isComposite(): boolean {
    return false;
  }

  public abstract operation(): string;
}

class Leaf extends Component {
  public operation(): string {
    return "Leaf";
  }
}

class Composite extends Component {
  private children: Component[] = [];

  public add(component: Component): void {
    this.children.push(component);
    this.setParent(this);
  }

  public remove(component: Component): void {
    const target = this.children.indexOf(component);
    this.children.splice(target, 1);
    this.setParent(null);
  }

  public isComposite(): boolean {
    return true;
  }

  public operation(): string {
    let res = [];
    for (const component of this.children) {
      res.push(component.operation());
    }
    return `Branch(${res.join("+")})`;
  }
}

function clientCode(component: Component) {
  console.log(component.operation()); // Branch(Branch(Leaf+Leaf)+Branch()+Leaf)
}

const leaf = new Leaf();
const tree = new Composite();
const branch1 = new Composite();
branch1.add(leaf);
branch1.add(leaf);
const branch2 = new Composite();
branch2.add(leaf);
tree.add(branch1);
tree.add(branch2);
tree.add(leaf);
if (branch2.isComposite()) {
  branch2.remove(leaf);
}
clientCode(tree); */

//  4. 装饰器。把对象放入到已封装的对象里面从而给原对象增加行为。
/* interface Component {
  operation(): string;
}

class ConcreteComponent implements Component {
  public operation(): string {
    return "ConcreteComponent";
  }
}

class Decorator implements Component {
  private component: Component;
  constructor(component: Component) {
    this.component = component;
  }
  public operation(): string {
    return this.component.operation();
  }
}

class ConcreteDecorator extends Decorator {
  public operation(): string {
    return `ConcreteDecorator(${super.operation()})`;
  }
}

const concreteComponent = new ConcreteComponent();
const concreteDecorator = new ConcreteDecorator(concreteComponent);
console.log(concreteDecorator.operation()); */

//  5. 外观。为复杂的系统提供一个简单的接口。
/* class Facade {
  private system1: Subsystem1;
  private system2: Subsystem2;
  constructor(system1: Subsystem1, system2: Subsystem2) {
    this.system1 = system1;
    this.system2 = system2;
  }
  public operation(): string {
    return `result: ${this.system1.operation()},${this.system2.operation()}`;
  }
}

class Subsystem1 {
  public operation(): string {
    return "system1 ready!";
  }
}
class Subsystem2 {
  public operation(): string {
    return "system2 ready!";
  }
}
const s1 = new Subsystem1();
const s2 = new Subsystem2();
const facade = new Facade(s1, s2);
console.log(facade.operation()); */

// 6. 享元。将不同对象的相同数据进行缓存来减少内存。
/* class Flyweight {
  private sharedState: string[];
  constructor(state: string[]) {
    this.sharedState = state;
  }
  operation(uniqueState) {
    console.log(`uniqueState: ${uniqueState.join(",")},sharedState: ${this.sharedState.join(",")}`);
  }
}

class FlyweightFactory {
  private flyweights: Record<string, Flyweight> = {};
  constructor(states: string[][]) {
    for (const state of states) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }

  private getKey(keys: string[]): string {
    return keys.join("_");
  }

  public getFlyweight(state: string[]): Flyweight {
    const key = this.getKey(state);
    if (!this.flyweights[key]) this.flyweights[key] = new Flyweight(state);
    return this.flyweights[key];
  }

  public listFlyweights() {
    console.log(`there are ${Object.keys(this.flyweights).length} flyweights`);
  }
}

const factory = new FlyweightFactory([
  ["Benz", "red"],
  ["BMW", "red"],
]);
factory.listFlyweights();
const flyweight1 = factory.getFlyweight(["BMW", "red"]);
flyweight1.operation(["leon"]);
const flyweight2 = factory.getFlyweight(["BMW", "yellow"]);
flyweight2.operation(["leon"]);
factory.listFlyweights(); */

// 7. 代理。代理是对象的替代品，控制着原对象的访问，可以在请求提交到原对象前后进行一些处理。
/* interface Subject {
  request(): void;
}

class RealSubject implements Subject {
  public request(): void {
    console.log("realSubject");
  }
}

class ProxySubject implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess() {
    return true;
  }

  private logAccess() {
    console.log("logAccess");
  }
}

const realSubject = new RealSubject();
const proxySubject = new ProxySubject(realSubject);
proxySubject.request(); */



