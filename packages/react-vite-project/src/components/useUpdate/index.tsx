import { useReducer, useState } from 'react';

const UseUpdate = () => {
  const reducer = (state: number) => (state + 1) % 1_000_000;
  const [_, update] = useReducer(reducer, 0); // 如果是使用 useState，则每次修改的时候都需要传值
  return update;
};

export default UseUpdate;
