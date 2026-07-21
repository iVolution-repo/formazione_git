// Descrizione: le funzioni JavaScript sono oggetti di prima classe e possono
// essere passate come parametri di un'altra funzione (funzione di callback).
// calcola() prevede tre argomenti: il primo è la funzione di callback
// invocata sul secondo e terzo argomento; il valore restituito da calcola()
// è il valore restituito dall'applicazione della callback sugli altri due.

function calcola(func, arg1, arg2) {
  // istruzione 1
  return func(arg1, arg2);
}

const somma = (a, b) => a + b;

console.log(calcola(somma, 2, 3)); // 5
