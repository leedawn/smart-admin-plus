import {
  MonkeyHandler,
  DogHandler,
  PeopleHandler,
} from "../src/design/chain-of-responsibility";
import {
  SimpleCommand,
  ComplexCommand,
  Receiver,
  Invoker,
} from "../src/design/command";

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
