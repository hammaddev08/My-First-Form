// Simple JavaScript functions to demonstrate basic operations
function addNumbers(num1, num2) {
    return num1 + num2;
}

const sum = addNumbers(5, 3);
console.log('The sum is: ' + sum);

// Arrow function to subtract two numbers
const subtractNumbers = (num1, num2) => {
    return num1 - num2;
}

const difference = subtractNumbers(10, 4);
console.log('The difference is: ' + difference);

// Arrow function to multiply two numbers
const multiplyNumbers = (num1, num2) => num1 * num2;

const product = multiplyNumbers(6, 7);
console.log('The product is: ' + product);