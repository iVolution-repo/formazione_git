/*
   Arrays - looping through elements
   ----------------------------------------------------------
   Below is an example of looping through each element in an
   array.

   It is good practice to store all elements of an array as the
   same type, e.g. all elements being a Number, String or
   Object, for example.
*/
// @ts-nocheck
let names = ["Alex", "Scott", "Tricia", "David", "Emily"];

for (let x = 0; x < names.length; x++) {
  console.log(names[x]);
  if (names[x] === "Tricia") {
    console.log("It's Tricia!!");
  }
}
