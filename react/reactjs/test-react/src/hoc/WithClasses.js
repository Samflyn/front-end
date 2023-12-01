import React from 'react';

// the props.children is the entire content inside the <WithClass></WithClass>
// to pass the props to the wrapped component
const WithClass = (props) => (
  <div className={props.classes}>{props.children}</div>
);

export default WithClass;
