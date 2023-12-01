import React, { Component } from 'react';

import AuthContext from '../../context/auth-context';
import ContextConsumerComponent from './ContextApiConsumerComponent/ContextConsumerComponent';

class ContextProviderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  loginHandler = () => {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
    });
  };

  // only wrap the contents that needs acces to context
  render() {
    return (
      // use this for wrapping the index.js
      // <AuthContext.Provider
      //   value={{
      //     authenticated: this.state.isLoggedIn,
      //     login: this.loginHandler,
      //   }}
      // >
      //   {this.props.children}
      // </AuthContext.Provider>

      <div>
        <h3>Context Provider</h3>
        <AuthContext.Provider
          value={{
            authenticated: this.state.isLoggedIn,
            login: this.loginHandler,
          }}
        >
          <button onClick={this.loginHandler}>Login</button>
          <ContextConsumerComponent></ContextConsumerComponent>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default ContextProviderComponent;
