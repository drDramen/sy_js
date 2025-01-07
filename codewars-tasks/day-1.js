/*
 * 8 kyu Fix your code before the garden dies!
 *
 * You have an award-winning garden and every day the plants need exactly 40mm of water.
 * You created a great piece of JavaScript to calculate the amount of water your plants
 * will need when you have taken into consideration the amount of rain water that is forecast for the day.
 * Your jealous neighbour hacked your computer and filled your code with bugs.
 *
 * Your task is to debug the code before your plants die!
 *
 * https://www.codewars.com/kata/57158fb92ad763bb180004e7
 * */

const DAILY_AMOUNT_OF_WATER = 40;

function rainAmount(mm) {
  if (mm < DAILY_AMOUNT_OF_WATER) {
    return `You need to give your plant ${DAILY_AMOUNT_OF_WATER - mm}mm of water`;
  }

  return 'Your plant has had more than enough water for today!';
}

/*
 * 8 kyu Enumerable Magic #2 - True for Any?
 *
 * The task is to write a function that accepts two parameters: an array and a callback function.
 * The function should return true if the callback function returns true for any item in the array.
 * The function should return false if the array is empty.
 *
 * https://www.codewars.com/kata/54598e89cbae2ac001001135
 * */

function any(arr, fun) {
  return arr.some(fun);
}

/*
 * 8 kyu Fix the Bugs (Syntax) - My First Kata
 *
 * In this Kata you should fix/create a program that returns the following values:
 * - false/False if either a or b (or both) are not numbers
 * - a % b plus b % a if both arguments are numbers
 *
 * You may assume the following: If a and b are both numbers, neither of a or b will be 0.
 *
 * https://codewars.com/kata/56aed32a154d33a1f3000018
 * */

function myFirstKata(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return false;
  }

  return (a % b) + (b % a);
}

/*
 * 8 kyu Collinearity
 *
 * You are given two vectors starting from the origin (x=0, y=0) with coordinates (x1,y1) and (x2,y2).
 * Your task is to find out if these vectors are collinear.
 * Collinear vectors are vectors that lie on the same straight line.
 * They can be directed in the same or opposite directions.
 * One vector can be obtained from another by multiplying it by a certain number.
 * In terms of coordinates, vectors (x1, y1) and (x2, y2) are collinear if (x1, y1) = (k*x2, k*y2),
 * where k is any number acting as a coefficient.
 *
 * Write the function collinearity(x1, y1, x2, y2),
 * which returns a Boolean type depending on whether the vectors are collinear or not.
 *
 * https://www.codewars.com/kata/65ba420888906c1f86e1e680
 * */

function collinearity(x1, y1, x2, y2) {
  return x1 * y2 === y1 * x2;
}
