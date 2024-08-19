import { useEffect, useState } from 'react';
import { withPreload } from '.';

export default function fetchUser() {
  const [num, setNum] = useState(0);

  async function handle() {
    const tt = withPreload('test', test);
    tt.preload();
    const res = await tt();
    setNum(res);
    console.log('🚀 ~ handle ~ res:', res);
  }
  handle();

  console.log('🚀 ~ fetchUser ~ num:', num);
  return <div>{num}</div>;
}

function test(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(5);
    }, 200);
  });
}
