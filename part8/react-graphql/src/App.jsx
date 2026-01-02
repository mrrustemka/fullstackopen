import { useQuery } from '@apollo/client/react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import { ALL_PERSONS } from './queries';
import './App.css';

function App() {
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Persons persons={result.data.allPersons} />
      <PersonForm />
    </>
  );
}

export default App;
