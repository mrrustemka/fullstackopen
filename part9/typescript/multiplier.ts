interface MultiplyValues {
  val1: number;
  val2: number;
}

const parseArgs = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      val1: Number(args[2]),
      val2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

try {
  const { val1, val2 } = parseArgs(process.argv);
  multiplicator(val1, val2, `Multiplied ${val1} and ${val2}, the result is:`);
} catch (error: unknown) {
  let message = 'Something bad happend.';

  if (error instanceof Error) {
    message += ' Error: ' + error.message;
  }

  console.log(message);
}
