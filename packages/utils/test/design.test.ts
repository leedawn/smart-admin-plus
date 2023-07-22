import { MonkeyHandler, DogHandler, PeopleHandler } from "../src/design/chain-of-responsibility";
import { SimpleCommand, ComplexCommand, Receiver, Invoker } from "../src/design/command";
import { ConcreteComponent, ConcreteVisitor } from "../src/design/visitor";
import { Context, ConcreteStrategyA, ConcreteStrategyB } from "../src/design/strategy";
import { ConcreteStateA, StateContext } from "../src/design/state";
import { ConcreteSubject, ConcreteObserverA, ConcreteObserverB } from "../src/design/observer";
import { ConcreteClass } from "../src/design/template";
import { Caretaker, Originator } from "../src/design/memento";
import { ComponentA, ComponentB, ConcreteMediator } from "../src/design/mediator";
import { Collection } from "../src/design/iterator";
import { RealSubject, ProxySubject } from "../src/design/proxy";
import { FlyweightFactory } from "../src/design/flyweight";
import { Subsystem1, Subsystem2, Facade } from "../src/design/facade";
import { ConcreteDecorator, DecoratorConcreteComponent } from "../src/design/decorator";
import { Leaf, Composite } from "../src/design/composite";
import { ConcreteImplementation, ExtendedAbstraction, Abstraction } from "../src/design/bridge";
import { Target, Adaptee, Adapter } from "../src/design/adapter";
import { Singleton } from "../src/design/singleton";
import { ConcreteBuilder } from "../src/design/builder";
import { ConcreteFactory } from "../src/design/abstractFactory";
import { Prototype, ComponentWithBackReference } from "../src/design/prototype";
import { ConcreteCreator } from "../src/design/factoryMethod";

describe("behavior pattern", () => {
  test("chain-of-responsibility", () => {
    const monkey = new MonkeyHandler();
    const dog = new DogHandler();
    const people = new PeopleHandler();
    monkey.setNext(dog).setNext(people);

    expect(monkey.handle("banana")).toEqual("monkey");
    expect(monkey.handle("meat")).toEqual("dog");
    expect(monkey.handle("coffee")).toEqual("people");
    expect(monkey.handle("apple")).toEqual(null);
  });

  test("command", () => {
    let first = "simpleCommand";
    let second = "complexCommand";
    const sm = new SimpleCommand(first);
    const cm = new ComplexCommand(new Receiver(), second);
    const invoker = new Invoker();
    invoker.setStart(sm);
    invoker.setEnd(cm);
    expect(invoker.doSomething()).toEqual(first + " " + second);
  });

  test("visitor", () => {
    expect(new ConcreteComponent().accept(new ConcreteVisitor())).toEqual("a");
  });

  test("strategy", () => {
    const context = new Context(new ConcreteStrategyA());
    const arr = ["a", "b", "c", "d"];
    expect(context.doSomeLogic()).toEqual(arr);
    context.setStrategy(new ConcreteStrategyB());
    expect(context.doSomeLogic()).toEqual(arr.reverse());
  });

  test("state", () => {
    const context = new StateContext(new ConcreteStateA());
    expect(context.request1()).toEqual("concreteStateA");
    expect(context.request2()).toEqual("concreteStateB");
  });

  test("observer", () => {
    const concreteObserverA = new ConcreteObserverA();
    const concreteObserverB = new ConcreteObserverB();
    const concreteSubject = new ConcreteSubject();
    concreteSubject.attach(concreteObserverA);
    concreteSubject.attach(concreteObserverB);
    expect(concreteSubject.notify()).toEqual("concreteObserverA");
    concreteSubject.detach(concreteObserverA);
    expect(concreteSubject.notify()).toEqual("concreteObserverB");
  });

  test("template", () => {
    expect(new ConcreteClass().templateMethod()).toEqual("concrete operation1 default operation2");
  });

  test("memento", () => {
    const originator = new Originator("111");
    const caretaker = new Caretaker(originator);
    caretaker.backup();
    const state = originator.doSomething();
    expect(state.split(",").length).toEqual(30);
    caretaker.backup();
    originator.doSomething();
    caretaker.backup();

    caretaker.showHistory();
    caretaker.undo();
    caretaker.undo();
    caretaker.showHistory();
  });

  test("mediator", () => {
    const a = new ComponentA();
    const b = new ComponentB();
    new ConcreteMediator(a, b);
    expect(a.doA2()).toEqual("A1 B");
  });

  test("iterator", () => {
    const collection = new Collection();
    const arr = ["first", "second", "third"];
    for (const item of arr) {
      collection.addItem(item);
    }
    const iterator = collection.getIterator();
    let res: string[] = [];
    while (iterator.isValid()) {
      res.push(iterator.next());
    }
    expect(res.join(",")).toEqual(arr.join(","));
    const reverseIterator = collection.getReverseIterator();
    expect(reverseIterator.next()).toEqual(arr[2]);
    expect(reverseIterator.key()).toEqual(1);
    reverseIterator.rewind();
    expect(reverseIterator.current()).toEqual(arr[2]);
  });
});

