import React, { Component } from 'react';

class AboutStateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  // state changes are not guaranteed and are scheduled to happen when resources are available
  // the expected state might change if some other state change execute before this state
  // if the state change is based on the prevoius state this might not be the expected behaviour
  someHandler = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  // this is used to get the actual previous state
  someOtherHandler = () => {
    this.setState((prevState, props) => {
      return {
        counter: prevState.counter + 1,
      };
    });
  };

  render() {
    return <div>Something Important About State</div>;
  }
}

export default AboutStateComponent;
