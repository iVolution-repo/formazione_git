/**
 * controllo-flusso.js
 * ------------------------------------------------------------------
 * Raccolta di esempi pratici sulle strutture di controllo del flusso
 * in JavaScript: condizionali (if/else, switch) e cicli (for, while,
 * do-while, for...of, for...in), con break/continue e best practices.
 *
 * Eseguibile con: node 3-controllo-flusso.js
 * ------------------------------------------------------------------
 */
// @ts-nocheck
// Attiva la modalità strict: evita errori silenziosi (es. variabili
// globali create per errore), vieta costrutti ambigui e rende il
// comportamento del motore JS più prevedibile durante gli esempi.
'use strict';

// ==================================================================
// 1. IF / ELSE / ELSE IF
// ==================================================================
function esempioIfElse() {
  const eta = 20;

  if (eta < 13) {
    console.log('[if]', 'bambino');
  } else if (eta < 18) {
    console.log('[if]', 'adolescente');
  } else {
    console.log('[if]', 'adulto');
  }

  // Nota: il ternario (già visto in operatori.js) è spesso preferibile
  // a un if/else quando si tratta solo di scegliere un valore.
}

// ==================================================================
// 2. SWITCH
//    Attenzione al "fall-through": senza break l'esecuzione prosegue
//    nel case successivo. Il "default" gestisce i casi non previsti.
// ==================================================================
function esempioSwitch() {
  const giorno = 3;
  let nome;

  switch (giorno) {
    case 1:
      nome = 'Lunedì';
      break;
    case 2:
      nome = 'Martedì';
      break;
    case 3:
      nome = 'Mercoledì';
      break;
    default:
      nome = 'Giorno sconosciuto';
  }
  console.log('[switch]', nome);

  // Fall-through intenzionale: più case che condividono la stessa azione
  function tipoGiorno(g) {
    switch (g) {
      case 0:
      case 6:
        return 'weekend';
      default:
        return 'feriale';
    }
  }
  console.log('[switch fall-through]', tipoGiorno(0), tipoGiorno(3));
}

// ==================================================================
// 3. FOR CLASSICO
// ==================================================================
function esempioForClassico() {
  for (let i = 0; i < 5; i++) {
    console.log('[for]', i);
  }

  // Iterazione a ritroso
  for (let i = 5; i > 0; i--) {
    console.log('[for a ritroso]', i);
  }
}

// ==================================================================
// 4. WHILE E DO...WHILE
//    while verifica la condizione PRIMA di eseguire il blocco,
//    do...while la verifica DOPO, quindi esegue almeno una volta.
// ==================================================================
function esempioWhile() {
  let i = 0;
  while (i < 3) {
    console.log('[while]', i);
    i++;
  }

  let j = 0;
  do {
    console.log('[do-while]', j);
    j++;
  } while (j < 3);

  // do...while esegue comunque una volta, anche se la condizione è falsa
  let k = 10;
  do {
    console.log('[do-while eseguito comunque]', k);
  } while (k < 5);
}

// ==================================================================
// 5. FOR...OF
//    Itera sui VALORI di un iterabile (array, string, Map, Set...).
// ==================================================================
function esempioForOf() {
  const frutti = ['mela', 'pera', 'banana'];
  for (const frutto of frutti) {
    console.log('[for...of array]', frutto);
  }

  for (const carattere of 'abc') {
    console.log('[for...of string]', carattere);
  }
}

// ==================================================================
// 6. FOR...IN
//    Itera sulle CHIAVI enumerabili di un oggetto (o gli indici di
//    un array, ma per gli array è preferibile for...of/forEach).
// ==================================================================
function esempioForIn() {
  const persona = { nome: 'Anna', eta: 30, citta: 'Milano' };
  for (const chiave in persona) {
    console.log('[for...in]', chiave, '->', persona[chiave]);
  }
}

// ==================================================================
// 7. BREAK E CONTINUE
//    break interrompe subito il ciclo, continue salta alla prossima
//    iterazione senza eseguire il resto del blocco corrente.
// ==================================================================
function esempioBreakContinue() {
  for (let i = 0; i < 10; i++) {
    if (i === 5) break; // esce dal ciclo appena i vale 5
    console.log('[break]', i);
  }

  for (let i = 0; i < 5; i++) {
    if (i % 2 === 0) continue; // salta i numeri pari
    console.log('[continue]', i);
  }

  // Label: permette a break/continue di agire su un ciclo esterno
  esterno: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (j === 1) continue esterno;
      console.log('[label]', i, j);
    }
  }
}

// ==================================================================
// Runner: esegue gli esempi in sequenza
// ==================================================================
function main() {
  esempioIfElse();
  esempioSwitch();
  esempioForClassico();
  esempioWhile();
  esempioForOf();
  esempioForIn();
  esempioBreakContinue();
  console.log('\nFatto.');
}

main();
