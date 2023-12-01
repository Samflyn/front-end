import React, { Fragment, useEffect } from 'react';

// import Aux from '../../hoc/Aux1';

const useEffectComponent = (props) => {
  // useEffect will not run first
  // it will only run after the jsx is rendered
  // useEffect can be used as many times as needed
  // the second argument is an array of dependencies which react depends on wheather to re-render the effect again
  // if no dependencies are passed it will only render once
  useEffect(() => {
    console.log('[UseEffectComponent.js] useEffect');

    // this will run before useEffect when useEffect will execute for the last timme
    return () => {
      console.log('[UseEffectComponent.js] useEffect cleanup');
    };
  }, []);

  // to use multiple top level elements we can return an array of elements but with an unique key
  // return [
  //   <h3 key="i1">useEffect in Functional Component: {props.lengt}</h3>,
  //   <h3 key="i2">useEffect in Functional Component: {props.lengt}</h3>,
  // ];

  // or instead we can use a hoc -> Higher Order Component which only wraps the elements
  // return (
  //   <Aux>
  //     <h3>useEffect in Functional Component: {props.lengt}</h3>
  //     <h3>useEffect in Functional Component: {props.lengt}</h3>
  //   </Aux>
  // );

  // the same as using Aux but is built into React
  return (
    <Fragment>
      <h3>useEffect in Functional Component: {props.lengt}</h3>
    </Fragment>
  );
};

// will re-renders only if the input changes
// shouldComponentUpdate for functional component
// it memorizes the props used and re-renders if props used in this component change
export default React.memo(useEffectComponent);
