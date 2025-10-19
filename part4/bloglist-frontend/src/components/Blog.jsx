import { useState } from 'react';

function Blog({ blog, setBlogLikes }) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  function setDetailsVisibility() {
    setIsDetailsVisible(!isDetailsVisible);
  }

  function setLike(event) {
    setBlogLikes({ ...blog, likes: blog.likes + 1 }, event);
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
        </>
      )}
    </div>
  );
}

export default Blog;
