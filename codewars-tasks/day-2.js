/*
 * 8 kyu Quarter of the year
 *
 * Given a month as an integer from 1 to 12,
 * return to which quarter of the year it belongs as an integer number.
 * For example:
 * month 2 (February), is part of the first quarter;
 * month 6 (June), is part of the second quarter;
 * and month 11 (November), is part of the fourth quarter.
 *
 * Constraint:
 *   - 1 <= month <= 12
 *
 * https://www.codewars.com/kata/quarter-of-the-year
 * */

const MONTH_IN_QUARTER = 3;

const quarterOf = (month) => {
  return Math.ceil(month / MONTH_IN_QUARTER);
};

/*
 * 8 kyu Capitalization and Mutability
 *
 * Your coworker was supposed to write a simple helper function to capitalize a string
 * (that contains a single word) before they went on vacation.
 *
 * Unfortunately, they have now left and the code they gave you doesn't work.
 * Fix the helper function they wrote so that it works as intended
 * (i.e. it must make the first character in the string upper case).
 *
 * The string will always start with a letter and will never be empty.
 *
 * Examples:
 * "hello" --> "Hello"
 * "Hello" --> "Hello" (the first letter was already capitalized)
 * "a"     --> "A"
 *
 * https://www.codewars.com/kata/capitalization-and-mutability
 * */

function capitalizeWord(word) {
  return word[0].toUpperCase() + word.slice(1);
}

/*
 * 8 kyu Century From Year
 *
 * The first century spans from the year 1 up to and including the year 100,
 * the second century - from the year 101 up to and including the year 200, etc.
 *
 * Task
 * Given a year, return the century it is in.
 *
 * Examples
 *   1705 --> 18
 *   1900 --> 19
 *   1601 --> 17
 *   2000 --> 20
 *   2742 --> 28
 *
 * https://www.codewars.com/kata/century-from-year
 * */

const YEARS_IN_CENTURY = 100;

function century(year) {
  return Math.ceil(year / YEARS_IN_CENTURY);
}

/*
 * 8 kyu Convert a Number to a String!
 *
 * We need a function that can transform a number (integer) into a string.
 * What ways of achieving this do you know?
 *
 * Examples (input --> output):
 *   123  --> "123"
 *   999  --> "999"
 *   -100 --> "-100"
 *
 * https://www.codewars.com/kata/convert-a-number-to-a-string
 * */

function numberToString(num) {
  return String(num);
}

/*
 * 8 kyu Convert a String to a Number!
 *
 * We need a function that can transform a string into a number. What ways of achieving this do you know?
 * Note: Don't worry, all inputs will be strings, and every string is a perfectly
 * valid representation of an integral number.
 *
 * Examples (input --> output):
 *   "1234" --> 1234
 *   "605"  --> 605
 *   "1405" --> 1405
 *   "-7" --> -7
 *
 * https://www.codewars.com/kata/convert-a-string-to-a-number
 * */

const stringToNumber = function (str) {
  return +str;
};

/*
 * 8 kyu Convert to Binary
 *
 * Given a non-negative integer b, write a function
 * which returns an integer d such that the binary
 * representation of b is the same as the decimal representation of d.
 *
 * Examples (input --> output):
 *   n = 1 should return 1
 *   n = 5 should return 101
 *   n = 11 should return 1011
 *
 * https://www.codewars.com/kata/convert-a-string-to-a-number
 * */

const radixBinary = 2;

function toBinary(n) {
  return +n.toString(radixBinary);
}

/*
 * 8 kyu Even or Odd
 *
 * Create a function that takes an integer as an argument
 * and returns "Even" for even numbers or "Odd" for odd numbers.
 *
 * https://www.codewars.com/kata/even-or-odd
 * */

function evenOrOdd(number) {
  return number % 2 ? 'Odd' : 'Even';
}

/*
 * 8 kyu Fake Binary
 *
 * Given a string of digits, you should replace any digit below 5 with '0'
 * and any digit 5 and above with '1'. Return the resulting string.
 *
 * Note: input will never be an empty string
 *
 * https://www.codewars.com/kata/fake-binary
 * */

function fakeBin(x) {
  return x.replace(/(\d)/g, (match) => Number(match >= 5));
}

/*
 * 7 kyu Largest Square Inside A Circle
 *
 * Determine the area of the largest square that can fit inside a circle with radius r.
 *
 * https://www.codewars.com/kata/largest-square-inside-a-circle
 * */

function areaLargestSquare(r) {
  return Math.pow(r, 2) * 2;
}

/*
 * 7 kyu Number of Decimal Digits
 *
 * Determine the total number of digits in the integer (n>=0) given as input to the function.
 * For example, 9 is a single digit, 66 has 2 digits and 128685 has 6 digits.
 * Be careful to avoid overflows/underflows.
 *
 * All inputs will be valid.
 *
 * https://www.codewars.com/kata/number-of-decimal-digits
 * */

function digits(n) {
  return String(n).length;
}

/*
 * 8 kyu Opposite number
 *
 * Very simple, given a number (integer / decimal / both depending on the language),
 * find its opposite (additive inverse).
 *
 * Examples:
 *   1: -1
 *   14: -14
 *   -34: 34
 *
 * https://www.codewars.com/kata/opposite-number
 * */

function opposite(number) {
  return -number;
}

/*
 * 7 kyu Perimeter sequence
 *
 * The first three stages of a sequence are shown.
 * https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVw-YEuGbD31EB47C7PSi_RpBxr5EJSydV9dj5lOmzsDWFsoAs
 *
 * The blocksize is a by a and a ≥ 1.
 * What is the perimeter of the nth shape in the sequence (n ≥ 1) ?
 *
 * https://www.codewars.com/kata/perimeter-sequence
 * */

function perimeterSequence(a, n) {
  return a * n * 4;
}

/*
 * 7 kyu Absent vowel
 *
 * Your job is to figure out the index of which vowel is missing from a given string:
 *   A has an index of 0,
 *   E has an index of 1,
 *   I has an index of 2,
 *   O has an index of 3,
 *   U has an index of 4.
 *
 * Notes: There is no need for string validation and every sentence given will
 * contain all vowels but one. Also, you won't need to worry about capitals.
 *
 * Examples
 *  "John Doe hs seven red pples under his bsket"          =>  0  ; missing: "a"
 *  "Bb Smith sent us six neatly arranged range bicycles"  =>  3  ; missing: "o"
 *
 * https://www.codewars.com/kata/absent-vowel
 * */

function absentVowel(x) {
  const vowels = 'aeiou';

  for (let index = 0; index < vowels.length; index++) {
    const vowel = vowels[index];

    if (!x.includes(vowel)) {
      return index;
    }
  }
}

/*
 * 7 kyu Get the Middle Character
 *
 * You are going to be given a non-empty string.
 * Your job is to return the middle character(s) of the string.
 *   If the string's length is odd, return the middle character.
 *   If the string's length is even, return the middle 2 characters.
 *
 * Examples
 *  "test" --> "es"
 *  "testing" --> "t"
 *  "middle" --> "dd"
 *  "A" --> "A"
 *
 * https://www.codewars.com/kata/get-the-middle-character
 * */

function getMiddle(s) {
  const isOdd = Boolean(s.length % 2);
  const index = Math.floor(s.length / 2) - Number(!isOdd);

  return isOdd ? s[index] : s.slice(index, index + 2);
}
