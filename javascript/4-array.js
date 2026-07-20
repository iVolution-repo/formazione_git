/**
 * array-esempi.js
 * ------------------------------------------------------------------
 * Raccolta di esempi pratici sulla gestione degli array in JavaScript/Node.js
 * con le relative best practices commentate.
 *
 * Eseguibile con: node 4-array.js
 * ------------------------------------------------------------------
 */

// Attiva la modalità strict: evita errori silenziosi (es. variabili
// globali create per errore), vieta costrutti ambigui e rende il
// comportamento del motore JS più prevedibile durante gli esempi.
'use strict';

// ==================================================================
// 1. CREAZIONE DI ARRAY
// ==================================================================
function esempioCreazione() {
  const a = [1, 2, 3];
  const b = new Array(3).fill(0); // [0, 0, 0]
  const c = Array.from({ length: 5 }, (_, i) => i * 2); // [0, 2, 4, 6, 8]
  const d = Array.of(7); // [7]  (diverso da new Array(7), che crea 7 slot vuoti)

  console.log('[creazione]', a, b, c, d);
}

// ==================================================================
// 2. AGGIUNTA E RIMOZIONE DI ELEMENTI
//    push/pop lavorano in fondo (veloci), shift/unshift all'inizio (lenti
//    su array grandi perché riallineano tutti gli indici).
// ==================================================================
function esempioAggiungiRimuovi() {
  const frutta = ['mela', 'pera'];

  frutta.push('banana');       // aggiunge in fondo -> ['mela','pera','banana']
  frutta.unshift('kiwi');      // aggiunge in testa -> ['kiwi','mela','pera','banana']

  const ultimo = frutta.pop();     // rimuove e restituisce l'ultimo -> 'banana'
  const primo = frutta.shift();    // rimuove e restituisce il primo -> 'kiwi'

  console.log('[push/pop/shift/unshift]', frutta, { ultimo, primo });

  // splice: rimuove/inserisce in un punto qualsiasi (muta l'array originale)
  const numeri = [1, 2, 3, 4, 5];
  const rimossi = numeri.splice(1, 2, 'a', 'b'); // rimuove 2 elementi da indice 1, inserisce 'a','b'
  console.log('[splice]', numeri, 'rimossi:', rimossi);
}

// ==================================================================
// 3. ITERAZIONE: forEach vs for...of
//    forEach non supporta break/continue e ignora await -> per logica
//    asincrona seriale usa for...of.
// ==================================================================
function esempioIterazione() {
  const numeri = [10, 20, 30];

  numeri.forEach((n, i) => console.log(`[forEach] indice ${i}: ${n}`));

  for (const n of numeri) {
    if (n === 20) continue; // possibile con for...of, non con forEach
    console.log('[for...of]', n);
  }
}

// ==================================================================
// 4. TRASFORMAZIONE: map, filter, reduce
//    Sono immutabili (non modificano l'array originale) e componibili.
// ==================================================================
function esempioMapFilterReduce() {
  const numeri = [1, 2, 3, 4, 5, 6];

  const doppi = numeri.map((n) => n * 2);
  const pari = numeri.filter((n) => n % 2 === 0);
  const somma = numeri.reduce((acc, n) => acc + n, 0);

  console.log('[map]', doppi);
  console.log('[filter]', pari);
  console.log('[reduce] somma:', somma);

  // Concatenazione: pipeline leggibile invece di loop annidati
  const risultato = numeri
    .filter((n) => n % 2 === 0)
    .map((n) => n * n)
    .reduce((acc, n) => acc + n, 0);
  console.log('[pipeline] somma dei quadrati dei pari:', risultato);
}

// ==================================================================
// 5. RICERCA: find, findIndex, includes, some, every
// ==================================================================
function esempioRicerca() {
  const utenti = [
    { id: 1, nome: 'Anna' },
    { id: 2, nome: 'Marco' },
    { id: 3, nome: 'Luca' },
  ];

  const found = utenti.filter((u) => u.id === 2)
  const trovato = utenti.find((u) => u.id === 2);
  const indice = utenti.findIndex((u) => u.nome === 'Luca');
  const esiste = [1, 2, 3].includes(2);
  const tuttiMaggiorenni = [18, 20, 25].every((eta) => eta >= 18);
  const almenoUnoNegativo = [1, -2, 3].some((n) => n < 0);

  console.log('[find]', trovato);
  console.log('[filter]', found);
  console.log('[findIndex]', indice);
  console.log('[includes]', esiste);
  console.log('[every]', tuttiMaggiorenni);
  console.log('[some]', almenoUnoNegativo);
}

