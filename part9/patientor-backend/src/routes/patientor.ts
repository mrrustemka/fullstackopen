import express from 'express';
import patientorService from '../service/patientorService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientorService.getNonSensitivePatients());
});

export default router;
