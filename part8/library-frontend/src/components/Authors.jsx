import { useState } from 'react';
import { ALL_AUTHORS, EDIT_BORN } from '../queries';
import { useMutation, useQuery } from '@apollo/client/react';

const Authors = ({ show }) => {
  const result = useQuery(ALL_AUTHORS);
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [editBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <>Loading...</>;
  }

  const authors = result.data.allAuthors;

  const submit = (e) => {
    e.preventDefault();

    editBorn({ variables: { name, born } });

    setName('');
    setBorn('');
  };

  return (
    <>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.books}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <div>
          Select a Name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value=''>Select author</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Birth Year
          <input
            value={born}
            type='number'
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>Update</button>
      </form>
    </>
  );
};

export default Authors;
