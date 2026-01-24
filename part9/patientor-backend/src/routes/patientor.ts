import express from 'express';
import patientorService from '../service/patientorService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientorService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientorService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
