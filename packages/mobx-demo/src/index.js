// import * as React from "react";
// import { render } from "react-dom";
// import { observer } from "mobx-react-lite";
// import { makeObservable, observable, computed, action } from "mobx";

// class Todo {
//   id = Math.random();
//   title = "";
//   finished = false;

//   constructor(title) {
//     makeObservable(this, {
//       title: observable,
//       finished: observable,
//       toggle: action
//     });
//     this.title = title;
//   }

//   toggle() {
//     this.finished = !this.finished;
//   }
// }

// class TodoList {
//   todos = [];
//   get unfinishedTodoCount() {
//     return this.todos.filter(todo => !todo.finished).length;
//   }
//   constructor(todos) {
//     makeObservable(this, {
//       todos: observable,
//       unfinishedTodoCount: computed
//     });
//     this.todos = todos;
//   }
// }

// const TodoListView = observer(({ todoList }) => (
//   <div>
//     <ul>
//       {todoList.todos.map(todo => (
//         <TodoView todo={todo} key={todo.id} />
//       ))}
//     </ul>
//     Tasks left: {todoList.unfinishedTodoCount}
//   </div>
// ));

// const TodoView = observer(({ todo }) => (
//   <li>
//     <input
//       type="checkbox"
//       checked={todo.finished}
//       onClick={() => todo.toggle()}
//     />
//     {todo.title}
//   </li>
// ));

// const store = new TodoList([
//   new Todo("Get Coffee"),
//   new Todo("Write simpler code")
// ]);
// render(<TodoListView todoList={store} />, document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom";
import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";

// 对应用状态进行建模。
class Timer {
  secondsPassed = 0;

  constructor() {
    makeObservable(this, {
      secondsPassed: observable,
      increase: action,
      another: computed,
    });
  }

  increase() {
    this.secondsPassed += 1;
  }

  reset() {
    this.secondsPassed = 0;
  }

  get another() {
    return this.secondsPassed % 2 === 0;
  }
}

const myTimer = new Timer();

// 构建一个使用 observable 状态的“用户界面”。
const TimerView = observer(({ timer }) => <button onClick={() => timer.reset()}>已过秒数：{timer.secondsPassed},{timer.another}</button>);

ReactDOM.render(<TimerView timer={myTimer} />, document.body);

// 每秒更新一次‘已过秒数：X’中的文本。
setInterval(() => {
  myTimer.increase();
}, 1000);
