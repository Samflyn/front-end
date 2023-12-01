import React, { Component } from 'react';

import AuthContext from '../../../context/auth-context';

class ContextConsumerComponent extends Component {
  // to get access to context in functions and also in JSX
  // react sets this to this.context
  // for functional based use const authContext = useContext(AuthContext)
  // authContext will hold the context data
  static contextType = AuthContext;

  componentDidMount() {
    console.log(this.context.authenticated);
  }

  // the context consumer does not take jsx instead it takes a function
  render() {
    return (
      //   <AuthContext.Consumer>
      //     {(context) => {
      //       return context.authenticated ? (
      //         <p>Authenticated</p>
      //       ) : (
      //         <p>Not Authenticated</p>
      //       );
      //     }}
      //   </AuthContext.Consumer>
      <div>
        {this.context.authenticated ? (
          <p>Authenticated</p>
        ) : (
          <p>Not Authenticated</p>
        )}
      </div>
    );
  }
}

export default ContextConsumerComponent;
