import utils from "./utils";
function test() {
  console.log("test", 1 / 0);
}
utils.foo(test);


