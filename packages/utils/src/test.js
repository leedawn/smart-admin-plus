// @ts-nocheck
async function test() {
  let arr = [3, 2, 1];
  await arr.reduce(async (acc, item) => {
    await acc;
    const res = await fetch(item);
    console.log(res);
    return acc;
  }, Promise.resolve([]));

  console.log("end");
}

function fetch(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(x);
    }, 500 * x);
  });
}

test();
