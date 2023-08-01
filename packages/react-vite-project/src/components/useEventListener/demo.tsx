import { useRef, useState } from 'react';
import useEventListener from '.';

export default function UseEventListener() {
  const [count, setCount] = useState(0);
  const [pressKey, setPressKey] = useState('');
  const ref = useRef(null);

  useEventListener(
    'click',
    () => {
      setCount(count + 1);
    },
    { target: ref }
  );

  useEventListener('keydown', (event) => {
    setPressKey((event as KeyboardEvent)?.code);
  });

  return (
    <>
      <button ref={ref}>{count}</button>
      <div>your press key is {pressKey}</div>
    </>
  );
}
