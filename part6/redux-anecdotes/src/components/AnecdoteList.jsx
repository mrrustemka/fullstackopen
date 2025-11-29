import { useDispatch, useSelector } from 'react-redux';
import { setNotify } from '../reducers/notificationReducer';
import { addVote } from '../reducers/anecdoteReducer';

function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!Array.isArray(anecdotes)) return [];

    return anecdotes.filter((anecdote) => {
      if (!anecdote.content || typeof anecdote.content !== 'string')
        return false;

      return anecdote.content.toLowerCase().includes(filter.toLowerCase());
    });
  });

  const vote = (id) => {
    dispatch(addVote(id));
    dispatch(setNotify('You Voted'));
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>Vote</button>
            </div>
          </div>
        ))}
    </>
  );
}

export default AnecdoteList;
