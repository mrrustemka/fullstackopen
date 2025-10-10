import React from 'react';

function CreateBlog({
  addBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl
}) {
  return (
    <>
      <h2>Create Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            Title
            <input
              type='text'
              value={title}
              onChange={({ target }) => {
                setTitle(target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Author
            <input
              type='text'
              value={author}
              onChange={({ target }) => {
                setAuthor(target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            URL
            <input
              type='text'
              value={url}
              onChange={({ target }) => {
                setUrl(target.value);
              }}
            />
          </label>
        </div>
        <button type='submit'>Create</button>
      </form>
    </>
  );
}

export default CreateBlog;
