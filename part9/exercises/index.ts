const express = require('express');
const app = express();
// import bmi = require('./bmiCalculator');
import { getBmi } from './bmiCalculator';
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

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
