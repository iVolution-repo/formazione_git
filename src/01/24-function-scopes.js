/*
   Function scopes
   ----------------------------------------------------------
   It is possible to define functions within other functions.
   They can be defined anywhere within a script. It is usually
   good practice to define a function at the bottom of the
   parent function (or script for global functions).

   Functions can only be called from their parents.
   Inner-functions can call parent or global functions as
   normal.

   The following example is valid scoping:
*/

console.log(myFuncA());
function myFuncA() { //Global function
  return myFuncB();
  function myFuncB() { //Inner-function
    return "Hello world!";
  }
}

/*
   The following example is NOT valid, because myFuncB is an
   inner-function of myFuncA and cannot be called from outside:

     console.log(myFuncA.myFuncB());
     function myFuncA() { //Global function
       return myFuncB();
       function myFuncB() { //Inner-function
         return "Hello world!";
       }
     }

   The following example of an inner-function calling a global
   function is also valid:
*/
// @ts-nocheck
console.log(myFuncC());
function myFuncC() { //Global function
  return myFuncD();
  function myFuncD() { //Inner-function
    return myFuncE(); //Calling a global function from an inner function
  }
}
function myFuncE() { //Global function
  return "Hello world!";
}
