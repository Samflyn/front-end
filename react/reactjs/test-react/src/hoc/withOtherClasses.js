import React from 'react';

// another form of hoc
// this type is used when there is a js logic otherwise if there is just jsx use the other way
// to use this as a wrapper in the export line do ->
// export default withOtherClasses(App, classes.App)
// we can use any no of variables instead of just one className
// the first one is always the component that needs to be wrapped and the rest are the properties that are used
const withOtherClasses = (WrappedComponent, className) => {
  return (props) => {
    <div className={className}>
      <WrappedComponent {...props}></WrappedComponent>
    </div>;
  };
};

export default withOtherClasses;
