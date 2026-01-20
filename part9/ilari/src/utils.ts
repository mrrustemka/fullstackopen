import { newDiaryEntry, Visibility, Weather } from './types';

export const toNewDiaryEntry = (object: unknown): newDiaryEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)  {
    const newEntry: newDiaryEntry = {
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      date: parseDate(object.date),
      comment: parseComment(object.comment)
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return String(comment);
};

const parseDate = (date: unknown): string {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date' + date);
    }

    return String(date);
}

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
      throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};

const parseVisibility = (visibility: unknown): Visibility => {
  // check !visibility removed:
  if (!isString(visibility) || !isVisibility(visibility)) {
      throw new Error('Incorrect visibility: ' + visibility);
  }
  return visibility;
};

const isString = (text: unknown): boolean => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date)); 
}

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather).map(v => v.toString()).includes(param);
};

const isVisibility = (str: string): str is Visibility => {
  return Object.values(Visibility).map(v => v.toString()).includes(str);
};
