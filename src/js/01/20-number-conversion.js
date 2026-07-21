/*
   Built-in functions - Type converting
   ----------------------------------------------------------
   JavaScript has lots of useful functions to make the
   development experience easy.

   If you have a number which should be a string, or
   vice-versa, there are functions which can convert them.

     Number(string)
     String(number)

   In the following example, we can take a String (in which the
   value is numeric) and convert it data-type to Number using
   the Number function.
*/
// @ts-nocheck
let number = "500";
console.log(`${typeof number} ${number}`);
number = Number(number);
console.log(`${typeof number} ${number}`);
