const express = require('express');
const app = express();
import { calculator } from './calculator';

app.use(express.json());

app.get('/ping', (_req: any, res: any) => {
  res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: '...' });
  }

  const result = calculator(Number(value1), Number(value2), op);
  res.send({ result });
});
