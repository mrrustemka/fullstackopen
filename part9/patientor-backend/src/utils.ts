import { z } from 'zod';
import { CreatePatient, Gender } from './types';

// SCHEMA

export const newPatientSchema = z.object({
  name: z.string().min(1),
  ssn: z.string().min(1),
  dateOfBirth: z.string().min(1),
  occupation: z.string().min(1),
  gender: z.nativeEnum(Gender)
});

// TYPE-SAFE PARSER

export const toNewPatient = (object: unknown): CreatePatient => {
  return newPatientSchema.parse(object);
};
