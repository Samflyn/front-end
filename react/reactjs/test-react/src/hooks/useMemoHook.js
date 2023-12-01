import React from 'react';

// the same as useCallBack which takes a function and recreates only when the dependencies change

// useMemo is used for any value, ir can be a const or a componrnt or an object

const useMemoHook = (props) => {
  // const loggingCached = useMemo(() => {
  //   return 'something here or a component'
  // }, []);

  return <h3>Caching and reusing the same Variable</h3>;
};

export default useMemoHook;
