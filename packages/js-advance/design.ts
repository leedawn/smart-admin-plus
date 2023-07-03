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

//  4. 装饰器
/* interface Component {
  operation(): string;
}

class ConcreteComponent implements Component {
  operation() {
    return "ConcreteComponent";
  }
}
class Decorator implements Component {
  constructor(protected component: Component) {}
  operation() {
    return this.component.operation();
  }
}
class ConcreteDecoretor extends Decorator {
  operation() {
    return "concrete-" + super.operation();
  }
}
console.log(new ConcreteDecoretor(new ConcreteComponent()).operation()); */

/* interface Component {
  operation(): string;
}

class ConcreteComponent implements Component {
  public operation(): string {
    return "ConcreteComponent";
  }
}

class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  public operation(): string {
    return this.component.operation();
  }
}

class ConcreteDecoratorA extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

const simple = new ConcreteComponent();
const decorator1 = new ConcreteDecoratorA(simple);
console.log(decorator1.operation());
 */
//  5. 外观
/* class Facade {
  constructor(private member1: SubSystem1, private member2: SubSystem2) {}
  operation() {
    this.member1.operator1();
    this.member2.operator2();
  }
}
class SubSystem1 {
  operator1() {
    console.log("子系统1工作");
  }
}
class SubSystem2 {
  operator2() {
    console.log("子系统2工作");
  }
}

new Facade(new SubSystem1(), new SubSystem2()).operation(); */

// 6. 享元
/* class Flyweight {
  constructor(private shareState) {}
  operation(uniqueState) {
    console.log(`共享数据：${this.shareState};非共享数据：${uniqueState}`);
  }
}
class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = <any>{}; //共享池
  add(shareState) {
    this.flyweights[JSON.stringify(shareState)] = new Flyweight(shareState); //注意这里由于JSON.stringify造成的对参数的限制
    return this;
  }
  //参数getExistOnly为true只获得当前pool中已经存在的，否则返回为undefined,用于验证缓存是否被启用
  getFlyweight(shareState, getExistOnly: boolean = false) {
    const targetFlyWeight = this.flyweights[JSON.stringify(shareState)];
    if (targetFlyWeight || getExistOnly) {
      return targetFlyWeight;
    }
    const newFlyWeight = new Flyweight(shareState);
    this.flyweights[JSON.stringify(shareState)] = newFlyWeight;
    return newFlyWeight;
  }
}
const flyWeightPool = new FlyweightFactory();
flyWeightPool.add({ a: 1 }).add({ b: 2 });
//注意以下验证严格等于时需要将带daigetExistOnly参数的放在左边，
//根据 https://tc39.es/ecma262/#sec-equality-operators-runtime-semantics-evaluation
//进行比较时会先计算左边，否则即使原本池子里不存在，也会新创建一个，导致左右始终相等，如第三个log
console.log(flyWeightPool.getFlyweight({ a: 1 }, true) === flyWeightPool.getFlyweight({ a: 1 })); //true
console.log(flyWeightPool.getFlyweight({ a: 3 }, true) === flyWeightPool.getFlyweight({ a: 3 })); //false
console.log(flyWeightPool.getFlyweight({ a: 4 }) === flyWeightPool.getFlyweight({ a: 4 }, true)); //true */

