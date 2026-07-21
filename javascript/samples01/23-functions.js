/*
   Functions
   ----------------------------------------------------------
   Functions in JavaScript are very volitile. They can be used
   in many different way and they can also be defined in many
   different ways, as we saw in Arrays and Objects.

   A function is defined with the function keyword, followed by
   a name and parameter list.

     function name(a, b, c) {...}

   You can pass in any data-type in parameters and you can also
   return any data-type from a function - be it a String,
   Number, Array or Object.
*/
// @ts-nocheck
let myobj, otherobj;
myobj = GetObject();
otherobj = GetObject();
function GetObject() {
  return { a: 100, b: "hello" };
}
const person = { name: "David", address: "david@website.com" };
console.log(GetNameFromObj(person));
function GetNameFromObj(obj) {
  if (obj.name !== undefined)
    return obj.name;
  else
    return "No name!";
}
