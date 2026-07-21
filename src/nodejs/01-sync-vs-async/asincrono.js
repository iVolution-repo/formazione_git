// Descrizione: approccio ad eventi (asincrono) - caratteristica principale di
// Node.js. La funzione ritorna subito e il risultato arriva tramite callback
// quando l'operazione (tipicamente I/O/networking) è completata.

function ottieniDatoDaRemoto(url, callback) {
  setTimeout(() => {
    callback(`dato ricevuto da ${url}`);
  }, 1000);
}

/** approccio ad eventi (asincrono) **/
ottieniDatoDaRemoto('https://esempio.it', function (dato) {
  console.log(dato);
}); // la funzione ritorna subito

console.log('Questo messaggio viene stampato prima del dato, perché la chiamata non è bloccante');
