import diaries from '../../data/entries';
import { DiaryEntry, NonSensitiveEntries } from '../types';

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

const addDiary = () => {
  return null;
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
