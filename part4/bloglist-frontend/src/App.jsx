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
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  async function handleLog(event) {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
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

  function createBlog(title, author, url, event) {
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

  async function removeBlog(id, event) {
    event.preventDefault();
    const blog = blogs.find((b) => b.id === id);

    const ok = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`);
    if (!ok) return;
    try {
      await blogService.remove(id);
      setBlogs(blog);
    } catch (error) {
      setNotify(`Couldn't remove a blog. There is an error: ${error}`);
      setNotifyType('error');
      setTimeout(() => {
        setNotify(null);
        setNotifyType('');
      }, 5000);
    }
  }

  async function setBlogLikes(blog, event) {
    event.preventDefault();
    try {
      const updatedBlog = {
        likes: blog.likes
      };

      const returnedBlog = await blogService.setLikes(blog.id, updatedBlog);
      setBlogs(blogs.map((b) => (b.id === blog.id ? returnedBlog : b)));
    } catch (error) {
      setNotify(`Couldn't update likes. There is an error: ${error}`);
      setNotifyType('error');
      setTimeout(() => {
        setNotify(null);
        setNotifyType('');
      }, 5000);
    }
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
              <CreateBlog createBlog={createBlog} />
              <button onClick={setCreateBlogVisibility}>Cancel</button>
            </>
          )}
          {!isCreateBlogVisible && (
            <button onClick={setCreateBlogVisibility}>Create new blog</button>
          )}
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                setBlogLikes={setBlogLikes}
                remove={removeBlog}
                user={user}
              />
            ))}
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default App;
