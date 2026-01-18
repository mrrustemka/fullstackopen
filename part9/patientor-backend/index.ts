import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req: any, res: any) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log('run');
});
