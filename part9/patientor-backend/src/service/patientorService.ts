import patients from '../data/patients';
import diagnoses from '../data/diagnoses';
import { NonSensitivePatients, CreatePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getDiagnoses = () => {
  return diagnoses;
};

const addPatient = (entry: CreatePatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getDiagnoses,
  getNonSensitivePatients,
  addPatient
};
