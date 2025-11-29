import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
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

const { setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const { createAnecdote, setVote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
