import React, { Component } from 'react';

class ReferenceComponent extends Component {
  constructor(props) {
    super(props);
    // any reference type
    this.inputElementRef = React.createRef();
  }

  componentDidMount() {
    this.inputElementRef.current.focus();
  }

  render() {
    return (
      <div>
        <h3>Reference to Input</h3>
        {/* For older versions of react */}
        {/* <input
          ref={(inputEl) => {
            inputEl.focus();
          }}
        ></input> */}
        {/* For newer version above 16.3 */}
        <input ref={this.inputElementRef}></input>
      </div>
    );
  }
}

export default ReferenceComponent;
