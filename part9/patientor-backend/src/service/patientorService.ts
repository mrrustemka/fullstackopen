import patients from '../data/patients';
import diagnoses from '../data/diagnoses';
import { NonSensitivePatients } from '../types';

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

export default {
  getDiagnoses,
  getNonSensitivePatients
};
