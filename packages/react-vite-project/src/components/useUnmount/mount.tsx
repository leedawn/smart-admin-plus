import { useEffect } from 'react';

const UseMount = (fn: () => void) => {
  useEffect(() => fn(), []);
};
export default UseMount;
