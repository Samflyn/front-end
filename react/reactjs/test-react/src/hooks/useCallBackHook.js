import React from 'react';

// when child comp is used to change state in parent comp

// in the parent component when the props change the function or const which are passed down to child comp
// will be created again which means that they are new functions or const
// this will lead to child comp re-rendering and setting the data in parent comp using passed func
// the parent will re-render since the state change occurs, this creates an infinite loop

// the useCallBack hook wraps the function which is passed down to child
// it caches the function so that it survives the re-render and uses the same function until the deps changes

const useCallBackHook = (props) => {
  // const loggingCached = useCallback(() => {
  //   console.log('cached');
  // }, []);

  return <h3>Caching and reusing the same function</h3>;
};

export default useCallBackHook;
