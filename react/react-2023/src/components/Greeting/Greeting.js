import { useState, useEffect } from 'react';

const Greeting = () => {
  const [changedText, setChangedText] = useState(false);

  const changeTextHandler = () => {
    setChangedText(true);
  };

  useEffect(() => {
    fetch('google.com')
      .then((response) => response.json())
      .then((data) => console.log(data));
  });

  return (
    <>
      <p data-testid="data-p">Hello There</p>
      {!changedText && <p>Initial Text</p>}
      {changedText && <p>Changed Text</p>}
      <button onClick={changeTextHandler} data-testid="button-clicker">
        Click me
      </button>
    </>
  );
};

export default Greeting;
