/*
   Consuming a Promise
   ----------------------------------------------------------
   Now that we have the promise, let's consume it:
*/
// @ts-nocheck
const isMomHappy = false;
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

const askMom = () => {
  willIGetNewPhone
    .then((fulfilled) => {
      // yay, you got a new phone
      console.log(fulfilled); // output: { brand: 'Samsung', color: 'black' }
    })
    .catch((error) => {
      // oops, mom don't buy it
      console.log(error.message); // output: 'mom is not happy'
    });
};
askMom();

/*
   We have a function call askMom. In this function, we will
   consume our promise willIGetNewPhone.

   We want to take some action once the promise is resolved or
   rejected, we use .then and .catch to handle our action.

   In our example, we have function(fulfilled) { ... } in
   .then. What is the value of fulfilled? The fulfilled value
   is exactly the value you pass in your promise
   resolve(your_success_value). Therefore, it will be phone in
   our case.

   We have function(error){ ... } in .catch. What is the value
   of error? As you can guess, the error value is exactly the
   value you pass in your promise reject(your_fail_value).
   Therefore, it will be reason in our case.

   Running the code with isMomHappy as false will result with
   this output:

     mom is not happy

   If isMomHappy was true, you'd get the phone object:

     [object Object] {
       brand: "Samsung",
       color: "black"
     }
*/
