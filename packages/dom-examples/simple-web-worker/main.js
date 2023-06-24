// @ts-ignore
const first = document.querySelector("#number1");
const second = document.querySelector("#number2");

const button = document.querySelector("#button");
const result = document.querySelector(".result");

if (window.Worker) {
  const myWorker = new Worker("./worker.js");

  // @ts-ignore
  first.onchange = function () {
    // @ts-ignore
    myWorker.postMessage([first.value, second.value]);
    console.log("Message posted to worker");
  };

  // @ts-ignore
  second.onchange = function () {
    // @ts-ignore
    myWorker.postMessage([first.value, second.value]);
    console.log("Message posted to worker");
  };

  // @ts-ignore
  button.onclick = function () {
    // @ts-ignore
    myWorker.postMessage(function test() {
      return { name: "leon" };
    });
  };

  myWorker.onmessage = function (e) {
    // @ts-ignore
    result.textContent = e.data;
    console.log("Message received from worker");
  };
} else {
  console.log("Your browser doesn't support web workers.");
}
