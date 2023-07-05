export function promiseConcat(fn: (args: number[]) => any) {
  const arity = fn.length;
  let args: any[] = [];
  return function curried(nextArg: any) {
    args = [...args, nextArg];
    if (args.length < arity) {
      return curried;
    } else {
      return fn(args);
    }
  };
}
