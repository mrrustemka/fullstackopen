import { useContext } from 'react';
import CounterContext from '../CounterContext';

function Display() {
  const { counter } = useContext(CounterContext);
  return <>{counter}</>;
}

export default Display;
