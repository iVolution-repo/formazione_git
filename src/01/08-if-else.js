/*
   if, else - If statement
   ----------------------------------------------------------
   JavaScript has ways to make code execute under certain
   conditions. To achieve this, you can use statements such as
   if, switch and for.

   With an if statement, you can execute a block of code if a
   certain condition is met: if (condition) {block}.
*/
// @ts-nocheck
const mynum = 1 + 2;
if (mynum === 3) {
  console.log(`Value is ${mynum}`);
}

/*
   You can also optionally use the else statement to have a
   block of code execute if the condition is not met.
*/

if (mynum === 3) {
  console.log(`Value is ${mynum}`);
} else {
  console.log("That's not correct!");
}

/*
   On top of that, there is also else if. This should be used
   if you'd like to check against another condition if the
   last condition was not met.
*/

const value = 4;
if (mynum === 3) {
  console.log(`Value is ${mynum}`);
} else if (value === 4) {
  console.log("The value is 4!");
} else {
  console.log("That's not correct!");
}
