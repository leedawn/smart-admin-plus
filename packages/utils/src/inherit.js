function Parent() {
  this.name = "parent";
}
Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  Parent.call(this);
  this.operation = "child";
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

Child.prototype.getOperation = function () {
  return this.operation;
};

const person = new Child();
// @ts-ignore
console.log(person.getName());
console.log(person.getOperation());
