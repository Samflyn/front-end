import React, { useEffect } from 'react';

// like componentDidMount in class based

// should only be used at root level
// only used for handling side-effects like http requests
// by default useEffect will be executed right after and for every re-render cycle
// it can be configured by a second variable, i.e dependecy
// it will only run after the dependency is changed
// if an empty array is passed as a second argument, useEffect wil run only once after the first render
const useEffectHook = () => {
  useEffect(() => {
    // some http call and set the state here
    console.log('useEffect executed');
    // useEffect can return a cleanup function this will run when the component gets unmounted
    // it runs for the previous effect before new effect is created
    return () => {};
  }, []);

  return <h3>Managing Side Effects</h3>;
};

export default useEffectHook;
