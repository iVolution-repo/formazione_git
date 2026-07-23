/*
   Built-in functions - Parsing numerics
   ----------------------------------------------------------
   You can use the parseInt to determine whether a string is
   numeric. parseInt can either return NaN or Number. We can
   conbine parseInt with isNaN to check whether it returns NaN
   or not. As an alternative, you may also using parseFloat.
*/
// @ts-nocheck
const values = ["500", "", "hello", "25"];
for (let i = 0; i < values.length; i++) {
  if (!isNaN(parseInt(values[i], 10)))
    console.log(`${values[i]} is a valid number!`);
  else
    console.log(`${values[i]} is not a valid number!`);
}