// ==================================================================
// 6. ORDINAMENTO
//    sort() muta l'array originale e di default ordina come STRINGHE.
//    Per numeri serve sempre un comparatore esplicito.
// ==================================================================
function esempioOrdinamento() {
  const numeri = [10, 1, 21, 2];

  console.log('[sort senza comparatore]', [...numeri].sort()); // [1, 10, 2, 21] <- sbagliato!
  console.log('[sort numerico crescente]', [...numeri].sort((a, b) => a - b));
  console.log('[sort numerico decrescente]', [...numeri].sort((a, b) => b - a));

  const persone = [{ nome: 'Bea', eta: 30 }, { nome: 'Aldo', eta: 25 }];
  console.log(
    '[sort per campo]',
    [...persone].sort((a, b) => a.eta - b.eta)
  );
}

// ==================================================================
// 7. COPIA E IMMUTABILITÀ
//    L'assegnazione copia solo il riferimento: modifica la spread copy,
//    non l'originale.
// ==================================================================
function esempioCopiaImmutabilita() {
  const originale = [1, 2, 3];

  const copiaShallow = [...originale];       // spread
  const copiaShallow2 = originale.slice();   // slice senza argomenti
  const copiaShallow3 = Array.from(originale);

  copiaShallow.push(4);
  console.log('[copia] originale invariato:', originale, 'copia:', copiaShallow);

  // ATTENZIONE: la copia è "shallow" -> gli oggetti annidati sono condivisi
  const nested = [{ x: 1 }];
  const copiaNested = [...nested];
  copiaNested[0].x = 99;
  console.log('[shallow copy] anche l\'originale cambia:', nested);
}

// ==================================================================
// 8. DESTRUCTURING E SPREAD
// ==================================================================
function esempioDestructuringSpread() {
  const [primo, secondo, ...resto] = [1, 2, 3, 4, 5];
  console.log('[destructuring]', { primo, secondo, resto });

  const a = [1, 2];
  const b = [3, 4];
  const unione = [...a, ...b];
  console.log('[spread merge]', unione);

  // scambio di valori senza variabile temporanea
  let x = 1, y = 2;
  [x, y] = [y, x];
  console.log('[swap]', { x, y });
}

// ==================================================================
// 9. FLAT E FLATMAP
// ==================================================================
function esempioFlatFlatMap() {
  const annidato = [1, [2, 3], [4, [5, 6]]];

  console.log('[flat(1)]', annidato.flat());       // appiattisce 1 livello
  console.log('[flat(Infinity)]', annidato.flat(Infinity)); // appiattisce tutto

  const frasi = ['ciao mondo', 'buongiorno a tutti'];
  console.log('[flatMap]', frasi.flatMap((f) => f.split(' ')));
}

// ==================================================================
// 10. SET DA ARRAY: rimuovere duplicati
// ==================================================================
function esempioDuplicati() {
  const numeri = [1, 2, 2, 3, 3, 3, 4];
  const unici = [...new Set(numeri)];
  console.log('[dedup]', unici);
}

// ==================================================================
// 11. ANTI-PATTERN da evitare (mostrati come commento, NON eseguiti)
// ==================================================================
//
// a) Usare forEach quando serve async/await in serie
//    // MALE: le chiamate async partono ma forEach non aspetta nulla
//    array.forEach(async (item) => { await fai(item); });
//    // BENE
//    for (const item of array) { await fai(item); }
//
// b) delete su un elemento di array: lascia un "buco" (undefined) invece
//    di rimuoverlo e riallineare gli indici
//    // MALE
//    delete arr[1];
//    // BENE
//    arr.splice(1, 1);
//
// c) Confrontare array con === : confronta i riferimenti, non il contenuto
//    // MALE
//    [1,2] === [1,2] // false
//    // BENE
//    JSON.stringify(a) === JSON.stringify(b) // ok per casi semplici
//    // oppure una comparazione elemento per elemento

// ==================================================================
// Runner: esegue gli esempi in sequenza
// ==================================================================
function main() {
//  esempioCreazione();
  // esempioAggiungiRimuovi();
  // esempioIterazione();
  // esempioMapFilterReduce();
  esempioRicerca();
  // esempioOrdinamento();
  // esempioCopiaImmutabilita();
  // esempioDestructuringSpread();
  // esempioFlatFlatMap();
  // esempioDuplicati();
  console.log('\nFatto.');
}

main();
