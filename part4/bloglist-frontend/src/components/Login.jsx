﻿function Login({ handleLog, username, setUsername, password, setPassword }) {
  return (
    <>
      <form onSubmit={handleLog}>
        <div>
          <label>
            username
            <input
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type='text'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  );
}

export default Login;
