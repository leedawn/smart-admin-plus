// TODO: 不知道怎么给类的实例属性增强能力
function canSpeakEnglish() {
  return "I can speak English!";
}

@Super(true, canSpeakEnglish)
class Person {
  static isLiving: boolean;

  speakEnglish() {
    return "I do not know!";
  }

  //@ts-ignore
  @log
  add(a: number, b: number) {
    return a + b;
  }
}

function Super(isLiving: boolean, canSpeakEnglish: () => string) {
  return function (target: any) {
    target.isLiving = isLiving;
    target.prototype.speakEnglish = canSpeakEnglish;
  };
}

interface objectDecorator {
  value: Function;
}

function log(target: unknown, name: string, decorator: objectDecorator) {
  console.log(target);
  const oldValue = decorator.value;
  decorator.value = function (...args: unknown[]): Function {
    console.log(`this method(${name}) can receive ${args}`);
    return oldValue.apply(this, args);
  };
  return decorator;
}

const leon = new Person();
console.log(Person.isLiving);
console.log(leon.speakEnglish());
leon.add(2, 3);
