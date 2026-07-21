/*
   While statement
   ----------------------------------------------------------
   The while statement/loop loops through a block of code as
   long as a specified condition is true.

   In the following example, the condition is checked before
   the block of code is executed, each time.
*/
// @ts-nocheck
let i = 0;
while (i < 10) {
  console.log(`The number is ${i}`);
  i++;
}

/*
   Using the do keyword, the condition is checked after the
   block of code is execute, each time.
*/

let j = 0;
do {
  console.log(`The number is ${j}`);
  j++;
} while (j < 10);
