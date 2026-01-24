import express from 'express';
import patientorService from '../service/patientorService';
import { toNewPatient } from '../utils';
import { ZodError } from 'zod';

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientorService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message
        }))
      });
      return;
    }

    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(400).json({ error: 'Unknown error' });
  }
});

export default router;
