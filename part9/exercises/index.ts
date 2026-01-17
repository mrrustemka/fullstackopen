const express = require('express');
const app = express();
app.use(express.json());
import { getBmi } from './bmiCalculator';
import { getCalculations } from './exerciseCalculator';

interface ExerciseBody {
  daily_exercises: number[];
  target: number;
}
const qs = require('qs');
app.set('query parser', (str: any) =>
  console.log(
    qs.parse(str, {
      foo: 'bar',
      abc: ['xyz', '123']
    })
  )
);

app.get('/ping', (_req: any, res: any) => {
  res.send('pong');
});

app.get('/bmi', (_req: any, res: any) => {
  const data = _req._parsedUrl.query
    .split('&')
    .map((q: string) => q.split('='));

  const height = Number(data[0][1]);
  const weight = Number(data[1][1]);

  if (
    isNaN(height) ||
    isNaN(weight) ||
    data[0][0] !== 'height' ||
    data[1][0] !== 'weight'
  ) {
    res.send({
      error: 'malformatted parameters'
    });
  }

  res.send({
    weight: weight,
    height: height,
    bmi: getBmi(height, weight)
  });
});

app.post('/exercises', (_req: any, res: any) => {
  try {
    const body = _req.body as ExerciseBody;
    const { daily_exercises, target } = body;

    if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
      throw new Error('malformatted parameters');
    }

    res.send(getCalculations(daily_exercises, target));
  } catch (error) {
    let message = 'Something went wrong';

    if (error instanceof Error) {
      message = 'parameters missing';
    }

    res.status(400).json({ error: message });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
