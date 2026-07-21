/*
   Operators and comparisons - Logical / lax vs strict comparison
   ----------------------------------------------------------
   When making comparisons, it's useful to be able to check two
   conditions at once. That is what logical operators are used
   for.

     && - and: (number > 0 && number < 10)
     || - or: (mybool == false || otherbool == false)
     !  - not/negate: var mybool = false; mybool = !mybool;

   Lax comparison
   ----------------------------------------------------------
   When using == and != you must remember that there is no
   data-type checked involved. You could have a String value of
   "5" and a Number of 5 and they would be equal when using ==.

   Using === and !== provides some strict comparisons. Not only
   will the values have to equal, but so will their types.
*/
// @ts-nocheck
const x = 5;
const y = "5";
console.log(x == y); // prints: true
console.log(x === y); //prints: false
