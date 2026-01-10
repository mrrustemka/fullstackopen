import {
  useApolloClient,
  useQuery,
  useSubscription
} from '@apollo/client/react';
import { useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';
import { ALL_PERSONS, PERSON_ADDED } from './queries';
import { addPersonTOCache } from './utils/apolloCache';

function App() {
  const result = useQuery(ALL_PERSONS);
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('phonebook-user-token')
  );
  const client = useApolloClient();

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded;
      notify(`${addedPerson.name} added`);
      addPersonTOCache(client.cache, addedPerson);
    }
  });

  const notify = (m) => {
    setMessage(m);
    setTimeout(() => {
      setMessage(null);
    }, 10000);
  };

  const onLogout = () => {
    setToken(null);
    localStorage.removeItem('phonebook-user-token');
    client.resetStore();
  };

  if (result.loading) {
    return <>Loading...</>;
  }

  if (!token) {
    return (
      <>
        <Notify message={message} />
        <LoginForm setError={notify} setToken={setToken} />
      </>
    );
  }

  return (
    <>
      <Notify message={message} />
      <button onClick={onLogout}>Logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
}

export default App;
