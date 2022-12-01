export function foo(obj) {
  obj && obj.foo;
}

export function bar(obj) {
  obj && obj.bar;
}

let handleError = null;
export default {
  foo(fn) {
    callWithErrorHanding(fn);
  },
  bar(fn) {
    callWithErrorHanding(fn);
  },
  registerErrorHandle(fn) {
    handleError = fn;
  },
};
function callWithErrorHanding(fn) {
  try {
    fn && fn();
  } catch (e) {
    handleError(e);
  }
}
