import { useState } from 'react';
import useUnmount from '.';
import UseMount from './mount';

function TestUnmount() {
  useUnmount(() => {
    alert('unmount');
  });
  UseMount(() => {
    alert('mount');
  });
  return <h1>hello</h1>;
}

function UnmountDemo() {
  const [state, setState] = useState(true);

  return (
    <>
      <button onClick={() => setState(!state)} style={{ marginTop: '20px' }}>
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <TestUnmount />}
    </>
  );
}
export default UnmountDemo;
