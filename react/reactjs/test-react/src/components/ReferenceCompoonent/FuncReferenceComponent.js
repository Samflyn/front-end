import React, { useEffect, useRef } from 'react';

const FuncReferenceComp = (props) => {
  // we can also pass initial value
  const inputElementRef = useRef(null);

  // useEffect only runs after the JSX is rendered
  useEffect(() => {
    inputElementRef.current.focus();
  }, []);

  return (
    <div>
      <h3>For Functional References</h3>
      <input ref={inputElementRef}></input>
    </div>
  );
};

export default FuncReferenceComp;
