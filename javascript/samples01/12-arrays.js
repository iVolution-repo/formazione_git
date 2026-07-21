/*
   Arrays and objects - Arrays
   ----------------------------------------------------------
   JavaScript has arrays and objects. An array is a list of
   elements, which can be any data-type, including a subarray
   (multi-dimensional) or an object.

   In JavaScript, arrays are not fixed length and they are not
   strict to one type. Each array has methods attached to it,
   which can allows for items to be added, removed, etc. Arrays
   are also 0-index based, meaning the first element has an
   index of 0.
*/
// @ts-nocheck
//Creating an array
let myarray = [1, "2", 3, "4"];
let names = ["Alex", "Scott", "Tricia", "David", "Emily"];
//Getting the length
console.log(myarray.length);
console.log(names.length);
//References specific elements
console.log(myarray[3]); //4
console.log(names[3]); //David
//Assign to specific element
myarray[3] = 5;
names[3] = "Jordan";
