# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### =================================================================================

### =================================================================================

### =================================================================================

### Instructions and notes

### Creating new react app

npx create-react-app my-app
cd my-app
npm start

### Components

Written in a Declarative way

Can have only one root element in the return function from the components

className instead of class for styling

to output variables or to write the js code in jsx we can use { } and write code inside them

Props are used to send attributes to custom components
to get the value for an arrtibute we can use props.name

to use custom component inside a custom component we can use props.children

### JSX

JSX internally is converted to the below code

In the past we had to import React from 'react' in every component

React.createElement('div', {}, React.createElement('h2', {}, 'Hello There'), Reac.createElement(Component, {title: 'some title'}));

### State

For any changes we make in our variables it will not be rerendered in the dom

To rerender the dom we need to import {useState} from 'react'
This function alows us to define variables as state where changes to the variables will reflect in the dom
All the hooks can only be called inside the react component functions
useState will not update the values instantly but will schedule the state update
useState returns an array of exactly two elements the first is the value of the state and the second is a function which can be used to update the value of the state
the function can be used to either set the value and it can also take a function like below to get hold of the previousState

setUserInput((prevState) => {
return { ...prevState, enteredTitle: event.target.value };
});

controlled component is when we use two way binding between two components the child is called the controlled component
statefull components are where you manage state in them

when rendering list which is updated using state

- we need to give it a "key" with a unique value
- Else react will update list as last element in list and updates all the elements to match the current array order
- all items are updated this way
- the key can be added to any element or component

### Styliing components

the css file imported in a component is not scoped only to that specific component and are globally applied in the rendered dom

the style attribute takes an object and can use the js style attributes inside it style = {{ color : 'red' }}
the above is inline style and has the highest priority in css

or we can dynamically add css classes to the div i.e <div className = {`"someCssClass ${isValid ? 'invalid' : ''}"`}>

we can use styled components package npm install --save styled-components

we use a tagged template literal for styled components

import styled from 'styled-components'

const Button = styled.button`"write all the css styles here not the class and for psuedo class we can use &:<>"`;

the package takes all the styles and generates random css class names and applies them to the component we use them for

this also applies all the props and forwarded so we can directly use props inside the styles `props.inValid`

media queries can be used along with css syles

### Styling with CSS modules

We can use css modules as an alternate approach to styles-components package
a react project created using create-react-app will support css-modules by default

the css files should be renamed to Button.module.css and import styles from './Button.moduule.css'

to apply to a tag we use <div className = {styles.button}> (here button is a css class in Button.module.css)

this will inturn be transformed to <div class="Button_button__$hash"> in dom

to use the property in the css <div className={styles['from-control']}>

for dynamic css using css modules <div className = `${style['from-control']} ${!isValid && styles.inValid}`>

### Fragments, portals and "Refs"

Fragments-
To overcome the <div> soup issue we can either use <React.Fragment> or <Fragment> or just <>

These are nothing but empty wrapper components just like below

const Wrapper = (props) => {
return props.children;
};

export default Wrapper;

Portals -
Suppose we have an overlay nested deep inside some dev but want it as a child of the <body> we can use portals

We create a new portal by using

- import { createPortal } from 'react-dom';

- return (
  <>{createPortal(<ErrorModal />, document.getElementById('error-modal'))}</>
  );

Here the 'error-modal' is the html tag id in the dom

Refs -

Instead of using onChange handler to get the values and update the state each time we can get the reference to dom input element using refs

we can use import { useRef } from 'react'; and create a new ref and use <ref> prop for the input which would get the reference in the dom

### Effects, Reducers & Context

Effect - 

useEffect() hook can be called with a function after every component evaluation and the second is a list of dependencies for which the function should run

The useEffect will run the first time after the component execution and will only run when the dependencies are changed

import { useEffect } from 'react';

useEffect(() => {}, [userInput, formSubmit]);

We can also return a cleanup function which will run before each side effect function is executed

useEffect(() => {
  return () => {console.log('cleanup after unmounting component')}
}, []);

Reducer -

reducers can be used when states are linked and we need to update states based on some other state ex. checking form validity using email and password

import { useReducer } from 'react';

const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);

state -> state snapshot

dispatchFn -> fn used to dispatch a new action(trigger a new state update)

reducerFn -> will get the latest state and action as props and must return the updated state (prevState, action) => newState

initFn -> to set the initial state progamatically for example using http calls and setting up the state

### Context API

A createContext fn is used to create context and use it accross the components

This created context can be directly used only in the components which is wrapped directly or as a sub child of the parent that is wrapped with the context provider

import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
});

export default AuthContext;

If we need to use it in <App> we simply use

return(
  <AuthContext.Provider value={{
    isLoggedIn = false
  }}>
    <App></App> // we can use the context inside app and any component which is a child of the app
  </AuthContext.Provider>
)

