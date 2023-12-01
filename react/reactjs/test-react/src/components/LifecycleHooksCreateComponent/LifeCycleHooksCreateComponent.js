import React, { Component } from 'react';

import LifeCycleHooksUpdateComponent from './LifecycleHooksUpdateComponent/LifecycleHooksUpdateComponent';

class LifeCycleHooksCreateComponent extends Component {
  constructor(props) {
    super(props);
    console.log('[LifeCycleHooksCreateComponent.js] constructor');
    this.state = {
      title: props.title,
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log(
      '[LifeCycleHooksCreateComponent.js] getDerivedStateFromProps',
      props
    );
    return state;
  }

  // only update this component if the title changes
  // if component should check for all the props used, we can extend PureComponent instead of Component
  // PureComponent is the normal Component but with all props checks in shouldComponentUpdate
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.title !== this.state.title;
  }

  render() {
    console.log('[LifeCycleHooksCreateComponent.js] render');
    return (
      <LifeCycleHooksUpdateComponent
        title={this.state.title}
      ></LifeCycleHooksUpdateComponent>
    );
  }

  componentDidMount() {
    console.log('[LifeCycleHooksCreateComponent.js] componentDidMount');
  }

  // for cleanup
  componentWillUnmount() {
    console.log('[LifeCycleHooksCreateComponent.js] componentWillUnmount');
  }
}

export default LifeCycleHooksCreateComponent;
