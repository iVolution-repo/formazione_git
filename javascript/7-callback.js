/**
 * callback.js
 * ------------------------------------------------------------------
 * Raccolta di esempi pratici sulle callback in JavaScript:
 * callback sincrone, asincrone, error-first (stile Node), callback hell
 * e il collegamento con le Promise (vedi 8-promise.js).
 *
 * Eseguibile con: node 7-callback.js
 * ------------------------------------------------------------------
 */

// Attiva la modalità strict: evita errori silenziosi (es. variabili
// globali create per errore), vieta costrutti ambigui e rende il
// comportamento del motore JS più prevedibile durante gli esempi.
'use strict';

// ==================================================================
// 1. CALLBACK SINCRONA
//    Una callback è semplicemente una funzione passata come argomento
//    e invocata da chi la riceve. Se viene chiamata subito, dentro la
//    stessa esecuzione, è "sincrona" (è il caso di map/filter/reduce,
//    già visti come higher-order functions in funzioni.js).
// ==================================================================
function esempioCallbackSincrona() {
  function elabora(valore, callback) {
    const risultato = valore.toUpperCase();
    return callback(risultato); // invocata subito, nello stesso "tick"
  }

  elabora('ciao', (r) => console.log('[sincrona]', r));
}

// ==================================================================
// 2. CALLBACK ASINCRONA
//    Se la callback viene invocata più avanti nel tempo (es. dentro
//    setTimeout, un evento, una risposta di rete), il codice DOPO la
//    chiamata continua a essere eseguito subito: non c'è alcuna attesa.
// ==================================================================
function esempioCallbackAsincrona() {
  function fetchUtente(id, callback) {
    setTimeout(() => {
      callback({ id, nome: `Utente ${id}` });
    }, 200);
  }

  console.log('[asincrona] inizio richiesta...');
  fetchUtente(1, (utente) => {
    console.log('[asincrona] utente ricevuto:', utente);
  });
  console.log('[asincrona] questa riga viene stampata PRIMA della callback');
}

// ==================================================================
// 3. ERROR-FIRST CALLBACK (convenzione Node.js)
//    Il primo parametro è sempre l'errore (null se tutto ok), il
//    secondo è il risultato. Va SEMPRE controllato per primo.
// ==================================================================
function esempioErrorFirst() {
  function leggiConfigurazione(valore, callback) {
    setTimeout(() => {
      if (!valore) callback(new Error('valore mancante'));
      else callback(null, `configurazione: ${valore}`);
    }, 100);
  }

  leggiConfigurazione('produzione', (err, risultato) => {
    if (err) {
      console.error('[error-first] errore:', err.message);
      return;
    }
    console.log('[error-first]', risultato);
  });

  leggiConfigurazione(null, (err, risultato) => {
    if (err) {
      console.error('[error-first] errore:', err.message); // "valore mancante"
      return;
    }
    console.log('[error-first]', risultato);
  });
}

// ==================================================================
// 4. CALLBACK HELL
//    Operazioni asincrone dipendenti l'una dall'altra, annidate a
//    callback dentro callback: difficile da leggere e da gestire negli
//    errori (ogni livello deve ripetere il proprio if (err)).
//    Il rimedio sono le Promise/async-await (vedi promise.js).
// ==================================================================
function esempioCallbackHell() {
  function passo1(callback) {
    setTimeout(() => callback(null, 'dato1'), 100);
  }
  function passo2(dato1, callback) {
    setTimeout(() => callback(null, `${dato1}+dato2`), 100);
  }
  function passo3(dato2, callback) {
    setTimeout(() => callback(null, `${dato2}+dato3`), 100);
  }

  passo1((err1, dato1) => {
    if (err1) return console.error(err1);
    passo2(dato1, (err2, dato2) => {
      if (err2) return console.error(err2);
      passo3(dato2, (err3, dato3) => {
        if (err3) return console.error(err3);
        console.log('[callback hell]', dato3); // dato1+dato2+dato3
      });
    });
  });
}

// ==================================================================
// 5. DA CALLBACK A PROMISE
//    Avvolgere una funzione error-first in una Promise permette di
//    usarla con async/await, eliminando l'annidamento del punto 4.
//    Nota: in produzione conviene usare util.promisify (vedi promise.js §9)
//    invece di riscriverlo a mano.
// ==================================================================
function passo1(callback) {
  setTimeout(() => callback(null, 'dato1'), 100);
}

function passo1Promise() {
  return new Promise((resolve, reject) => {
    passo1((err, risultato) => {
      if (err) reject(err);
      else resolve(risultato);
    });
  });
}

async function esempioDaCallbackAPromise() {
  const risultato = await passo1Promise();
  console.log('[callback->promise]', risultato);
}

// ==================================================================
// Runner: esegue gli esempi in sequenza
// ==================================================================
function main() {
  esempioCallbackSincrona();
  // esempioCallbackAsincrona();
  // esempioErrorFirst();
  // esempioCallbackHell();
  // esempioDaCallbackAPromise();
  console.log('\nFatto.');
}

main();