describe("structure pattern", () => {
  test("proxy", () => {
    const realSubject = new RealSubject();
    const proxySubject = new ProxySubject(realSubject);
    expect(proxySubject.request()).toEqual("realSubject");
  });

  test("flyweight", () => {
    const operators = ["leon"];
    const cars = [
      ["Benz", "red"],
      ["BMW", "red"],
    ];
    const additionCar = ["BMW", "yellow"];
    const factory = new FlyweightFactory(cars);
    expect(factory.listFlyweights()).toEqual(2);
    const flyweight1 = factory.getFlyweight(cars[1]);
    expect(flyweight1.operation(operators)).toEqual(operators.join(",") + ": " + cars[1].join(","));
    const flyweight2 = factory.getFlyweight(additionCar);
    expect(flyweight2.operation(operators)).toEqual(operators.join(",") + ": " + additionCar.join(","));
    expect(factory.listFlyweights()).toEqual(3);
  });

  test("facade", () => {
    const s1 = new Subsystem1();
    const s2 = new Subsystem2();
    const facade = new Facade(s1, s2);
    expect(facade.operation()).toEqual(`system1 ready! system2 ready!`);
  });

  test("decorator", () => {
    const concreteComponent = new DecoratorConcreteComponent();
    const concreteDecorator = new ConcreteDecorator(concreteComponent);
    expect(concreteDecorator.operation()).toEqual("ConcreteDecorator(ConcreteComponent)");
  });

  test("composite", () => {
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
    expect(tree.operation()).toEqual("Branch(Branch(Leaf+Leaf)+Branch()+Leaf)");
  });

  test("bridge", () => {
    const implementation = new ConcreteImplementation();
    const abstraction = new Abstraction(implementation);
    expect(abstraction.operation()).toEqual("Abstraction: operationImplementation");
    const extendedAbstraction = new ExtendedAbstraction(implementation);
    expect(extendedAbstraction.operation()).toEqual("ExtendedAbstraction: operationImplementation");
  });

  test("adapter", () => {
    const target = new Target();
    expect(target.request()).toEqual("request");

    const adaptee = new Adaptee();
    const adapter = new Adapter(adaptee);
    expect(adapter.request()).toEqual("special request");
  });
});

describe("create mode", () => {
  test("singleton", () => {
    expect(Singleton.getInstance()).toEqual(Singleton.getInstance());
  });
  test("builder", () => {
    const builder = new ConcreteBuilder();
    builder.producePartA();
    expect(builder.getProducts().listParts()).toEqual("all products: partA");
  });

  test("abstract factory", () => {
    const factory = new ConcreteFactory();
    const productA = factory.createProductA();
    const productB = factory.createProductB();
    expect(productB.anotherUsefulFunction(productA)).toEqual("this is from productA and this is from productB");
  });

  test("prototype", () => {
    const p = new Prototype();
    p.primitive = 2;
    p.component = new Date();
    p.circularComponent = new ComponentWithBackReference(p);
    const p2 = p.clone();
    expect(p.primitive).toEqual(p2.primitive);
    expect(p.component).not.toEqual(p2.component);
    expect(p.circularComponent).not.toStrictEqual(p2.circularComponent);
    expect(p.circularComponent.prototype).not.toStrictEqual(p2.circularComponent.prototype);
  });

  test("factory method", () => {
    expect(new ConcreteCreator().someOperation()).toEqual("ConcreteProduct");
  });
});
