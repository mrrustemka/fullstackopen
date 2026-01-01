import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import Persons from './components/Persons';
import './App.css';

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

function App() {
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Persons persons={result.data.allPersons} />
    </>
  );
}

export default App;
