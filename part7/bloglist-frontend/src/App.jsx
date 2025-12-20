import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import CreateBlog from './components/CreateBlog';
import Login from './components/Login';
import loginService from './services/login';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer';
import { notify } from './reducers/notifyReducer';
import { newBlog, addLike, deleteBlog } from './reducers/blogsReducer';

const App = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [isCreateBlogVisible, setIsCreateBlogVisible] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeBlogs());
	}, [dispatch]);

	const blogs = useSelector(({ blogs }) => {
		if (!Array.isArray(blogs)) return [];

		return blogs;
	});

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
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (error) {
			dispatch(notify(`Wrong username or password`, 'error'));
			console.error(error);
		}
	}

	function handleLogout() {
		window.localStorage.removeItem('loggedBlogappUser');
		setUser(null);
	}

	async function createBlog(title, author, url, event) {
		event.preventDefault();

		try {
			const newObject = {
				title: title,
				author: author,
				url: url,
			};
			dispatch(newBlog(newObject));
			dispatch(notify(`A new blog "${title}" by ${author} added`, 'info'));
			setIsCreateBlogVisible(!isCreateBlogVisible);
		} catch (error) {
			dispatch(notify(`Couldn't add a blog`, 'error'));
			console.error(error);
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
			dispatch(deleteBlog(blog.id));
		} catch (error) {
			dispatch(notify(`Couldn't remove a blog. There is an error: ${error}`, 'error'));
		}
	}

	async function setBlogLikes(blog, event) {
		event.preventDefault();
		const updatedBlog = {
			likes: blog.likes,
		};

		try {
			dispatch(addLike(blog.id, updatedBlog));
		} catch (error) {
			dispatch(notify(`Couldn't update likes. There is an error: ${error}`));
		}
	}

	return (
		<div>
			<h1>Blogs</h1>
			<Notification />
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
						// .sort((a, b) => b.likes - a.likes)
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
