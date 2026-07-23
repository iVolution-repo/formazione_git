// Descrizione: un modulo non è nient'altro che un file (o un insieme di file)
// che definisce una serie di funzioni JavaScript e che le espone attraverso
// un oggetto exports globale. Assegnare proprietà o metodi di questo oggetto
// significa rendere la funzionalità disponibile da applicazioni esterne.

function sum(a, b) {
  // definiamo la funzione sum
  return a + b;
};

function product(a, b) {
  privata();
  // definiamo la funzione product
  return a * b;
};

function privata(a, b) {
  return 'Io sono private!!';
};

exports.sum = sum; // esportiamo la funzione sum
exports.product = product; // esportiamo la funzione product
// "privata" non viene esportata: non sarà accessibile dall'esterno
