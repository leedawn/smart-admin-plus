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
 * @description 3. tuple to object
 */
/* const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type TupleToObject<T extends ReadonlyArray<string | number>> = {
  [key in T[number]]: key;
};

type result = TupleToObject<typeof tuple>; // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
 */
/**
 * @description 4. first of array
 */

/* type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type First<T extends any[]> = T extends [] ? never : T[0];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3 */

/**
 * @description 5. length of tuple
 */
// type tesla = ["tesla", "model 3", "model X", "model Y"];
// type spaceX = [
//   "FALCON 9",
//   "FALCON HEAVY",
//   "DRAGON",
//   "STARSHIP",
//   "HUMAN SPACEFLIGHT"
// ];

// type Length<T extends ReadonlyArray<string>> = T["length"];

// type teslaLength = Length<tesla>; // expected 4
// type spaceXLength = Length<spaceX>; // expected 5

/**
 * @description 6.
 */
// type MyExclude<T, U> = T extends U ? never : T;
// type Result = MyExclude<"a" | "b" | "c", "a">; // 'b' | 'c'

/**
 * @description 7. Awaited
 */
/* type ExampleType = Promise<string>;

type MyAwaited<T> = T extends Promise<infer U>
  ? U extends Promise<any>
    ? MyAwaited<U>
    : U
  : never;

type Result = MyAwaited<ExampleType>; // string */

/**
 * @description 8. If
 */
/* type If<T, U, R> = T extends true ? U : R;
type A = If<true, "a", "b">; // expected to be 'a'
type B = If<false, "a", "b">; // expected to be 'b' */

/**
 * @description 9. concat
 */
/* type Tuple = readonly unknown[];
type Concat<T extends Tuple, U extends Tuple> = [...T, ...U];
type Result = Concat<[1], [2]>; // expected to be [1, 2] */

/**
 * @description 10. includes
 */
/* type Includes<T extends unknown[], U> = T extends [infer A, ...infer R]
  ? [A, U] extends [U, A]
    ? true
    : Includes<R, U>
  : false;
type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false` */

/**
 * @description 11. push
 */
/* type Push<T extends unknown[], U> = [...T, U];
type Result = Push<[1, 2], "3">; // [1, 2, '3'] */

/**
 * @description 12. unshift
 */
// type Unshift<T extends unknown[], U> = [U, ...T];
// type Result = Unshift<[1, 2], 0>; // [0, 1, 2,]

/**
 * @description 13. Parameters
 */
/* const foo = (arg1: string, arg2: number): void => {};
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...any: infer R
) => any
  ? R
  : any;
type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number] */
