// using the function we can't dispatch actions that change state in the component that calls the function

import { useCallback, useReducer } from 'react';

// it can only be done by using hooks

// hooks should always be named with useSomething

// we can use any statefull features i.e state changes

// this will run in the component as if it's written directly inside

// each component calling this gets it's own snapshot, the data will be different when called by different comp

// this will be executed for every re-render cycle

const manageReducer = (currentState, action) => {
  switch (action.type) {
    case 'SET_TIME':
      return { timeNow: action.payload };
    case 'CLEAR_TIME':
      return { timeNow: null };
    default:
      throw new Error('Inside Default');
  }
};

const useCustomHook = () => {
  const [stateData, dispatch] = useReducer(manageReducer, []);

  const getTimeNow = useCallback(() => {
    dispatch({ type: 'SET_TIME', payload: new Date().toLocaleTimeString() });
  }, []);

  const clearTime = useCallback(() => {
    dispatch({ type: 'CLEAR_TIME' });
  }, []);

  // always return the http data and then parse it in the component
  // use hooks only for fetching, but not parsing the data
  // we can return any type of data
  return {
    stateData: stateData,
    getTimeNow: getTimeNow,
    clearTime: clearTime,
  };
};

export default useCustomHook;
