import React, { useState, useMemo, memo } from 'react';

function Test() {
  const [num, setNum] = useState(2020);
  const [random, setRandom] = useState(0);

  //通过useMemo将函数内的计算结果(返回值)保存到react底层原型链上
  //totalPrimes为react底层原型链上该函数计算结果的引用
  const totalPrimes = useMemo(() => {
    console.log('begin....'); //这里添加一个console.log，方便验证在重新渲染时是否重新执行了一遍计算

    let total = 0; //声明质数总和对应的变量

    //以下为计算num范围内所有质数个数总和的计算代码，不需要认真阅读，只需要知道这是一段“比较复杂的计算代码”即可
    for (let i = 1; i <= num; i++) {
      let boo = true;
      for (let j = 2; j < i; j++) {
        if (i % j === 0) {
          boo = false;
          break;
        }
      }
      if (boo && i !== 1) {
        total++;
      }
    }
    //复杂的计算代码到此结束

    return total; //将质数总和作为返回值return出去
  }, [num]);

  const clickHandler01 = () => {
    setNum(num + 1);
  };

  const clickHandler02 = () => {
    setRandom(Math.floor(Math.random() * 100)); //修改random的值导致整个组件重新渲染
  };

  const MemoComponent = memo(function tt() {
    return <div>hello{num}</div>;
  });

  return (
    <div>
      {num} - {totalPrimes} - {random}
      <button onClick={clickHandler01}>num + 1</button>
      <button onClick={clickHandler02}>random</button>
      <MemoComponent />
    </div>
  );
}

export default Test;
