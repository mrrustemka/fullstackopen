import { useQuery } from '@apollo/client/react';
import { useState, useEffect } from 'react';
import { ALL_BOOKS, ME } from '../queries';

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null);

  const meResult = useQuery(ME);
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre }
  });

  useEffect(() => {
    if (meResult.data?.me?.favoriteGenre) {
      setGenre(meResult.data.me.favoriteGenre);
    }
  }, [meResult.data]);

  if (!show) return null;
  if (meResult.loading || booksResult.loading) return null;

  if (meResult.error) {
    return <div>Error loading user</div>;
  }

  if (booksResult.error) {
    return <div>Error loading books</div>;
  }

  const books = booksResult.data.allBooks;
  const favoriteGenre = meResult.data?.me?.favoriteGenre;

  return (
    <div>
      <h2>Books</h2>

      {favoriteGenre && (
        <p>
          books in your favorite genre <b>{favoriteGenre}</b>
        </p>
      )}

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
        {favoriteGenre && (
          <button
            onClick={() => setGenre(favoriteGenre)}
            style={{ fontWeight: 'bold', marginRight: 5 }}
          >
            {favoriteGenre}
          </button>
        )}

        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
