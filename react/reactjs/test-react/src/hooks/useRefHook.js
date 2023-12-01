import React, { useEffect, useRef, useState } from 'react';

const useRefHook = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    // instead of creating a new timer for every key change
    // we can clear the old timer by using the cleanup function
    const timer = setTimeout(() => {
      // in closures when the outer function executes the inputValue is locked
      // the value is not the same as the current value but the value when the timer is set
      if (inputValue === inputRef.current.value) {
        console.log(inputValue);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
      console.log('timer cleared');
    };
  }, [inputValue, inputRef]);

  return (
    <div>
      <h3>To only send request when user stops typing for certain time</h3>
      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
    </div>
  );
};

export default useRefHook;
