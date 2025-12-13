import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';

const useNotes = async (url) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setNotes(response.data);
    });
  }, [url]);
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  const notes = useNotes(BACKEND_URL);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    <div className='container'>
      Hello Webpack {counter} clicks
      <button onClick={handleClick}>Press</button>
      <div>
        {notes.length} notes on the server {BACKEND_URL}
      </div>
    </div>
  );
};

export default App;
