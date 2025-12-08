import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useField } from './hooks';

const CreateNew = (props) => {
  const navigate = useNavigate();
  const content = useField();
  const author = useField();
  const info = useField();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
    navigate('/');
  };

  const buttonStyles = {
    textDecoration: 'none',
    color: 'black'
  };

  const reset = () => {
    content.onReset();
    author.onReset();
    info.onReset();
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input
            name='content'
            value={content.value}
            type={content.type}
            onChange={content.onChange}
          />
        </div>
        <div>
          Author
          <input
            name='author'
            value={author.value}
            type={author.type}
            onChange={author.onChange}
          />
        </div>
        <div>
          URL for more info
          <input
            name='info'
            value={info.value}
            type={info.type}
            onChange={info.onChange}
          />
        </div>
        <button type='submit'>Create</button>
        <button type='reset' onClick={reset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
