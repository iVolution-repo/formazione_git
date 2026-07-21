// Descrizione: esercizio proposto nel documento - usare il pacchetto npm
// "upper-case" per convertire "Hello World" in maiuscolo.

const { upperCase } = require('upper-case');

const testo = 'Hello world';
console.log(testo);
console.log(upperCase(testo));
