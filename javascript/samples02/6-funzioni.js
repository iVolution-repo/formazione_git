/**
 * funzioni.js
 * ------------------------------------------------------------------
 * Raccolta di esempi pratici sulle functions in JavaScript:
 * dichiarazioni, espressioni, arrow function, parametri, closure,
 * higher-order functions e this.
 *
 * Eseguibile con: node 6-funzioni.js
 * ------------------------------------------------------------------
 */
// @ts-nocheck
// Attiva la modalità strict: evita errori silenziosi (es. variabili
// globali create per errore), vieta costrutti ambigui e rende il
// comportamento del motore JS più prevedibile durante gli esempi.
'use strict';

// ==================================================================
// 1. FUNCTION DECLARATION vs FUNCTION EXPRESSION
//
//    HOISTING: prima di eseguire il codice, il motore JS scandisce
//    lo scope e "solleva" (hoist = sollevare) le dichiarazioni in
//    cima, registrandole in memoria. Per le function declaration
//    (function nome() {...}) viene sollevata l'INTERA funzione, corpo
//    incluso: ecco perché si può chiamare "saluta()" anche a riga 21,
//    prima ancora che il codice arrivi alla sua definizione a riga 23.
//
//    Le function expression (const f = function () {...}) NON hanno
//    questo comportamento: viene sollevata solo la dichiarazione della
//    variabile (con let/const resta in una "temporal dead zone", cioè
//    esiste ma è inaccessibile finché l'esecuzione non arriva alla sua
//    riga), mentre l'assegnazione della funzione avviene solo quando
//    l'interprete esegue davvero quella riga.
// ==================================================================
function esempioDichiarazioneVsEspressione() {
  console.log('[hoisting]', saluta('Anna')); // funziona: "saluta" è già disponibile per l'hoisting

  function saluta(nome) {
    return `Ciao, ${nome}!`;
  }

  // Function expression: assegnata a una const, NON è hoistata come funzione.
  // Se provassi a chiamare saluta2() PRIMA di questa riga otterresti un
  // ReferenceError ("Cannot access 'saluta2' before initialization").
  const saluta2 = function (nome) {
    return `Salve, ${nome}!`;
  };
  console.log('[espressione]', saluta2('Marco'));

  // Function expression con nome: il nome è visibile solo dentro se stessa (utile per la ricorsione)
  const fattoriale = function fatt(n) {
    return n <= 1 ? 1 : n * fatt(n - 1);
  };
  console.log('[espressione con nome, ricorsiva]', fattoriale(5)); // 120
}

// ==================================================================
// 2. ARROW FUNCTION
//    Sintassi più concisa e, soprattutto, NON hanno un proprio "this":
//    ereditano quello dello scope in cui sono definite (vedi sezione 6).
// ==================================================================
function esempioArrowFunction() {
  const quadrato = (x) => x * x; // un solo parametro, return implicito
  console.log('[arrow concisa]', quadrato(4)); // 16

  const somma = (a, b) => {
    const risultato = a + b; // con le graffe serve il return esplicito
    return risultato;
  };
  console.log('[arrow con blocco]', somma(2, 3)); // 5

  const creaOggetto = (nome) => ({ nome }); // per restituire un oggetto letterale servono le parentesi tonde
  console.log('[arrow che ritorna oggetto]', creaOggetto('Luca'));
}

// ==================================================================
// 3. PARAMETRI: default, rest, arguments
// ==================================================================
function esempioParametri() {
  function saluta(nome = 'sconosciuto') { // default: usato solo se l'argomento è undefined
    return `Ciao, ${nome}`;
  }
  console.log('[default]', saluta()); // Ciao, sconosciuto
  console.log('[default]', saluta('Bea')); // Ciao, Bea

  function somma(...numeri) { // rest: raccoglie tutti gli argomenti in un vero array
    return numeri.reduce((acc, n) => acc + n, 0);
  }
  console.log('[rest]', somma(1, 2, 3, 4)); // 10

  function vecchioStile() {
    // arguments: oggetto array-like disponibile nelle function normali (non nelle arrow function)
    return Array.from(arguments).join(', ');
  }
  console.log('[arguments]', vecchioStile('a', 'b', 'c'));
}

// ==================================================================
// 4. CLOSURE
//    Una funzione "ricorda" lo scope in cui è stata creata, anche
//    dopo che la funzione esterna ha terminato l'esecuzione.
// ==================================================================
function esempioClosure() {
  function creaContatore() {
    let valore = 0; // "valore" resta racchiuso (closure) nella funzione restituita
    return function incrementa() {
      valore++;
      return valore;
    };
  }

  const contatore1 = creaContatore();
  const contatore2 = creaContatore(); // ogni chiamata crea un nuovo scope, quindi un contatore indipendente

  console.log('[closure]', contatore1()); // 1
  console.log('[closure]', contatore1()); // 2
  console.log('[closure indipendente]', contatore2()); // 1
}

// ==================================================================
// 5. HIGHER-ORDER FUNCTIONS
//    Funzioni che ricevono altre funzioni come argomento o che
//    restituiscono funzioni.
// ==================================================================
function esempioHigherOrder() {
  const numeri = [1, 2, 3, 4, 5];

  console.log('[map]', numeri.map((n) => n * 2));
  console.log('[filter]', numeri.filter((n) => n % 2 === 0));
  console.log('[reduce]', numeri.reduce((acc, n) => acc + n, 0));

  // Funzione che ne restituisce un'altra (currying semplice)
  function moltiplicatorePer(fattore) {
    return function (numero) {
      return numero * fattore;
    };
  }
  const raddoppia = moltiplicatorePer(2);
  console.log('[funzione che ritorna funzione]', raddoppia(10)); // 20
}

// ==================================================================
// 6. IIFE (Immediately Invoked Function Expression)
//    Utile per creare uno scope isolato ed evitare di inquinare
//    lo scope globale.
// ==================================================================
function esempioIIFE() {
  const risultato = (function () {
    const segreto = 'valore privato';
    return segreto.toUpperCase();
  })(); // le parentesi finali invocano subito la funzione

  console.log('[IIFE]', risultato);
  // console.log(segreto); // ReferenceError: "segreto" non esiste fuori dalla IIFE
}

// ==================================================================
// 7. THIS: function normale vs arrow function
//    Nella function normale "this" dipende da COME viene chiamata.
//    Nell'arrow function "this" è quello ereditato dallo scope esterno.
// ==================================================================
function esempioThisInFunzioni() {
  const timer = {
    secondi: 0,
    avviaSbagliato() {
      // MALE: dentro una normale function "this" non è più "timer"
      setTimeout(function () {
        // this.secondi++; // this qui è undefined (strict mode) o il global object
      }, 0);
    },
    avviaCorretto() {
      // BENE: l'arrow function eredita "this" da avviaCorretto, cioè "timer"
      setTimeout(() => {
        this.secondi++;
        console.log('[this in arrow]', this.secondi);
      }, 0);
    },
  };

  timer.avviaCorretto();
}

// ==================================================================
// Runner: esegue gli esempi in sequenza
// ==================================================================
function main() {
  esempioDichiarazioneVsEspressione();
  // esempioArrowFunction();
  // esempioParametri();
  // esempioClosure();
  // esempioHigherOrder();
  // esempioIIFE();
  // esempioThisInFunzioni();
  console.log('\nFatto.');
}

main();
