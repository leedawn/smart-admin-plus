import { useRef } from 'react';
import UseMount from '../useUnmount/mount';
import useUnmount from '../useUnmount';

const UseLogger = () => {
  UseMount(() => {
    console.log('🚀 ~ UseMount ~ UseMount:');
  });
  if (!IsFirstTime()) {
    console.log('🚀 ~ UseLogger ~ update');
  }
  useUnmount(() => {
    console.log('🚀 ~ useUnmount ~ useUnmount:');
  });
};

const IsFirstTime = () => {
  const ref = useRef(true);
  if (ref.current) {
    ref.current = false;
    console.log('🚀 ~ UseLogger ~ first-time:');
    return true;
  } else {
    return false;
  }
};

export default UseLogger;
