import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { ALL_BOOKS } from '../queries';

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null);

  const result = useQuery(ALL_BOOKS, {
    variables: { genre }
  });

  if (!show) return null;
  if (result.loading) return null;
  if (result.error) {
    return <div>Error loading books: {result.error.message}</div>;
  }

  const books = result.data.allBooks;

  // Collect unique genres
  const genres = [...new Set(books.flatMap((b) => b.genres))];

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>

          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            style={{
              marginRight: 5,
              fontWeight: genre === g ? 'bold' : 'normal'
            }}
          >
            {g}
          </button>
        ))}

        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
