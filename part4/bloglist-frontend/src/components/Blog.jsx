import { useState } from 'react';

function Blog({ blog, setBlogLikes, remove, user }) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const canRemove =
    blog.user && (blog.user.id === user.id || blog.user._id === user.id);

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
      {blog.title} {blog.author}{' '}
      <button onClick={setDetailsVisibility}>
        {isDetailsVisible ? 'Hide' : 'View'}
      </button>
      {isDetailsVisible && (
        <>
          <div>
            Likes {blog.likes}
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
