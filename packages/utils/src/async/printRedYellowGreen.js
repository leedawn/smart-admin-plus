// 1. 打印红黄绿
// function red() {
//   console.log("red");
// }
// function green() {
//   console.log("green");
// }
// function yellow() {
//   console.log("yellow");
// }
// /* function task(type, time, callback) {
//   setTimeout(() => {
//     if (type === "red") red();
//     else if (type === "green") green();
//     else if (type === "yellow") yellow();
//     callback();
//   }, time);
// }

// function step() {
//   task("red", 3000, () => {
//     task("green", 1000, () => {
//       task("yellow", 2000, step);
//     });
//   });
// }
// step(); */

// function promiseTask(type, time) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       if (type === "red") red();
//       if (type === "green") green();
//       if (type === "yellow") yellow();
//       // @ts-ignore
//       resolve();
//     }, time);
//   });
// }
// function promiseStep() {
//   promiseTask("red", 3000)
//     .then(() => promiseTask("green", 1000))
//     .then(() => promiseTask("yellow", 2000))
//     .then(() => {
//       promiseStep();
//     });
// }
// // promiseStep();

// async function asyncStep() {
//   await promiseTask("red", 3000);
//   await promiseTask("green", 1000);
//   await promiseTask("yellow", 2000);
//   asyncStep();
// }
// asyncStep();
