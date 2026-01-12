type Operation = 'multiply' | 'add' | 'divide';

const calculator = (a: number, b: number, printText: Operation): number => {
  switch (printText) {
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) {
        throw new Error(`Can't divide by 0!`);
      }

      return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add or divide');
  }
};

try {
  console.log(calculator(1, 2, 'multiply'));
  console.log(calculator(10, 20, 'add'));
  console.log(calculator(10, 2, 'divide'));
} catch (error: unknown) {
  let message = 'Something went wrong';

  if (error instanceof Error) {
    message += error.message;
  }

  console.log(message);
}
