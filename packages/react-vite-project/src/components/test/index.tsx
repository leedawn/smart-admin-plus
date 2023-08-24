import { useReducer } from 'react';

interface Info {
  name: string;
  age: number;
}

function reducer(state: Info, action: { type: string } & Partial<Info>): Info {
  if (action.type === 'addAge') {
    return { name: state.name, age: state.age + 1 };
  } else if (action.type === 'changeName') {
    return { ...state, name: action.name as string };
  } else {
    return state;
  }
}

export default function Test() {
  const [state, dispatch] = useReducer(reducer, { name: 'leon', age: 23 });

  function changeName(newValue: string) {
    dispatch({ type: 'changeName', name: newValue });
  }

  function addAge() {
    dispatch({ type: 'addAge' });
  }

  return (
    <div>
      <input value={state.name} onChange={(e) => changeName(e.target.value)} />
      <button onClick={addAge}>add</button>
      {state.name}
      {state.age}
    </div>
  );
}
