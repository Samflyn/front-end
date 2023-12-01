import React from 'react';
import useCustomHook from './useCustomHook';

const UsingCustomHook = () => {
  const { stateData, getTimeNow, clearTime } = useCustomHook();

  return (
    <React.Fragment>
      <div>
        <h3>Using Custom Hooks</h3>
        <p>{stateData.timeNow}</p>
      </div>
      <div>
        <button type="button" onClick={getTimeNow}>
          Get Time
        </button>
        <button type="button" onClick={clearTime}>
          Clear
        </button>
      </div>
    </React.Fragment>
  );
};

export default UsingCustomHook;
