import express from 'express';
import cors from 'cors';
import patientsRouter from './src/routes/patientor';
import diagnosesRouter from './src/routes/diagnoses';
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req: any, res: any) => {
  res.send('pong');
});

app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log('run');
});
