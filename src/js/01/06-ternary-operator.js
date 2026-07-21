/*
   Operators and comparisons - Ternary operator
   ----------------------------------------------------------
   JavaScript, like other languages, is made up of lots of
   different operators.

     =  - used for assigning values to variables.
     +  - used for Number addition or String concatination.
     -  - used for Number subtraction
     *  - used for Number multiplication
     /  - used for Number division
     %  - used for Number modulus.
     ++ - used for Number incrementing (by 1)
     -- - used for Number decrementing (by 1)

   There are also short-hand operators: +=, -=, etc.

   Comparisons:
     == - equal to
     === - equal values and same value types (explained later)
     != - not equal
     !== - values not equal OR value types not equal
     >  - greater than
     <  - less than
     >= - equal or great than
     <= - equal or less than

   There is also the ternary operator, which allows for
   short-hand comparison. The following example will print
   false because value is not equal to "goodbyeworld".
*/
// @ts-nocheck
const value = "helloworld";
const result = (value === "goodbyeworld" ? true : false);
console.log(result);
//prints: false
