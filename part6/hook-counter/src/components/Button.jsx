import { useContext } from 'react';
import CounterContext from '../CounterContext';

function Button({ label, type }) {
  const { counterDispatch } = useContext(CounterContext);
  return (
    <>
      <button onClick={() => counterDispatch({ type })}>{label}</button>
    </>
  );
}

export default Button;
