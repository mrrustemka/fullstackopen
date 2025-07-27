import { useState } from 'react';
import Button from './Button';
import StatisticLine from './StatisticLine ';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positivePercentage, setPositivePercentage] = useState(0);

  function goodHandler(value) {
    const good = value + 1;
    setGood(good);
    setTotal(total + 1);
    setAverage((good - bad) / (total + 1));
    setPositivePercentage(good / ((total + 1) / 100));
  }

  function neutralHandler(value) {
    setNeutral(value + 1);
    setTotal(total + 1);
    setPositivePercentage(good / ((total + 1) / 100));
  }

  function badHandler(value) {
    const bad = value + 1;
    setBad(bad);
    setTotal(total + 1);
    setAverage((good - bad) / (total + 1));
    setPositivePercentage(good / ((total + 1) / 100));
  }

  if (total > 0) {
    <></>;
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button name='good' func={() => goodHandler(good)}></Button>
      <Button name='neutral' func={() => neutralHandler(neutral)}></Button>
      <Button name='bad' func={() => badHandler(bad)}></Button>
      <h2>statistics</h2>
      {total > 0 ? (
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td>
                <StatisticLine text='good' value={good}></StatisticLine>
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text='neutral' value={neutral}></StatisticLine>
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text='bad' value={bad}></StatisticLine>
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text='all' value={total}></StatisticLine>
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text='average' value={average}></StatisticLine>
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine
                  text='positive'
                  value={positivePercentage + ' %'}
                ></StatisticLine>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <>No feedback given</>
      )}
    </>
  );
};

export default App;
