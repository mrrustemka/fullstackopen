import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import CreateBlog from './components/CreateBlog';
import Login from './components/Login';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notify, setNotify] = useState(null);
  const [notifyType, setNotifyType] = useState('');
  const [isCreateBlogVisible, setIsCreateBlogVisible] = useState(false);

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
      setNotifyType('error');
      setNotify(`Wrong username or password`);
      setTimeout(() => {
        setNotify(null);
        setNotifyType('');
      }, 5000);
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
        url: url
      };
      blogService.create(blogObject).then((returnedBlog) => {
        setNotifyType('info');
        setNotify(`A new blog ${title} by ${author} added`);
        setTimeout(() => {
          setNotify(null);
          setNotifyType('');
        }, 5000);
        setBlogs(blogs.concat(returnedBlog));
        setTitle('');
        setAuthor('');
        setUrl('');
        setIsCreateBlogVisible(!isCreateBlogVisible);
      });
    } catch (error) {
      setNotify(`Couldn't add a blog. There is an error: ${error}`);
      setNotifyType('error');
      setTimeout(() => {
        setNotify(null);
        setNotifyType('');
      }, 5000);
    }
  }

  function setCreateBlogVisibility() {
    setIsCreateBlogVisible(!isCreateBlogVisible);
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notify} type={notifyType} />
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
          {isCreateBlogVisible && (
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
              <button onClick={setCreateBlogVisibility}>Cancel</button>
            </>
          )}
          {!isCreateBlogVisible && (
            <button onClick={setCreateBlogVisibility}>Create new blog</button>
          )}
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
