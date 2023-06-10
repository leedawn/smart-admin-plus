/**
 * 使用到了函数重载
 * @param obj 对象
 * @param fn 对象的属性或者可以处理对象的函数
 */
export function get<T extends Object, R>(obj: T, fn: (obj: T) => R): R;
export function get<T extends Object, K extends keyof T>(obj: T, fn: K): T[K];
export function get<T extends Object, K extends keyof T, R>(
  obj: T,
  fn: K | ((obj: T) => R)
) {
  const res = typeof fn === "function" ? fn(obj) : obj[fn];
  return res;
}

export function generateMap(list, key, value) {
  const res = list.reduce((acc, item) => {
    acc[item[key]] = get(item, value);
    return acc;
  }, {});
  return res;
}

// export const generateTree = (list, { id, pid, children }) => {
//   const map = generateMap(list, id, (item) => item);
//   const res = [];
//   list.forEach((item) => {
//     const parentNode = map[item[pid]];
//     if (parentNode) {
//       parentNode[children] = parentNode[children] || [];
//       parentNode[children].push(item);
//     } else {
//       res.push(item);
//     }
//   });
//   return res;
// };

// export const mapTree = (list, map, props = { children: "children" }) => {
//   const arr = list[props.children];
//   return list.map((item) => {
//     if (Array.isArray(arr)) {
//       return {
//         ...map(item),
//         [props.children]: mapTree(item, map, props),
//       };
//     } else {
//       return map(item);
//     }
//   });
// };
