import { useState } from 'react';

function Blog({ blog, setBlogLikes, remove }) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

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
          <button onClick={handleRemove}>Remove</button>
        </>
      )}
    </div>
  );
}

export default Blog;
