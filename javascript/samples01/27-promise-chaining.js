/*
   Chaining Promises
   ----------------------------------------------------------
   Promises are chainable - processing event after event. Let's
   say, you, the child, promise your friend that you will show
   them the new phone when your mom has bought you one.
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

const showOff = (phone) => {
  return new Promise((resolve, reject) => {
    const message = `Hey friend, I have a new ${phone.color} ${phone.brand} phone`;
    resolve(message);
  });
};

/*
   In that example, you might realize we didn't call the
   reject. It's optional. We can shorten this sample like using
   Promise.resolve instead, if the reject is not required.
*/

const showOffShort = (phone) => {
  const message = `Hey friend, I have a new ${phone.color} ${phone.brand} phone`;
  return Promise.resolve(message);
};

/*
   You can only start the showOff promise after the
   willIGetNewPhone promise.
*/

const askMom = () => {
  willIGetNewPhone
    .then(showOff) // chain it here
    .then((fulfilled) => {
      console.log(fulfilled);
      // output: 'Hey friend, I have a new black Samsung phone.'
    })
    .catch((error) => {
      // oops, mom don't buy it
      console.log(error.message); // output: 'mom is not happy'
    });
};

askMom();
