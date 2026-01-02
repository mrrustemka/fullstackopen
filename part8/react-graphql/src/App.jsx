import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import { ALL_PERSONS } from './queries';
import Notify from './components/Notify';
import './App.css';

function App() {
  const result = useQuery(ALL_PERSONS);
  const [message, setMessage] = useState(null);

  const notify = (m) => {
    setMessage(m);
    setTimeout(() => {
      setMessage(null);
    }, 10000);
  };

  if (result.loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Notify message={message} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
}

export default App;
