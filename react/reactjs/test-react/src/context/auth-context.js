import React from 'react';

// it can init with a default object
// it is available globally where it is defined
// the default value is not important as it is replaced dynamically in the component
const basicContext = React.createContext({
  authenticated: false,
  login: () => {},
});

export default basicContext;
