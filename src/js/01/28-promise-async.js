/*
   Promises are Asynchronous
   ----------------------------------------------------------
*/
// @ts-nocheck

const isMomHappy = true;
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

const showOff = (phone) => {
  return new Promise((resolve, reject) => {
    const message = `Hey friend, I have a new ${phone.color} ${phone.brand} phone`;
    resolve(message);
  });
};

const askMom = () => {
  console.log('before asking Mom'); // log before
  willIGetNewPhone
    .then(showOff)
    .then((fulfilled) => {
      console.log(fulfilled);
    })
    .catch((error) => {
      console.log(error.message);
    });
  console.log('after asking mom'); // log after
}

askMom();

/*
   The actual output sequence is:

     before asking Mom
     after asking mom
     Hey friend, I have a new black Samsung phone.

   We call this asynchronous. The promise code will run without
   blocking or waiting for the result. Anything that needs to
   wait for promise to proceed, you put that in .then.
*/
