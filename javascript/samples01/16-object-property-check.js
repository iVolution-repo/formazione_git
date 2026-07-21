/*
   Objects - checking whether a property exists
   ----------------------------------------------------------
   When using objects, can use the undefined keyword to
   determine whether a property exists. For example:
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

console.log(mycar.damages !== undefined) //true
console.log(mycar['damages'] !== undefined) //true
console.log(mycar.brand !== undefined) //false
console.log(mycar.brand === undefined) //true
console.log(mycar['brand'] === undefined) //true
