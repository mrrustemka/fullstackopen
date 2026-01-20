import { newDiaryEntry } from './types';

export const toNewDiaryEntry = (object: unknown): newDiaryEntry => {
  console.log(object);
  const newEntry: newDiaryEntry = {
    date: '',
    weather: 'cloudy',
    visibility: 'great',
    comment: ''
  };

  return newEntry;
};
