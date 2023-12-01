import React, { useContext } from 'react';

import AuthContext from '../context/auth-context';

const useContextHook = () => {
  // this will re-render when the context value changes
  const authContext = useContext(AuthContext);

  let isAuthenticated = <h1>User is Logged out</h1>;

  if (authContext.authenticated) {
    isAuthenticated = <h1>User is Logged in</h1>;
  }

  return (
    <div>
      <h3>Using Context API using hooks</h3>
      {isAuthenticated}
    </div>
  );
};

export default useContextHook;
