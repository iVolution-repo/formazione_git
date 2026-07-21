/*
   Switch statement
   ----------------------------------------------------------
   A switch statement can be used to compare multiple values
   against a single value, as well as a fallback if none of the
   conditions are met (default keyword). If a condition is met,
   then the conditions block of code will be execute and no
   more comparisons will be made.
*/
// @ts-nocheck
const mynum = Math.floor((Math.random() * 10) + 1); //Random number between 1-10
switch (mynum) {
  case 1:
    console.log("The number is 1!!");
    break;
  case 5:
    console.log("The number is 5, hooray!");
    break;
  case 10:
    console.log("The number is 10.");
    break;
  default:
    console.log(`Default hit. Number is ${mynum}`);
    break;
}
