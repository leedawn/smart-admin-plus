// import { useState } from 'react';
// import { store } from '../../store';

// export default function ReduxDemo() {
//   const [count, setCount] = useState(store.getState().count);

//   store.subscribe(() => {
//     setCount(store.getState().count);
//   });

//   function onUpdate(type: string, number?: number) {
//     store.dispatch({ type, number });
//   }

//   return (
//     <div>
//       <div>{count}</div>
//       <button onClick={() => onUpdate('Increase')}>increase</button>
//       <button onClick={() => onUpdate('Decrease')}>decrease</button>
//       <button onClick={() => onUpdate('AddNumber', 5)}>add</button>
//     </div>
//   );
// }
