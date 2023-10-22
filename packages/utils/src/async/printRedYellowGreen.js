// 循环打印红黄绿
// 1. 回调函数版本
/* function print(type, time, callback) {
  setTimeout(() => {
    console.log(type);
    callback();
  }, time);
}
function run() {
  print("red", 3000, () => {
    print("green", 1000, () => {
      print("blue", 2000, () => {
        run();
      });
    });
  });
}
run(); */

// 2. promise 版本
/* function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
function print(type, time) {
  return new Promise((resolve) => {
    sleep(time).then(() => {
      console.log(type);
      resolve("");
    });
  });
}
function run() {
  print("red", 3000)
    .then(() => print("green", 1000))
    .then(() => print("blue", 2000))
    .then(run);
}
run(); */

// 3. async...await
function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
async function print(type, time) {
  await sleep(time);
  console.log(type);
}
async function run() {
  await print("red", 3000);
  await print("green", 1000);
  await print("blue", 2000);
  run();
}
run();
