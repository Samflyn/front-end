import React, { useState } from 'react';

// useState helps manage state in func comp
// the difference to state in class state is that it can be initialized with any value not only value
// class based state can only be an object

const stateHook = React.memo((props) => {
  // useState always returns an array with two elements
  // the first is always current state snapshot
  // when state or props change this component re-renders but react manages useState independant to component
  // useState will be detached from the component so that the state is saves when component re-renders

  // the second is a function that is used to update the state
  // in functional components useState the state is replaced when updated
  // if name is updated age will be lost

  // the way react manages state, if there are low resources the state update will be deffered
  // the state change which dependes on the latest state this will cause some issues
  // instead of passing a value to setState we can pass a function which will receive the latest state passed by react
  // this passed state is always the latest state even if the state update is deferred
  const inputState = useState({ name: '', age: '' });

  // array de-structuring
  // use multiple state for different things as it will be easier to manage states independently
  const [addressState, setAddressState] = useState('');

  // useState should always be used on the root level, not inside a function or any if or other loops

  // React batches state updates - see: https://github.com/facebook/react/issues/10231#issuecomment-316644950

  // That simply means that calling

  // setName('Max');
  // setAge(30);
  // in the same synchronous (!) execution cycle (e.g. in the same function) will NOT trigger two component re-render cycles.

  // Instead, the component will only re-render once and both state updates will be applied simultaneously.

  // Not directly related, but also sometimes misunderstood, is when the new state value is available.

  // Consider this code:

  // console.log(name); // prints name state, e.g. 'Manu'
  // setName('Max');
  // console.log(name); // ??? what gets printed? 'Max'?
  // You could think that accessing the name state after setName('Max'); should yield the new value (e.g. 'Max') but this is NOT the case. Keep in mind, that the new state value is only available in the next component render cycle (which gets scheduled by calling setName()).

  // Both concepts (batching and when new state is available) behave in the same way for both functional components with hooks as well as class-based components with this.setState()!

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('submitted');
    console.log(addressState);
    setAddressState('something as');
    console.log(addressState);
  };

  return (
    <div>
      <h3>Managing state and life cycle hooks in functional components</h3>
      <form onSubmit={(event) => onSubmitHandler(event)}>
        <div>
          <label htmlFor="title">Name : </label>
          <input
            type="text"
            id="title"
            value={inputState[0].name}
            // for the first change event will be locked in due to use of closure
            // the way event is used in react, it reuses the previous event object
            onChange={(event) => {
              const inputName = event.target.value;
              inputState[1]((prevInputState) => ({
                name: inputName,
                age: prevInputState.age,
              }));
            }}
          />
        </div>
        <div>
          <label htmlFor="age">Age : </label>
          <input
            type="number"
            id="age"
            value={inputState[0].age}
            onChange={(event) => {
              const inputAge = event.target.value;
              inputState[1]((prevInputState) => ({
                name: prevInputState.name,
                age: inputAge,
              }));
            }}
          />
        </div>
        <div>
          <label htmlFor="address">Address : </label>
          <input
            type="text"
            id="address"
            value={addressState}
            onChange={(event) => setAddressState(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
});

export default stateHook;
