import { useDispatch, useSelector } from 'react-redux';
import { setVote } from '../reducers/anecdoteReducer';
import { setNotify } from '../reducers/notificationReducer';

function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter((anecdote) => anecdote.content.includes(filter));
  });

  const vote = (id) => {
    dispatch(setVote(id));
    dispatch(setNotify(`You voted ''`));
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
