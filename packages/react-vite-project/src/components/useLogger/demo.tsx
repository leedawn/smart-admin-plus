import { useState } from 'react';
import UseLogger from '.';

const UseLoggerDemo = () => {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>add</button>
      <button onClick={() => setShow(!show)}>change</button>
      {show && <AnotherDemo />}
    </div>
  );
};

const AnotherDemo = () => {
  UseLogger();
  return <div>another</div>;
};

export default UseLoggerDemo;
