import { useState } from 'react';

function Blog({ blog, setBlogLikes, remove, user }) {
	const [isDetailsVisible, setIsDetailsVisible] = useState(false);
	const canRemove = blog.user && (blog.user.id === user.id || blog.user._id === user.id);

	function setDetailsVisibility() {
		setIsDetailsVisible(!isDetailsVisible);
	}

	function setLike(event) {
		setBlogLikes({ ...blog, likes: blog.likes + 1 }, event);
	}

	function handleRemove(event) {
		remove(blog.id, event);
	}

	return (
		<div className='blog'>
			<h3 className='title'>{blog.title}</h3>
			<h4 className='author'>{blog.author}</h4>
			<button onClick={setDetailsVisibility}>{isDetailsVisible ? 'Hide' : 'View'}</button>
			{isDetailsVisible && (
				<>
					<div>
						<h4 className='likes'>Likes {blog.likes}</h4>
						<button onClick={setLike}>Like</button>
					</div>
					<div>{blog.user.username}</div>
					{canRemove && <button onClick={handleRemove}>Remove</button>}
				</>
			)}
		</div>
	);
}

export default Blog;
