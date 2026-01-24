export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type NonSensitivePatients = Omit<Patient, 'ssn'>;
export type CreatePatient = Omit<Patient, 'id'>;
