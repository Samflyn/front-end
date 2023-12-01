import { useReducer } from 'react';

const emailReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  return { value: '', isValid: false };
};

const UsingReduer = (props) => {
  //   const [enteredEmail, setEnteredEmail] = useState('');
  //   const [emailIsValid, setEmailIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false,
  });

//   console.log('Printing state', emailState);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  return (
    <>
      <p>Is email valid : {emailState.isValid}</p>
      <input type="text" onChange={emailChangeHandler}></input>
    </>
  );
};

export default UsingReduer;
