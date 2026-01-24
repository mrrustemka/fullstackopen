import patients from '../data/patients';
import diagnoses from '../data/diagnoses';

import { CreatePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = () => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: CreatePatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const getDiagnoses = () => {
  return diagnoses;
};

export default {
  getNonSensitivePatients,
  addPatient,
  getDiagnoses
};
