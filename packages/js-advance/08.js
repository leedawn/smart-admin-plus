// 08 深入理解继承，delegation 和组合

// 1. 不管那种方式，本质上只是让代码更容易复用。

// 2. 继承，就是子类可以继承父类的属性和方法
/* class Widget {
  appName = "应用";
  getName() {
    return this.appName;
  }
}
class Calendar extends Widget {}

const calendar = new Calendar();

console.log(calendar.hasOwnProperty("appName")); // true
console.log(calendar.getName()); // 应用 */

// 3. 授权，基于原型链进行授权
/* const Widget = {
  setCity: function (city) {
    this.city = city;
  },
  getCity: function () {
    return this.city;
  },
};

const Weather = Object.create(Widget);
Weather.setWeather = function (city, weather) {
  this.setCity(city);
  this.weather = weather;
};
Weather.getWeather = function () {
  console.log(`${this.city} 的天气是 ${this.weather}`);
};
const weatherApp1 = Object.create(Weather);
weatherApp1.setWeather("guangzhou", "阴天");
weatherApp1.getWeather();

const weatherApp2 = Object.create(Weather);
weatherApp2.setWeather("shenzhen", "rain");
weatherApp2.getWeather(); */

// 4. 通过 call, apply 借用功能
/* function argumentsSlice() {
  const args = [].slice.call(arguments, 1, 3);
  return args;
}
const res = argumentsSlice(0, 1, 2, 3, 4, 5);
console.log(res); // [1,2] */

// 5. 通过拷贝重用功能
// 浅拷贝：Object.assign()，扩展运算符，
// 深拷贝：JSON，手写 deepClone
/* function deepClone(parent, children) {
  children = children || {};
  for (const key in parent) {
    if (parent.hasOwnProperty(key)) {
      if (typeof parent[key] === "object" && parent[key] !== null) {
        children[key] = Array.isArray(key) ? [] : {};
        deepClone(parent[key], children[key]);
      } else {
        children[key] = parent[key];
      }
    }
  }
  return children;
}
const obj = { name: { english: "leon" } };
const res = deepClone(obj);
obj.name.english = "wow";
console.log(res); */

// 6. 通过组合实现重用
// 就是通过 Object.assign 将对象属性复用
// react 直接通过函数来使用组件就是使用了组合思想。
