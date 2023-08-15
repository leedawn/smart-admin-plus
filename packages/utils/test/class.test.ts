import { EventEmitter } from "src/class";

test("eventEmitter", () => {
  const fn = jest.fn();
  const eventName = "jest";
  const emitter = new EventEmitter();
  emitter.once(eventName, fn);
  console.log(emitter.events);
  emitter.emit(eventName);
  console.log(emitter.events);
  emitter.emit(eventName);
  expect(fn).toBeCalledTimes(1);
});
