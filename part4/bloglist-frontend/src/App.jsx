import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Login from './components/Login';
import CreateBlog from './components/CreateBlog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUsername(user);
      blogService.setToken(user.token);
    }
  }, []);

  async function handleLog(event) {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user.token)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  }

  function addBlog(event) {
    event.preventDefault();
    try {
      const blogObject = {
        title: title,
        author: author,
        // user: '',
        url: url,
        likes: 0
      };
      blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setTitle('');
        setAuthor('');
        setUrl('');
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      {!user && (
        <Login
          handleLog={handleLog}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {user && (
        <>
          <CreateBlog
            addBlog={addBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default App;
