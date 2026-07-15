// let num1 = Number(prompt("Enter first number:"));
// let operator = prompt("Enter operator:");
// let num2 = Number(prompt("Enter second number:"));

// switch (operator) {
//     case "+":
//         alert('YOU RESULT IS ' + (num1 + num2));
//         break;
//     case "-":
//         alert('YOU RESULT IS ' + (num1 - num2));
//         break;
//     case "*":
//         alert('YOU RESULT IS ' + (num1 * num2));
//         break;
//     case "/":
//         alert('YOU RESULT IS ' + (num1 / num2));
//         break;
//     default:
//         alert("Invalid operator");
// }

// ------- Weirdness of JavaScript ------- //
console.log(5 + '3'); // Concatenation
console.log('5' - 3); // Subtraction
console.log(5 * '3'); // Multiplication
console.log(5 / '3'); // Division

let a = 5

//  ------- Post Increment and Pre Increment ------- //
// console.log(a++);
// console.log(++a);
// console.log(a);

//  ------- Post Decrement and Pre Decrement ------- //
// console.log(a--);
// console.log(--a);
// console.log(a)


// ----------- For Loop ------------- //
// for (let i = 0; i <= 10; i++) {
//     console.log(i);
// }

// ----------- While Loop ------------- //
// let i = 0;
// while (i < 10) {
//     console.log(i);
//     i++;
// }

const totalRows = 5; // Height of the pyramid

// Outer loop: Handles the number of rows
// debugger
for (let i = 1; i <= totalRows; i++) {
  let rowStr = "";

  // Inner loop 1: Adds leading spaces to center the stars
  for (let space = 1; space <= totalRows - i; space++) {
    // console.log("space", space);
    rowStr += " ";
    // console.log("rowStr", rowStr);
  }

  // Inner loop 2: Adds the stars for the current row
  for (let star = 1; star <= 2 * i - 1; star++) {
    // console.log("star", star);
    rowStr += "*";
    // console.log("rowStr", rowStr);
  }

  // Prints the completed row to the console
  console.log(rowStr);
}