import express from 'express';
import diagnoses from './src/data/diagnoses';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req: any, res: any) => {
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnoses);
});

app.listen(PORT, () => {
  console.log('run');
});