// 7. 代理。代理是对象的替代品，控制着原对象的访问，可以在请求提交到原对象前后进行一些处理。
interface Subject {
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
proxySubject.request();

// 行为模式：包含算法和对象间的职责分配

// 1. 职责链
/* class Handler {
  private nextHandler: Handler;
  setNext(h: Handler) {
    this.nextHandler = h;
    return h;
  }
  //默认处理，如果有下一个则交给下一个处理，否则返回'remnant'，可以通过是不是null来判断是不是最后也没处理
  handle(request: number) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return "remnant";
  }
}

class ConcreteHandler1 extends Handler {
  handle(request: number) {
    if (request === 1) {
      return "done by handle1";
    }
    return super.handle(request);
  }
}
class ConcreteHandler2 extends Handler {
  handle(request: number) {
    if (request === 2) {
      return "done by handle2";
    }
    return super.handle(request);
  }
}
const handler1 = new ConcreteHandler1();
const handler2 = new ConcreteHandler2();
handler1.setNext(handler2);
console.log(handler1.handle(1));
console.log(handler1.handle(2));
console.log(handler1.handle(3)); */

// 2. 命令
/* class Command {
  constructor(protected receiver: Receiver) {
    console.log(receiver);
  }
  execute() {
    console.log("default execute");
  }
}
class Receiver {
  constructor(private name = "") {}
  action() {
    console.log("name:" + this.name);
  }
}
class ConcreteCommand extends Command {
  execute() {
    console.log("concrete execute");
    this.receiver.action();
  }
}
class Invoker {
  private defaultStep = () => {
    console.log("default step");
  };
  onStep1: () => void = this.defaultStep;
  onStep2: () => void = this.defaultStep;
  setStep1(c: Command) {
    this.onStep1 = c.execute.bind(c); //注意这里绑定this，不然执行其中的this指向invoker
  }
  setStep2(c: Command) {
    this.onStep2 = c.execute.bind(c);
  }
}
const invoker = new Invoker();
invoker.setStep1(new ConcreteCommand(new Receiver("xiaoming")));
invoker.onStep1();
invoker.onStep2(); */

// 3. 解释器
/* class Expression {
  interpret(props: string) {
    return props.length;
  }
}
console.log(new Expression().interpret("2222")); */

// 4. 迭代器
/* interface IteratorInterface<T> {
  first(): T;
  next(): T;
  isDone: boolean;
  curItem: T;
}
interface Aggregator {
  createIterator(): IteratorInterface<string>;
}
class ConcreteAggregator implements Aggregator {
  items: string[] = [];
  addItem(i: string) {
    this.items.push(i);
    return this;
  }
  createIterator() {
    return new ConcreteIterator(this);
  }
}
class ConcreteIterator implements IteratorInterface<string> {
  location: number = 0;
  constructor(private collection: ConcreteAggregator) {}
  first() {
    return this.collection.items[0];
  }
  next() {
    const item = this.collection.items[this.location];
    this.location += 1;
    return item;
  }
  get isDone() {
    return this.location >= this.collection.items.length;
  }
  get curItem() {
    return this.collection.items[this.location];
  }
}
const aggregator = new ConcreteAggregator();
aggregator.addItem("first").addItem("second").addItem("third");
const iterator = aggregator.createIterator();
while (!iterator.isDone) {
  console.log(iterator.next());
} */

// 5. 中介
/* interface Mediator {
  notify(receiver: string): void;
}
class ConcreteMediator implements Mediator {
  constructor(private c1: Colleague, private c2: Colleague) {
    c1.setMediator(this);
    c2.setMediator(this);
  }
  notify(receiver) {
    this[receiver] && this[receiver].toDo();
  }
}
class Colleague {
  mediator: Mediator;
  setMediator(m: Mediator) {
    this.mediator = m;
  }
  toDo() {}
  toCall(listener: string) {}
}
class ConcreteColleague1 extends Colleague {
  toDo() {
    console.log("对象1被被调用");
  }
  toCall(listener: string) {
    console.log("对象1发起调用");
    this.mediator.notify(listener);
  }
}
class ConcreteColleague2 extends Colleague {
  toDo() {
    console.log("对象2被被调用");
  }
  toCall(listener: string) {
    console.log("对象2发起调用");
    this.mediator.notify(listener);
  }
}
const c1 = new ConcreteColleague1();
const c2 = new ConcreteColleague2();
const m = new ConcreteMediator(c1, c2);
c1.toCall("c2");
c2.toCall("c1"); */

// 6. 备忘录
/* class Memento {
  private state: number;
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
  }
}
class Originator {
  constructor(private memento: Memento, public state: number) {}
  save() {
    this.memento.setState(this.state);
  }
  chenge() {
    this.state += 1;
  }
  check() {
    return this.memento.getState();
  }
}
const o = new Originator(new Memento(), 0);
console.log(o.state);
o.save();
o.chenge();
console.log(o.state);
console.log(o.check()); */

// 7. 观察者
/* interface Observer {
  update(state: number): void;
  observerState: number;
}
class ConcreteObserver implements Observer {
  observerState = 0;
  constructor(public id) {}
  update(state) {
    this.observerState = state;
  }
}
class Subject {
  constructor(private state: number) {}
  observers: ConcreteObserver[] = [];
  init() {
    this.notify();
  }
  attach(o: ConcreteObserver) {
    if (!this.observers.find((item) => item.id === o.id)) {
      this.observers.push(o);
    }
    return this;
  }
  detach(o: ConcreteObserver) {
    const index = this.observers.findIndex((item) => (item.id = o.id));
    this.observers.splice(index, 1);
  }
  notify() {
    console.log(this.observers);
    this.observers.forEach((item) => item.update(this.state));
  }
  modifyState() {
    this.state += 1;
    this.notify();
  }
}
const o1 = new ConcreteObserver("a");
const o2 = new ConcreteObserver("b");
const s = new Subject(1);
s.attach(o1).attach(o2).init();
console.log(o1.observerState);
console.log(o2.observerState);
s.modifyState();
console.log(o1.observerState);
console.log(o2.observerState); */

// 8. 状态
//  每个状态新建一个类，将状态对应的行为保存到对应的类中。
//  上下文不会自行实现状态行为，而是会保存指向状态对象的引用。
//  所有状态类遵循同一个接口，上下文仅通过接口和对象交互。
/* class Context {
  private state: State;

  constructor(state: State) {
    this.transitionTo(state);
  }

  public transitionTo(state: State): void {
    console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
  }

  public request1(): void {
    this.state.handle1();
  }

  public request2(): void {
    this.state.handle2();
  }
}

abstract class State {
  protected context: Context;

  public setContext(context: Context) {
    this.context = context;
  }

  public abstract handle1(): void;

  public abstract handle2(): void;
}

class ConcreteStateA extends State {
  public handle1(): void {
    console.log("ConcreteStateA handles request1.");
    console.log("ConcreteStateA wants to change the state of the context.");
    this.context.transitionTo(new ConcreteStateB());
  }

  public handle2(): void {
    console.log("ConcreteStateA handles request2.");
  }
}

class ConcreteStateB extends State {
  public handle1(): void {
    console.log("ConcreteStateB handles request1.");
  }

  public handle2(): void {
    console.log("ConcreteStateB handles request2.");
    console.log("ConcreteStateB wants to change the state of the context.");
    this.context.transitionTo(new ConcreteStateA());
  }
}

const context = new Context(new ConcreteStateA());
context.request1();
context.request2(); */

// 10. 模板方法
/* abstract class AbstractClass {
  operation1() {
    console.log("default operation1");
  }
  operation2() {
    console.log("default operation1");
  }
  templateMethod() {
    this.operation1();
    this.operation2();
  }
}
class ConstreteClass extends AbstractClass {
  operation1() {
    console.log("constrete operation");
  }
}
new ConstreteClass().templateMethod(); */

//  11. 拜访者
/* interface Visitor {
  visitA(e: ConcreteElementA): void;
  visitB(e: ConcreteElementB): void;
}
class ConstreteVisitor1 implements Visitor {
  visitA(e) {
    console.log(e);
    console.log(`第一种对A的访问,id为：${e.state}`);
  }
  visitB(e) {
    console.log(`第一种对B的访问,id为：${e.state}`);
  }
}
interface ElementInterface {
  accept(visitor: Visitor): void;
}
class ConcreteElementA implements ElementInterface {
  state = "a";
  accept(visitor: Visitor) {
    visitor.visitA(this);
  }
}
class ConcreteElementB implements ElementInterface {
  state = "b";
  accept(visitor: Visitor) {
    visitor.visitB(this);
  }
}
new ConcreteElementA().accept(new ConstreteVisitor1());
new ConcreteElementB().accept(new ConstreteVisitor1()); */
