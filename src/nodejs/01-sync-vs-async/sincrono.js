// Descrizione: approccio sincrono (classico) - la funzione bloccante ritorna
// il dato solo dopo che la richiesta remota è completata.

function ottieniDatoDaRemoto(url) {
  // simulazione di un'operazione lenta e bloccante
  return `dato ricevuto da ${url}`;
}

/** approccio sincrono (classico) **/
var dato = ottieniDatoDaRemoto('https://esempio.it');
console.log(dato);
