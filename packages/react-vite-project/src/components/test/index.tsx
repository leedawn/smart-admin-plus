import { useEffect, useRef, useState } from 'react';

function test() {
  const [count, setCount] = useState(0);
  const refCount = useRef(count);
  refCount.current = count;

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(refCount.current + 1);
    }, 1000);
    console.log(count);

    return () => clearInterval(timer);
  }, [23, 23, []]);

  return <div>{count}</div>;
}
export default test;
