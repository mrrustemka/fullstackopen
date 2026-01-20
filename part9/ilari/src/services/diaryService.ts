import diaries from '../../data/entries';
import {
  DiaryEntry,
  newDiaryEntry,
  NonSensitiveEntries,
  Visibility,
  Weather
} from '../types';

const getEntries = () => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveEntries[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility
  }));
};

const addDiary = (entry: newDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiary);
  return newDiary;
};

const findById = (id: number): DiaryEntry | undefined => {
  return diaries.find((d) => d.id === id);
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById
};
