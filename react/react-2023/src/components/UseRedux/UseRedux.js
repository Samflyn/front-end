import { useSelector } from 'react-redux';

const Counter = () => {
  const counter = useSelector((state) => state.counter.counter);

  return <>{counter}</>;
};

export default Counter;
