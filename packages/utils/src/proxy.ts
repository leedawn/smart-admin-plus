let person: Record<string, string | number> = { name: "leon" };
const proxy = new Proxy(person, {
  get(target, key) {
    return Reflect.get(target, key);
  },
  set(target, key: string, newVal) {
    if (key === "age") {
      if (typeof newVal !== "number") {
        throw new Error("error");
      }
    }
    target[key] = newVal;
    return true;
  },
});
console.log(proxy.name);
proxy.age = 23;
console.log(proxy.age);

proxy.age = "34";
console.log(proxy.age);
