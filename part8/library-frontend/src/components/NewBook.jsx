import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries';

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState(0);
  const [genres, setGenres] = useState('');

  const [createBook] = useMutation(ADD_BOOK, {
    update: (cache, { data }) => {
      const addedBook = data.addBook;

      cache.modify({
        fields: {
          allBooks(existingBooks = []) {
            return [...existingBooks, addedBook];
          }
        }
      });
    }
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createBook({
      variables: {
        title,
        published,
        author,
        genres: genres.split(',').map((g) => g.trim())
      }
    });

    console.log('add book...');

    setTitle('');
    setPublished(0);
    setAuthor('');
    setGenres('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          genres
          <input
            placeholder='fantasy, drama, classic'
            value={genres}
            onChange={({ target }) => setGenres(target.value)}
          />
        </div>
        <button type='submit'>Create Book</button>
      </form>
    </div>
  );
};

export default NewBook;
