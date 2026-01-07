import { ALL_BOOKS } from '../queries';
import { useQuery } from '@apollo/client/react';

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return null;
  }

  // Add error handling
  if (result.error) {
    return <div>Error loading books: {result.error.message}</div>;
  }

  // Add a safety check for data
  if (!result.data || !result.data.allBooks) {
    return null;
  }

  const books = result.data.allBooks;

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
