import { useEffect, useRef } from 'react';
import { getTargetElement, InputValue } from '../utils/domTarget';

export default function useEventListener(
  event: string,
  fn: (event?: Event) => void,
  options?: { target: InputValue<any> }
) {
  const handleFn = useRef(fn);
  handleFn.current = fn;
  useEffect(() => {
    const target = getTargetElement(options?.target, window);
    if (!target?.addEventListener) return;

    const listener = (event: Event) => {
      return handleFn.current(event);
    };
    target.addEventListener(event, listener);

    return () => {
      target.removeEventListener(event, listener);
    };
  }, []);
}
