import { newDiaryEntry, Visibility, Weather } from './types';

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

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const parseDate = (date: unknown): string {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date' + date);
    }

    return date;
}

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
      throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
      throw new Error('Incorrect or missing weather: ' + visibility);
  }
  return visibility;
};

const isString = (text: unknown): boolean => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date)); 
}

const isWeather = (str: string): str is Weather => {
  return ['sunny', 'rainy', 'cloudy', 'stormy'].includes(str);
};

const isVisibility = (str: string): str is Visibility => {
  return ['great' , 'good' , 'ok' , 'poor'].includes(str);
};
