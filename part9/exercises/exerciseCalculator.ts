interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export function getCalculations(hours: number[], target: number): Result {
  const average =
    hours.reduce((acc, cur) => {
      return acc + cur;
    }, 0) / hours.length;

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((h) => h > 0).length,
    success: average >= target,
    rating: average < 1 ? 1 : average < 2 ? 2 : 3,
    ratingDescription: getRatingDescription(average),
    target: target,
    average: average
  };
}

function getRatingDescription(rating: number): string {
  if (rating < 1) {
    return 'Bad';
  } else if (rating < 2) {
    return 'Not too bad but could be better';
  } else {
    return 'Nice job';
  }
}

try {
  console.log(
    getCalculations(
      process.argv.slice(3).map((n) => Number(n)),
      Number(process.argv[2])
    )
  );
} catch (error) {
  throw new Error(error.message);
}
