let miaoMiao = {
  _name: "疫苗",
  get name() {
    return this._name;
  },
};
let miaoXy = new Proxy(miaoMiao, {
  get(target: any, prop: any,receiver) {
    console.log("🚀 ~ file: reflect.ts:9 ~ get ~ target:", target)
    // return target[prop];
    return Reflect.get(target,prop,receiver)
  },
});

let kexingMiao = {
  __proto__: miaoXy,
  _name: "科兴疫苗",
};

// 结果是疫苗
// @ts-ignore
console.log(kexingMiao.name); // 疫苗
