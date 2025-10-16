import { useState } from 'react';

function Blog({ blog }) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  function setDetailsVisibility() {
    setIsDetailsVisible(!isDetailsVisible);
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
            <button>Like</button>
          </div>
          <div>{blog.user.username}</div>
        </>
      )}
    </div>
  );
}

export default Blog;
