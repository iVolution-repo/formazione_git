/*
   Promises & asynchronous functions
   ----------------------------------------------------------
   Promises tutorial linked from:
   https://scotch.io/tutorials/javascript-promises-for-dummies

   Javascript Promises are not difficult. However, lots of
   people find it hard to understand at the beginning.

   A Promise in short:

   Imagine you are a child. Your mom promises you that she'll
   get you a new phone next week. You don't know if you will
   get that phone until next week. Your mom can either buy you
   a brand new phone, or stand you up and withhold the phone if
   she is not happy.

   That is a promise. A promise has 3 states. They are:
     - Promise is pending: You don't know if you will get that
       phone until next week.
     - Promise is resolved: Your mom really buy you a brand new
       phone.
     - Promise is rejected: You don't get a new phone because
       your mom is not happy.

   Creating a Promise
   ----------------------------------------------------------
   The JavaScript notation of the rules previously described
   would be:
*/
// @ts-nocheck
const isMomHappy = false;
// Promise
const willIGetNewPhone = new Promise(
  (resolve, reject) => {
    if (isMomHappy) {
      const phone = {
        brand: 'Samsung',
        color: 'black'
      };
      resolve(phone); // fulfilled
    } else {
      const reason = new Error('mom is not happy'); reject(reason); // reject
    }
  }
);

/*
   The code is quite expressive in itself.

   We have a boolean isMomHappy, to define if mom is happy.

   We have a promise willIGetNewPhone. The promise can be
   either resolved (if mom get you a new phone) or rejected
   (mom is not happy, she doesn't buy you one).

   There is a standard syntax to define a new Promise, refer to
   MDN documentation, a promise syntax look like this:
   new Promise( executor: function (resolve, reject) { ... } );

   What you need to remember is, when the result is successful,
   call resolve(your_success_value), if the result fails, call
   reject(your_fail_value) in your promise. In our example, if
   mom is happy, we will get a phone. Therefore, we call resolve
   function with phone variable. If mom is not happy, we will
   call reject function with a reason reject(reason);
*/