We can use the context in two ways using the consumer or by using the react hook

We wrap the component where we need to use the context in consumer

return(
  <AuthContext.Consumer>
    {(ctx) => {
      return (//Access the context here and return the jsx code here);
    }}
  </AuthContext.Consumer>
)

The alternative approach would be to use the useContext hook

import { useContext } from 'react'

And then use the context using const cxt = useContext(AuthContext);

<!-- Context is not meant for high frequency state changes intead we need to use redux for that -->

# Forward Refs

Refs can only take values but not functions, for that we need to use useImperativeHandle hook

We would also need to wrap out component with React.forwardRef((props, ref) => <component>);

<!-- Here the ref is the second param besides props -->
useImperativeHandle(ref , () => {
  return {
    <!-- all the fields that we need to access from outside the component -->
    <!-- basically a translation object between internal and external components -->
    fieldName: functionRef
  }
})

### React Memo

We can use unnecessary component re-evaluation by wrapping functonal components with React.memo()

React.memo will not work if we use functions as props as functions are nothing but objects in js

To overcome this issue we can use useCallback hook from react which will save the function in memory

useCallback takes a function and dependencies useCallback(() => {}, []);

If a function is used inside useCallBack then this function would not run as functions in js are closure, so if a fn is used in callback we need to define it in the list of dependencies

We can use useMemo(() => {return {data to memoize}}, [dependencies])

### Custom Hooks

Always start the custom hooks with `use` at the start of the file name

We can use react hooks in the custom hooks

If a custom hook uses any of the react hooks they would be tied to the component that is using it

Simply put if we use useState in out custom hook it basically is using it at our component level

To get the state data we can simpley return it as the custom hooks are nothing but functions

### Redux - A flux like state management(Alternative to react context)

- We create only one central data store at a time

- Components subscribe to the central data store and are notified whenever the data is changes

- !!! Components never direclty change the data in the store for that we use a concept called reducer

- Components dispatch actions to reducers and which effectively updates the new state

- Reducer function will be called by redux and will recieve the old state and the action that was dispatched, this will return the new updated state

To use the store in our component we need to wrap the <Provider store={reduxStore}> from 'react-redux' under the root component where we need to use the store

The reduxStore is the default export of the created store

We use import { useSelector } from 'react-redux'; to get hold of the state from the redux store

If we use useSelector redux will automatically subscribe to that slice of the state and will be update the component when the state changes

To update the state we use import { useDispatch } from 'react-redux'; and dispatch the action like dispatch({ type: 'increment' });

For class based we need to use connect and give mapStateToProps and mapDispatchToProps.

### Redux Toolkit

- creating state slice with toolkit, it internally uses immer to check how we do the state changes and modify it to return a new state but not modify the existing state accidentally

import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state, action) {}
    decrement(state, action) {}
  }
})

To use the actions we can export the actions from counterSlice

export const counterActions = counterSlice.actions;

To use the above stre we use configureStore

const store = configureStore({
  reducer: {key : counterSlice.reducer}
})

We then dispatch actions using

import { useDispatch } from 'react-redux';

const dispatch = useDispatch();

<!-- We execute the function only if we are using the generated action creators -->
dispatch(counterActions.increment());

<!-- If our code is not async we can put all the data transformation logic in reducers -->
<!-- But for async code we never use reducers but only go with either action creators or components -->

### Thunk

A function that delays an action until later
An action creator function that does not return the action itself but another function which eventually returns the action

### Testing

findBy returns a promise where getBy will return the element directly

So to test async code we use findBy instead of getBy

### React Router

By default react does not have built in support for routing, we need to add react-router-dom package for this

To create routes we use createBrowserRouter like below

const router = createBrowserRouter([
  { path: '/', Component: App },
  { path: '/profile', element: <Profile /> },
]);

And provide the router to <RouterProvider router={router}>

If we use <a> for using links browser does a refresh and goes to that specific page, to use react and route between pages we use
<Link to={'/profile'}>Profile Page </Link> this will prevent browser default behaviour and react routing kicks in

We can use a root component and render the children in side them like below

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      { path: '/', Component: App },
      { path: '/profile', element: <Profile /> },
    ]
  }
]);

And in our root layout we define where our children should render with <Outlet /> from 'react-router-dom', this is a placeholder for react to render the children components

We can use <NavLink /> instead of <Link /> to know if the link is active, by default NavLink treats a link as active if the url starts with the link so "/" is always active even is we are in the child route, to fix this we can add end to <NavLink end={true} /> so it will check if the url ends with the link

To navigate programatically we use useNavigate

To define dynamic routes we can give the path like "/profile/:profileId", to get this profileId in the component that's rendered we can use useParams() which will have the profileId

