import { CreatePatient } from './types';

const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

const parseString = (value: unknown, field: string): string => {
  if (!isString(value)) {
    throw new Error(`Invalid or missing ${field}`);
  }
  return value;
};

export const toNewPatient = (obj: any): CreatePatient => {
  return {
    name: parseString(obj.name, 'name'),
    ssn: parseString(obj.ssn, 'ssn'),
    dateOfBirth: parseString(obj.dateOfBirth, 'dateOfBirth'),
    gender: parseString(obj.gender, 'gender'),
    occupation: parseString(obj.occupation, 'occupation')
  };
};
