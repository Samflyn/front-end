import { useState, useRef } from 'react';

const ExpenseForm = (props) => {
  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: 0,
  });

  // Below is using ref for the date input
  const dateInpputRef = useRef();

  const [isValid, setIsValid] = useState(true);
  //   instead of using multiple useState we can have object inside useState
  //   const [eneterdAmount, setEnteredAmount] = useState('');

  const titleChangeHandler = (event) => {
    // setUserInput({
    //     ...userInput,
    //     enteredTitle : event.target.value
    // });

    // As react schedules the state updates, in the above approach we might end up getting an older snapshot of the state
    // with the below react ensures we always get the latest snapshot of state

    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: event.target.value };
    });
  };

  const amountChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, enteredAmount: event.target.value };
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (userInput.enteredTitle.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onSaveExpenseData(userInput);
    clearForm();
  };

  const clearForm = () => {
    dateInpputRef.current.value = null;
    setUserInput(() => {
      return { enteredAmount: '', enteredTitle: '' };
    });
    setIsValid(true);
  };

  return (
    <form onSubmit={submitForm}>
      <div>
        <div>
          <label style={{ color: isValid ? 'black' : 'red' }}>Title</label>
          <input
            type="text"
            value={userInput.enteredTitle} // two way binding
            onChange={titleChangeHandler}
            style={{ borderColor: isValid ? 'black' : 'red' }}
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            min="1"
            max="99999"
            value={userInput.enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div>
          <label>Date</label>
          {/* Using refs for the below input */}
          <input type="date" min="2000-01-01" max="2099-31-12" ref={dateInpputRef}/>
        </div>
        <div>
          <button type="submit">Add Expense</button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
