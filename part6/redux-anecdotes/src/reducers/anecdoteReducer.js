import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return [...state, action.payload];
    },
    setVote(state, action) {
      const anecdoteToChange = state.find(
        (anecdote) => anecdote.id === action.payload
      );

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };

      return state.map((anecdote) =>
        anecdote.id === changedAnecdote.id ? changedAnecdote : anecdote
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});

export const { createAnecdote, setVote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
