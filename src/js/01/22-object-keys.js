/*
   Built-in functions - Object keys
   ----------------------------------------------------------
   Since you can create and assign properties dynamicly, it is
   useful to get a list of keys so you are able to loop through
   them.

   For example, let's setup an object with a set of
   non-hardcoded properties.
*/
// @ts-nocheck
const myobj = {}; //Empty object
let key; //Used for the property key
for (let i = 0; i < 10; i++) {
  key = `key${i}`;
  myobj[key] = `value ${i}`;
}

/*
   Now, we are able to get a list of object keys using
   Object.keys:
*/

const keys = Object.keys(myobj);
console.log(keys);
//Array ["key0", "key1", "key2", "key3", "key4", "key5", "key6", "key7", "key8", "key9"]

/*
   With a list of keys, we can dynamically loop through the
   object.
*/

for (let i = 0; i < keys.length; i++)
  console.log(myobj[keys[i]]);
