import React from 'react';

import UseStateHook from './stateHook';
import UseEffectHook from './useEffectHook';
import UseCallBackHook from './useCallBackHook';
import UseRefHook from './useRefHook';
import UseReducerHook from './useReducerHook';
import UseContextHook from './useContextHook';
import UsingCustomHook from './usingCustomHook';

const all = () => {
  return (
    <div>
      <h1>React Hooks</h1>
      <UseStateHook />
      <UseEffectHook />
      <UseCallBackHook />
      <UseRefHook />
      <UseReducerHook />
      <UseContextHook />
      <UsingCustomHook />
    </div>
  );
};

export default all;
