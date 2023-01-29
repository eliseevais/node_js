var colors = require('colors/safe');
console.log(colors.rainbow("Hello, World!"));

let number1 = Number(process.argv[2]);
let number2 = Number(process.argv[3]);

function coloredNumbers(number1, number2) {
  let numbers = [];

  for (let i = number1; i <= number2; i++) {
    for (let a = 2; a <= i; a++) {
      if (i % a === 0 && a < i) {
        break;
      } else if (a === i) {
        numbers = [...numbers, i];
      }
    }
  }

  let newNumbers = numbers.forEach((number, i) => {
    switch (i % 3) {
      case 0:
        console.log(colors.red(number));
        break;
      case 1:
        console.log(colors.yellow(number));
        break;
      default:
        console.log(colors.green(number))
    }
    return number;
  })

  if (typeof number1 !== 'number' || isNaN(number1) ||
    typeof number2 !== 'number' || isNaN(number2)) {
    console.log(colors.red('Error. The range must contain only numbers.'));
  } else if (numbers.length === 0) {
    console.log(colors.red('Try again. Specify a different range.'))
  } else console.log(newNumbers)
}

coloredNumbers(number1, number2);

