import { useDispatch } from 'react-redux';
import { counterActions } from '../../store/redux/ReduxStore';

const IncreaseCounter = () => {
  const dispatch = useDispatch();

  //   with redux
  //   const incrementHandler = () => {
  //     dispatch({ type: 'increment' });
  //   };

  //   with redux toolkit
  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(10));
  };

  return (
    <>
      <button onClick={increaseHandler}>Increase By 5</button>
      <button onClick={incrementHandler}>Increase Counter</button>
      <button onClick={decrementHandler}>Decrease Counter</button>
    </>
  );
};

export default IncreaseCounter;
