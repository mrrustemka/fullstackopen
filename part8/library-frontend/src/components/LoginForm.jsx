import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { LOGIN } from '../queries';

function LoginForm({ setError, setToken }) {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem('phonebook-user-token', token);
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  const submit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <>
      <form onSubmit={submit}>
        <div>
          Username
          <input
            value={username}
            onChange={({ target }) => setusername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type='password'
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  );
}

export default LoginForm;
