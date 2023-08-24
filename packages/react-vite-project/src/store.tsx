import redux from 'redux';

const initialState = {
  count: 0
};

interface ActionType {
  type: string;
  count?: number;
  number?: number;
}

function reducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case 'Increment':
      return { ...state, count: state.count + 1 };
    case 'Decrement':
      return { ...state, count: state.count - 1 };
    case 'AddNumber':
      return { ...state, count: state.count + (action.number as number) };
    default:
      return state;
  }
}

export const store = redux.createStore(reducer);
