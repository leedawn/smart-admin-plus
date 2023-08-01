import { useState } from 'react';
import useUnmount from '.';

function TestUnmount() {
  useUnmount(() => {
    alert('unmount');
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
