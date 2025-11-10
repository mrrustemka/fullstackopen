import './App.css';
import { createStore } from 'redux';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

// store.subscribe();
function App() {
  return (
    <>
      <div>{store.getState()}</div>
      <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>
        Plus
      </button>
      <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>
        Minus
      </button>
      <button onClick={() => store.dispatch({ type: 'ZERO' })}>Zero</button>
    </>
  );
}

export default App;
