import React from 'react';
import { Route } from 'react-router-dom';

const page2 = (props) => {
  return (
    <div>
      {/* For nested routing it will by default take the path, instead use the present path */}
      {/* For nested routes react will not unmount and remount the component so the componentWillMount will not run for the second time */}
      {/* To fix this issue use ComponentWillUpdate */}
      <Route
        path={props.match.url}
        exact
        render={() => (
          <h3>
            Page 2 with id : {props.match.params.id} and dynamic id : 
            {Math.floor(Math.random() * 10)}
          </h3>
        )}
      />
    </div>
  );
};

export default page2;
