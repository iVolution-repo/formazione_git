/*
   Primitive variables - Number
   ----------------------------------------------------------
   A number is JavaScript is stored as a Double. There is no
   way to store a number as Integer, but the Number type can
   handle numerics as if they were integers.
*/
// @ts-nocheck
let x = 5;
x += 5;
let y = 5.5;
y += 5;

/*
   More on integers:

   To check for the largest available value or smallest
   available value within +/-Infinity, you can use the
   constants Number.MAX_VALUE or Number.MIN_VALUE and starting
   with ECMAScript 6, you are also able to check if a number is
   in the double-precision floating-point number range using
   Number.isSafeInteger() as well as Number.MAX_SAFE_INTEGER
   and Number.MIN_SAFE_INTEGER. Beyond this range, integers in
   JavaScript are not safe anymore and will be a
   double-precision floating point approximation of the value.
*/
