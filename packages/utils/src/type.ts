/**
 * @description 1. MyPick
 */
// interface Todo {
//   title: string;
//   description: string;
//   completed: boolean;
// }

// type MyPick<T extends Object, K extends keyof T> = {
//   [key in K]: T[K];
// };

// type TodoPreview = MyPick<Todo, "title" | "completed">;

// const todo: TodoPreview = {
//   title: "Clean room",
//   completed: false,
// };

/**
 * @description 2. readonly
 *
 */

// interface Todo {
//   title: string;
//   description: string;
// }

// type MyReadonly<T> = {
//   readonly [key in keyof T]: T[key];
// };

// const todo: MyReadonly<Todo> = {
//   title: "Hey",
//   description: "foobar",
// };

// todo.title = "Hello"; // Error: cannot reassign a readonly property
// todo.description = "barFoo"; // Error: cannot reassign a readonly property

/**
 * @description
 */
const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type TupleToObject<T> = {
  [key in keyof T]: T[key];
};

type result = TupleToObject<typeof tuple>; // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
