import React, { Component } from 'react';

class LifeCycleHooksUpdateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[LifeCycleHooksUpdateComponent.js] getDerivedStateFromProps');
    return state;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[LifeCycleHooksUpdateComponent.js] shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[LifeCycleHooksUpdateComponent.js] getSnapshotBeforeUpdate');
    return null;
  }

  render() {
    console.log('[LifeCycleHooksUpdateComponent.js] render');
    return <h3>{this.state.title}</h3>;
  }

  componentDidUpdate() {
    console.log('[LifeCycleHooksUpdateComponent.js] componentDidUpdate');
  }
}

export default LifeCycleHooksUpdateComponent;
