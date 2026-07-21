/**
 * operatori.js
 * ------------------------------------------------------------------
 * Raccolta di esempi pratici sugli operatori di base in JavaScript,
 * con le relative best practices commentate.
 *
 * Eseguibile con: node operatori.js
 * ------------------------------------------------------------------
 */
// @ts-nocheck
// Attiva la modalità strict: evita errori silenziosi (es. variabili
// globali create per errore), vieta costrutti ambigui e rende il
// comportamento del motore JS più prevedibile durante gli esempi.
'use strict';

// ==================================================================
// 1. OPERATORI ARITMETICI
// ==================================================================
function esempioAritmetici() {
  const a = 10;
  const b = 3;

  console.log('[somma]', a + b);        // 13
  console.log('[sottrazione]', a - b);  // 7
  console.log('[moltiplicazione]', a * b); // 30
  console.log('[divisione]', a / b);    // 3.333...
  console.log('[modulo]', a % b);       // 1 (resto della divisione)
  console.log('[esponente]', a ** 2);   // 100

  // ATTENZIONE: + con le stringhe concatena invece di sommare
  console.log('[concatenazione]', '10' + 3); // '103'
  console.log('[coercizione]', '10' - 3);     // 7 (qui invece converte a numero)
}

// ==================================================================
// 2. INCREMENTO E DECREMENTO
//    prefisso (++x) incrementa PRIMA di restituire il valore,
//    postfisso (x++) restituisce il valore e POI incrementa.
// ==================================================================
function esempioIncrementoDecremento() {
  let x = 5;
  console.log('[postfisso]', x++, '-> x diventa', x); // 5 -> 6
  console.log('[prefisso]', ++x, '-> x diventa', x);  // 7 -> 7

  let y = 5;
  y--;
  console.log('[decremento]', y); // 4
}

// ==================================================================
// 3. OPERATORI DI ASSEGNAZIONE
// ==================================================================
function esempioAssegnazione() {
  let n = 10;

  n += 5;  console.log('[+=]', n); // 15
  n -= 3;  console.log('[-=]', n); // 12
  n *= 2;  console.log('[*=]', n); // 24
  n /= 4;  console.log('[/=]', n); // 6
  n %= 4;  console.log('[%=]', n); // 2
  n **= 3; console.log('[**=]', n); // 8

  // Assegnazione condizionale: valorizza solo se la condizione è vera
  let a = null;
  a ??= 'valore di default'; // assegna solo se a è null/undefined
  console.log('[??=]', a);

  let b = 0;
  b ||= 100; // assegna se b è falsy (0 è falsy!) -> attenzione con i numeri
  console.log('[||=]', b);

  let c = 1;
  c &&= 2; // assegna solo se c è già truthy
  console.log('[&&=]', c);
}

// ==================================================================
// 4. OPERATORI DI CONFRONTO
//    == confronta con coercizione di tipo (da evitare),
//    === confronta valore E tipo (best practice).
// ==================================================================
function esempioConfronto() {
  console.log('[== ]', 5 == '5');   // true  -> coercizione, MALE
  console.log('[===]', 5 === '5');  // false -> confronto stretto, BENE

  console.log('[!= ]', 5 != '5');   // false
  console.log('[!==]', 5 !== '5');  // true

  console.log('[> ]', 10 > 5);   // true
  console.log('[< ]', 10 < 5);   // false
  console.log('[>=]', 10 >= 10); // true
  console.log('[<=]', 9 <= 10);  // true
}

// ==================================================================
// 5. OPERATORI LOGICI
//    && e || fanno "short-circuit": si fermano appena il risultato
//    è determinato, senza valutare l'espressione successiva.
// ==================================================================
function esempioLogici() {
  const a = true;
  const b = false;

  console.log('[AND]', a && b); // false
  console.log('[OR]', a || b);  // true
  console.log('[NOT]', !a);     // false

  // Short-circuit: uso pratico per valori di default o chiamate condizionali
  const nome = null;
  console.log('[|| default]', nome || 'Anonimo'); // 'Anonimo'

  function log() { console.log('eseguita'); }
  false && log(); // log() NON viene chiamata
  true || log();  // log() NON viene chiamata

  // Nullish coalescing (??): a differenza di ||, considera falsy solo
  // null e undefined, non 0, '' o false
  const conteggio = 0;
  console.log('[|| con 0]', conteggio || 10); // 10  <- probabilmente sbagliato
  console.log('[?? con 0]', conteggio ?? 10); // 0   <- corretto
}

// ==================================================================
// 6. OPTIONAL CHAINING (?.)
//    Evita errori "Cannot read properties of undefined" quando si
//    accede a proprietà annidate che potrebbero non esistere.
// ==================================================================
function esempioOptionalChaining() {
  const utente = { nome: 'Anna', indirizzo: { citta: 'Milano' } };
  const utenteSenzaIndirizzo = { nome: 'Marco' };

  console.log('[?. presente]', utente?.indirizzo?.citta);              // 'Milano'
  console.log('[?. assente]', utenteSenzaIndirizzo?.indirizzo?.citta); // undefined, non lancia errore

  // Utile anche per chiamare metodi che potrebbero non esistere
  console.log('[?. metodo]', utenteSenzaIndirizzo.saluta?.()); // undefined, non lancia errore
}

// ==================================================================
// 7. OPERATORE TERNARIO
// ==================================================================
function esempioTernario() {
  const eta = 20;
  const maggiorenne = eta >= 18 ? 'maggiorenne' : 'minorenne';
  console.log('[ternario]', maggiorenne);

  // Ternari annidati: leggibili solo se pochi, altrimenti preferire if/else
  const voto = 75;
  const giudizio = voto >= 90 ? 'ottimo' : voto >= 60 ? 'sufficiente' : 'insufficiente';
  console.log('[ternario annidato]', giudizio);
}

// ==================================================================
// 8. TYPEOF E CONVERSIONI DI TIPO
// ==================================================================
function esempioTypeofConversioni() {
  console.log('[typeof]', typeof 42, typeof 'testo', typeof true, typeof undefined, typeof {});

  // Conversioni esplicite (sempre meglio della coercizione implicita)
  console.log('[Number]', Number('42'), Number('3.14'), Number('abc')); // NaN se non convertibile
  console.log('[String]', String(42), String(true));
  console.log('[Boolean]', Boolean(0), Boolean(''), Boolean('ciao'), Boolean(null));

  // Il doppio NOT (!!) è una scorciatoia comune per convertire in booleano
  // @ts-ignore
  console.log('[!!]', !!'testo', !!0);
}

// ==================================================================
// Runner: esegue gli esempi in sequenza
// ==================================================================
function main() {
  esempioAritmetici();
  esempioIncrementoDecremento();
  esempioAssegnazione();
  esempioConfronto();
  esempioLogici();
  esempioOptionalChaining();
  esempioTernario();
  esempioTypeofConversioni();
  console.log('\nFatto.');
}

main();
