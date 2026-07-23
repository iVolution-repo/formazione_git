// Descrizione: consumo del modulo custom simplemath.js tramite require con
// percorso relativo. sm.private(...) genererà un errore perché la funzione
// "private" non è stata esportata dal modulo.

var sm = require('./simplemath.js');

console.log(sm.sum(1, 2)); // echo 3
console.log(sm.product(1, 2)); // echo 2
console.log(sm.privata(1, 2)); // error!
