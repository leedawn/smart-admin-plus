// 09 通过词法作用域和调用点理解 this 绑定

/**
 * 1 默认绑定
 */
var a = 2;
function logger() {
  console.log(this.a); // 浏览器环境输出2
}
logger();

/**
 * 隐式绑定
 */
const obj = {
  a: 3,
  logger,
};
obj.logger(); // 3

/**
 * 显式绑定
 */
const obj2 = {
  a: 4,
};
logger.call(obj2);

/**
 * 硬性绑定
 */
const obj3 = {
  a: 5,
};
const res = logger.bind(obj3);
res();
