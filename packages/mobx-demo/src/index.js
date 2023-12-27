import React from "react";
import ReactDom from "react-dom";
import { action, autorun, computed, makeAutoObservable, makeObservable, observable, reaction, runInAction } from "mobx";
import { observer } from "mobx-react-lite";

class Timer {
  constructor() {
    this.time = 0;
    makeObservable(this, {
      increase: action,
      time: observable,
      reset: action.bound,
      getTotal: computed,
      likeAxios: action,
    });

    autorun(() => {
      console.log("state change", this.time);
    });

    reaction(
      () => this.time,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
      }
    );
  }
  increase() {
    if (this.time >= 10) return (this.time = 10);
    this.time++;
  }
  reset() {
    this.time = 0;
  }
  get getTotal() {
    console.log("getTotal");
    return this.time + 100;
  }
  likeAxios() {
    const context = this;
    setTimeout(() => {
      runInAction(() => {
        context.time *= 100;
      });
    }, 1000);
  }
}
const timer = new Timer();

const TimerView = observer(() => {
  return (
    <div>
      <button onClick={timer.reset}>{timer.time}</button>
      <button onClick={() => timer.likeAxios()}>axios</button>
    </div>
  );
});

ReactDom.render(<TimerView />, document.getElementById("root"));
setInterval(() => {
  timer.increase();
  console.log(timer.getTotal);
}, 1000);
