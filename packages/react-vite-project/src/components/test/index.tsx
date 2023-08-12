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

  return (
    <>
      <div>{count}</div>
      <img src="https://developer.mozilla.org/pimg/aHR0cHM6Ly9zLnprY2RuLm5ldC9BZHZlcnRpc2Vycy8wMmMxOTM1YjQyZjE0N2NmYjgzMjZlN2U0MGNlMDIxZC5wbmc%3D.woUC2bPpTUJvMZ3UJjZbGW1%2BrZPkTmTnD7Ok6sYxZBo%3D" />
    </>
  );
}
export default test;
