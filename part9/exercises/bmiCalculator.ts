interface Data {
  height: number;
  weight: number;
}

function getBmi(height: number, weight: number): string {
  const result = (weight / height ** 2) * 10000;

  if (result < 16) {
    return 'Underweight (Severe thinness)';
  } else if (result < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (result < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (result < 25) {
    return 'Normal range';
  } else if (result < 30) {
    return 'Overweight (Pre-obese)';
  } else if (result < 35) {
    return 'Obese (Class I)';
  } else if (result < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
}

try {
  console.log(getBmi(180, 74));
} catch (e) {
  throw new Error(e.message);
}
