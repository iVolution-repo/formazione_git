// Descrizione: il modulo url permette di lavorare con gli url, creandoli a
// partire da oggetti oppure parsandoli a partire da stringhe.
// In Node.js 22 l'approccio consigliato è la classe globale URL (WHATWG URL
// API), che sostituisce il vecchio metodo url.parse, ormai legacy.

var url = require('url');
console.log(url.parse('https://www.ivolution.it/'));
console.log(url.format({ host: 'www.ivolution.it', protocol: 'http' }));

// Approccio consigliato in Node.js 22 (WHATWG URL API)
const u = new URL('https://www.ivolution.it/');
console.log(u.href, u.host, u.protocol);
