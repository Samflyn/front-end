import React, { useReducer } from 'react';

// reducer function is always decoupled from the function
// whatever is returned replaces the old state

const stateReducer = (currentState, action) => {
  switch (action.type) {
    case 'INPUTT':
      return action.data;

    default:
      throw new Error('Inside default');
  }
};

const useReducerHook = () => {
  // it takes the reducer and an optional second reducer which is the initial state which inturn can be anything
  const [stateData, dispatch] = useReducer(stateReducer, []);

  return (
    <div>
      <h3>Managing state using useReducer</h3>
      <input
        type="text"
        value={stateData}
        onChange={(event) =>
          dispatch({ type: 'INPUTT', data: event.target.value })
        }
      />
    </div>
  );
};

export default useReducerHook;
