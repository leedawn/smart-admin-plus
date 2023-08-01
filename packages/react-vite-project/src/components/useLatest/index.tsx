import { useRef } from 'react';

export default function useLatest(value: any) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
