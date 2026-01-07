import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(
    localStorage.getItem('phonebook-user-token')
  );

  if (!token) {
    return (
      <>
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError='' />
      </>
    );
  }

  return (
    <>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('add')}>Add Book</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </>
  );
};

export default App;
