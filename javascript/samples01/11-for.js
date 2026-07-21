/*
   For statement
   ----------------------------------------------------------
   The for statement/loop can be used to loop through a range
   of numbers. It is commonly used to loop through elements in
   an array.

   statement 1 is executed before the the block is executed.
   statement 2 defines the condition for running the block.
   statement 3 is executed each time after the block has been
   executed.
// @ts-nocheck
   for (statement 1; statement 2; statement 3) {
     code block to be executed
   }

   Esempio:
*/

for (let x = 0; x < 10; x++) {
  console.log(`The number is ${x}`);
}
