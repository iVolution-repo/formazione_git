/*
   Arrays and objects - Objects
   ----------------------------------------------------------
   An object can contain both properties and functions. An
   object property is just like a variable in that it is
   primitive. This means properties can be String, Number,
   Boolean, etc. Properties can also be objects, arrays or
   functions, which means objects can have sub-objects and
   functions to make it act as a class.
*/
// @ts-nocheck
const mycar = {
  colour: 'red',
  wheels: 4,
  engine: {
    cylinders: 4,
    size: 2.2
  },
  damages: ["damaged wheels", "smashed passenger window", "boot does not open"]
}
console.log(`Your car is ${mycar.colour}!`);
console.log(`Your car is ${mycar['colour']}!`);
console.log(`Engine size: ${mycar.engine.size}`);
console.log(`Engine size: ${mycar['engine'].size}`);
console.log(`Car issues :${mycar.damages.length}`);
console.log(`Car issues :${mycar['damages'].length}`);
for (let i = 0; i < mycar.damages.length; i++) {
  console.log(mycar.damages[i]);
  console.log(mycar['damages'][i]);
}
