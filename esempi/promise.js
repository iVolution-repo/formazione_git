/**
 * promises-esempi.js
 * ------------------------------------------------------------------
 * Raccolta di esempi pratici sulle Promise in JavaScript/Node.js
 * con le relative best practices commentate.
 *
 * Eseguibile con: node promises-esempi.js
 * Richiede Node >= 18 (per fetch nativo e Promise.any/allSettled).
 * ------------------------------------------------------------------
 */

'use strict';

import { promisify } from 'node:util';
import { setTimeout as sleep } from 'node:timers/promises';

// ==================================================================
// 1. PROMISE DI BASE
//    Rifiuta SEMPRE con un oggetto Error per preservare lo stack trace.
// ==================================================================
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: `Utente ${id}` });
      else reject(new Error('ID non valido'));
    }, 300);
  });
}

// ==================================================================
// 2. CONSUMO CON async/await + try/catch
//    Preferisci questo stile al .then() concatenato: più leggibile
//    e gli errori passano naturalmente per il catch.
// ==================================================================
async function esempioBase() {
  try {
    const user = await fetchUser(1);
    console.log('[base] utente:', user);
  } catch (err) {
    console.error('[base] errore:', err.message);
  }
}

// ==================================================================
// 3. PARALLELISMO vs SERIALE
//    Se le operazioni sono indipendenti, NON fare await in serie.
// ==================================================================
async function esempioParallelo() {
  // Bene: partono insieme, ~300ms totali
  const [a, b, c] = await Promise.all([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3),
  ]);
  console.log('[parallelo] Promise.all:', a.name, b.name, c.name);
}

// ==================================================================
// 4. Promise.allSettled
//    Aspetta TUTTE e restituisce esiti misti (fulfilled/rejected).
//    Utile quando vuoi il risultato parziale anche se qualcosa fallisce.
// ==================================================================
async function esempioAllSettled() {
  const risultati = await Promise.allSettled([
    fetchUser(1),   // ok
    fetchUser(-1),  // rejected
    fetchUser(2),   // ok
  ]);

  for (const r of risultati) {
    if (r.status === 'fulfilled') console.log('[allSettled] ok:', r.value.name);
    else console.log('[allSettled] fallita:', r.reason.message);
  }
}

// ==================================================================
// 5. Promise.race e Promise.any
//    race:  si risolve/rifiuta con la PRIMA che si conclude.
//    any:   si risolve con la prima che ha SUCCESSO (ignora i rifiuti).
// ==================================================================
async function esempioRaceAny() {
  const lenta = sleep(500).then(() => 'lenta');
  const veloce = sleep(100).then(() => 'veloce');

  console.log('[race]', await Promise.race([lenta, veloce])); // "veloce"

  const risultato = await Promise.any([
    Promise.reject(new Error('primo fallito')),
    sleep(150).then(() => 'secondo ok'),
  ]);
  console.log('[any]', risultato); // "secondo ok"
}

// ==================================================================
// 6. TIMEOUT con Promise.race
//    Pattern classico: corri la funzione contro un timer che rigetta.
// ==================================================================
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout dopo ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

async function esempioTimeout() {
  try {
    // fetchUser impiega 300ms, timeout a 100ms -> rigetta
    await withTimeout(fetchUser(1), 100);
  } catch (err) {
    console.error('[timeout]', err.message);
  }
}

// ==================================================================
// 7. RETRY con backoff esponenziale
//    Riprova un'operazione instabile aumentando l'attesa a ogni tentativo.
// ==================================================================
async function retry(fn, { tentativi = 3, delayMs = 200 } = {}) {
  let ultimoErrore;
  for (let i = 0; i < tentativi; i++) {
    try {
      return await fn();
    } catch (err) {
      ultimoErrore = err;
      if (i < tentativi - 1) {
        const attesa = delayMs * 2 ** i; // 200, 400, 800...
        console.log(`[retry] tentativo ${i + 1} fallito, riprovo tra ${attesa}ms`);
        await sleep(attesa);
      }
    }
  }
  throw ultimoErrore;
}

async function esempioRetry() {
  let chiamate = 0;
  const instabile = () => {
    chiamate++;
    return chiamate < 3
      ? Promise.reject(new Error('servizio non pronto'))
      : Promise.resolve('successo al terzo tentativo');
  };

  try {
    console.log('[retry]', await retry(instabile, { tentativi: 4, delayMs: 100 }));
  } catch (err) {
    console.error('[retry] esaurito:', err.message);
  }
}

// ==================================================================
// 8. LOOP: seriale vs parallelo
//    forEach(async ...) NON aspetta nulla -> evitalo.
// ==================================================================
async function esempioLoop() {
  const ids = [1, 2, 3];

  // Seriale (uno dopo l'altro): usa for...of con await
  for (const id of ids) {
    const u = await fetchUser(id);
    console.log('[loop seriale]', u.name);
  }

  // Parallelo: map + Promise.all
  const utenti = await Promise.all(ids.map((id) => fetchUser(id)));
  console.log('[loop parallelo]', utenti.map((u) => u.name).join(', '));
}

// ==================================================================
// 9. PROMISIFY di API basate su callback
//    Non ricostruire a mano il new Promise: usa util.promisify.
// ==================================================================
function apiVecchiaStile(valore, callback) {
  setTimeout(() => {
    if (valore) callback(null, `elaborato: ${valore}`);
    else callback(new Error('valore mancante'));
  }, 100);
}

async function esempioPromisify() {
  const apiModerna = promisify(apiVecchiaStile);
  // @ts-ignore
  console.log('[promisify]', await apiModerna('dato'));
}

// ==================================================================
// 10. ANTI-PATTERN da evitare (mostrati come commento, NON eseguire)
// ==================================================================
//
// a) Costruttore inutile: NON avvolgere una Promise in un'altra Promise
//    // MALE
//    function bad() {
//      return new Promise((resolve, reject) => {
//        fetchUser(1).then(resolve).catch(reject);
//      });
//    }
//    // BENE
//    function good() {
//      return fetchUser(1);
//    }
//
// b) return dentro try senza await: l'errore sfugge al catch
//    // MALE: il catch non intercetta il rejection
//    async function bad() {
//      try { return fetchUser(-1); } catch (e) { /* mai raggiunto */ }
//    }
//    // BENE
//    async function good() {
//      try { return await fetchUser(-1); } catch (e) { /* intercettato */ }
//    }
//
// c) Ingoiare gli errori con catch vuoto -> maschera i bug
//    fetchUser(-1).catch(() => {}); // MALE: almeno logga o rilancia

// ==================================================================
// Runner: esegue gli esempi in sequenza
// ==================================================================
async function main() {
  await esempioBase();
  await esempioParallelo();
  await esempioAllSettled();
  await esempioRaceAny();
  await esempioTimeout();
  await esempioRetry();
  await esempioLoop();
  await esempioPromisify();
  console.log('\nFatto.');
}

main().catch((err) => {
  // Ultima rete di sicurezza: nessun unhandledRejection sfugge.
  console.error('Errore non gestito nel main:', err);
  process.exitCode = 1;
});