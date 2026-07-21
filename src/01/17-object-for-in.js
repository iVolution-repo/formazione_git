/*
   Objects - for...in
   ----------------------------------------------------------
   Using the in keyword within a for statement/loop, you can
   loop through the properties in an object by their key. In
   the following example, the loop will interate through the
   keys and put them into the key variable within the block.
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

for (const key in mycar) {
  console.log(`key: ${key}`);
  console.log(mycar[key]);
}
