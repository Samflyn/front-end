import React from 'react';
import PropTypes from 'prop-types';

const PropTypeComponent = () => {
  return <h3>Prop Types Component</h3>;
};

// can be defined on both class and functional component
// react will check for propTypes on the component and warn if props are passed incorrectly in dev mode
PropTypeComponent.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  click: PropTypes.func,
};

export default PropTypeComponent;
