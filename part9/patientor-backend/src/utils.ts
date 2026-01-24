import { CreatePatient, Gender } from './types';

//TYPE PREDICATES

const isString = (value: unknown): value is string => {
  return typeof value === 'string' || value instanceof String;
};

const isGender = (value: unknown): value is Gender => {
  return Object.values(Gender).includes(value as Gender);
};

// PARSERS
const parseString = (value: unknown, field: string): string => {
  if (!isString(value)) {
    throw new Error(`Invalid or missing ${field}`);
  }
  return value;
};

const parseGender = (value: unknown): Gender => {
  if (!isGender(value)) {
    throw new Error('Invalid or missing gender');
  }
  return value;
};

//MAIN CONVERTER

export const toNewPatient = (object: unknown): CreatePatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing patient data');
  }

  if (
    'name' in object &&
    'ssn' in object &&
    'dateOfBirth' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    return {
      name: parseString(object.name, 'name'),
      ssn: parseString(object.ssn, 'ssn'),
      dateOfBirth: parseString(object.dateOfBirth, 'dateOfBirth'),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation')
    };
  }

  throw new Error('Missing required patient fields');
};
