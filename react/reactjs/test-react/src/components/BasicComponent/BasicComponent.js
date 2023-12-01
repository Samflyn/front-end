import React from 'react';
// import Radium from 'radium';
import styled from 'styled-components';

import './BasicComponent.css';

// to execute js in jsx use {}, we can use one line statement

// for class based it would be {this.props}
// children refers to any element between opening and closing of component, it can be anything

// only changes in props and/ or state trigger React to re-render
// state can only be accessed in class-based components!
// in components don't set state directly use this.setState({})
// porps -> from parent to child
// state -> within the component

// functional components are stateless and presentational (dumb)
// class components are statefull and containers (smart)
// for state and lifecycle hooks use class components otherwise use functional components

// containers are either class or functional components which manage state
// components are non state management classess or functional

// methods can be passed down as props

// for dynamic use of styled-components
const StyledDiv = styled.div`
    color: ${Math.random() > 0.3 ? 'red' : 'blue'};

    '@media (min-width: 500px)': {
       width: 450px;
    },`;

function BasicComponent(props) {
  // const style = {
  //   '@media (min-width: 500px)': {
  //     width: '450px',
  //   },
  // };

  return (
    // <div onClick={props.clickMe} style={style}>
    <StyledDiv>
      <p>
        Hello {props.name}, something {props.something},
      </p>
      <p>{props.children}</p>
      <input type="text" onChange={props.logger} value={props.name}></input>
    </StyledDiv>
    // </div>
  );
}

// export default Radium(basicComp);

export default BasicComponent;
