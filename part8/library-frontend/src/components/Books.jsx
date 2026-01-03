import { ALL_BOOKS } from '../queries';
import { useQuery } from '@apollo/client/react';

const Books = () => {
  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
