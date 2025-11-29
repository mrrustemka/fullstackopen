const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error('Failed to load anecdotes');
  }

  return await response.json();
};

const createNew = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 })
  });

  if (!response.ok) {
    throw new Error('Falied to create an anecdote');
  }

  return await response.json();
};

const vote = async (id) => {
  const getResponse = await fetch(`${baseUrl}/${id}`);

  if (!getResponse.ok) {
    throw new Error('Failed to get an anecdote');
  }

  const anecdote = await getResponse.json();

  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote)
  });

  return response.json();
};

export default { getAll, createNew, vote };
