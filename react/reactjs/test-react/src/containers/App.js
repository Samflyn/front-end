import React, { useState } from 'react';
import './App.css';
// import Radium, { StyleRoot } from 'radium';
import { BrowserRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

// if css modules are enabled, css classes can be imported to an object and used as cssClasses.Button
// import cssClasses from './App.css';

import BasicComponent from '../components/BasicComponent/BasicComponent';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import LifeCycleHooksCreateComponent from '../components/LifecycleHooksCreateComponent/LifeCycleHooksCreateComponent';
import UseEffectComponent from '../components/UseEffectComponent/UseEffectComponent';
import ContextProviderComponent from '../components/ContextApiProviderComponent/ContextProviderComponent';
import Layout from '../components/layout/Layout';
import HttpRequestComponent from '../components/HttpComponent/HttpRequestComponent';
import RoutingComponent from '../components/RoutingComponent/RoutingComponent';
import FormsComponent from '../components/FormsComponent/FormsComponent';
import ReduxComponent from './ReduxComponent/ReduxComponent';
import Auth from './auth/Auth';
import AllHooks from '../hooks/all';

// react will run this function everytime it need to re-render the component
// in a class based component it will run render()
function App() {
  const [personState, setPersonState] = useState({
    persons: [
      { id: 1, name: 'sam0', no: 0 },
      { id: 2, name: 'sam1', no: 1 },
      { id: 3, name: 'sam2', no: 2 },
    ],
    somethingOther: 'something other',
    showPersons: false,
  });

  // unlike in class component, in functional component state is replaced not merged
  // instead in functional we use multiple useState() calls

  const [otherState] = useState('some other state');

  const setStateHandler = (newName) => {
    console.log(personState, otherState);
    setPersonState({
      ...personState,
      persons: [
        { id: 1, name: newName, no: 1 },
        { id: 2, name: 'sam2', no: 2 },
        { id: 3, name: 'sam3', no: 3 },
      ],
    });
  };

  const logging = (event) => {
    setPersonState({
      ...personState,
      persons: [
        { id: 1, name: event.target.value, no: 1 },
        { id: 2, name: 'sam2', no: 2 },
        { id: 3, name: 'sam3', no: 3 },
      ],
    });
  };

  // this is scoped as it will only be applied to the element it is used with
  // while using styled-components use & hover i.e &:hover{code here}
  const style = {
    backgroundColor: 'green',
    color: 'white',
    border: '1px solid blue',
    padding: '8px',
    margin: '8px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'lightgreen',
      text: 'black',
    },
  };

  // to set style dynamically
  // for styled-components, since it is a template literal i.e ${}
  if (personState.showPersons) {
    style.backgroundColor = 'red';
    style[':hover'] = {
      backgroundColor: 'blue',
      text: 'white',
    };
  }

  // to set multiple classes
  // let classes = ['red', 'bold'].join(' ');

  // to set multiple classes dynamically
  let classes = [];

  if (personState.showPersons) {
    classes.push('green', 'bold');
  } else {
    classes.push('red', 'bold');
  }

  // console.log('everytime is it now???');

  // since spread operator only makes a shallow copy of the object
  const togglePersonsHandler = () => {
    setPersonState({
      ...personState,
      persons: personState.persons.slice(),
      // for deep copy
      // persons: JSON.parse(JSON.stringify(personState)),
      showPersons: !personState.showPersons,
    });
  };

  // instead of using checks in jsx we can use variables and pass them
  let showingPersons = (
    <h3 className={classes.join(' ')}>
      Showing Persons: {personState.showPersons ? 'True' : 'False'}
    </h3>
  );

  const flexibleListHandler = (event, id) => {
    const personIndex = personState.persons.findIndex((p) => {
      return p.id === id;
    });
    const person = { ...personState.persons[personIndex] };
    person.name = event.target.value;
    const persons = [...personState.persons];
    persons[personIndex] = person;
    setPersonState({
      ...personState,
      persons: persons,
    });
  };

  // in react all lower case elements are reserved for native HTML elements, always use upper case for custom comp
  // since jsx is in js some words are renamed as they conflict with js keywords
  // in jsx only one root element should be created
  return (
    // <StyleRoot>
    // BrowserRouter is the routing of the application and it can be used in the sub embeded components
    // The basename is defined if the app is served for different url other than / ex. example.com/my-app
    <BrowserRouter basename="/">
      <div className="App">
        <h1>Hello there</h1>
        {showingPersons}
        {personState.showPersons ? (
          <div>
            <BasicComponent
              name={personState.persons[0].name}
              something={personState.persons[0].no}
              logger={logging}
              style={style}
            />
            <BasicComponent
              name={personState.persons[1].name}
              something={personState.persons[1].no}
              clickMe={setStateHandler.bind(this, 'sam1')}
            >
              Well well well
            </BasicComponent>
            <BasicComponent
              name={personState.persons[2].name}
              something={personState.persons[2].no}
              clickMe={setStateHandler.bind(this, 'sammm')}
            />
          </div>
        ) : null}

        <br />

        <button onClick={setStateHandler}>Click me</button>

        {/* use bind as this is inefficient */}
        <button onClick={() => setStateHandler('hello hello')}>
          Pass Method reference
        </button>

        {/* no if statements can be used */}
        <button onClick={togglePersonsHandler} style={style}>
          Toggle Persons
        </button>

        <br />

        <div>
          {/* to show array as list */}
          {/* key is used on element rendered by using list, it is used to update the list efficiently */}
          {personState.persons.map((person) => {
            return (
              // ErrorBoundary is a higher order boundary which wraps other component which might throw an error
              // the key should always be on the outer element in a map method
              <ErrorBoundary key={person.id}>
                <BasicComponent
                  name={person.name}
                  something={person.no}
                  logger={(event) => flexibleListHandler(event, person.id)}
                ></BasicComponent>
              </ErrorBoundary>
            );
          })}
        </div>
        <LifeCycleHooksCreateComponent title="Lifecycle Hooks"></LifeCycleHooksCreateComponent>
        <UseEffectComponent
          lengt={personState.persons.length}
        ></UseEffectComponent>
        <ContextProviderComponent></ContextProviderComponent>
        <Layout></Layout>
        <hr />
        <HttpRequestComponent></HttpRequestComponent>
        <hr />
        <RoutingComponent></RoutingComponent>
        <hr />
        <FormsComponent></FormsComponent>
        <hr />
        <ReduxComponent></ReduxComponent>
        <hr />
        <Auth></Auth>
        <hr />
        <AllHooks></AllHooks>
      </div>
    </BrowserRouter>
    // </StyleRoot>
  );

  // the jsx will inturn be compilled to the below code by the compiler
  // by default React.createElement creates only one element
  // if others are passed to it it will be treated as text
  // return React.createElement(
  //   'div',
  //   { className: 'App' },
  //   React.createElement('h1', {}, 'Hello There')
  // );
}

// radium can be used for both class and functional
// wrapping app with radium is enough for hover but for media queries and animations use StyleRoot
// export default Radium(App);

// using react router with connect will break the router
// use the withRouter hoc to pass the props down to the components
// withRouter can only be used inside the router i.e BrowserRouter
// export default withRouter(connect(null, null)(App));

export default App;
