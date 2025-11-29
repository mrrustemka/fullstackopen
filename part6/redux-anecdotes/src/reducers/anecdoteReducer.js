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
      const id = action.payload.id;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);

      if (anecdoteToChange) {
        anecdoteToChange.votes = action.payload.votes;
      }
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});

const { setAnecdotes, createAnecdote, setVote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const addVote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(id);
    dispatch(setVote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
