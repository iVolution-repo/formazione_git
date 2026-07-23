// ===========================================================================
// src/db/connection.js
// Modulo dedicato alla connessione verso DB2 for i.
// Isolare la logica del database in un file separato è una buona pratica:
// i router non devono sapere COME ci si connette, ma solo chiedere "esegui
// questa query". Se domani cambiamo driver o parametri, tocchiamo solo qui.
// ===========================================================================

// 1) Importiamo il driver nativo IBM per Db2. Il pacchetto "ibm_db" include
//    il CLI driver (clidriver) ed è multipiattaforma: gira anche su Windows
//    e sa dialogare con DB2 for i via DRDA.
const ibmdb = require('ibm_db');

// 2) Costruiamo la stringa di connessione a partire dalle variabili d'ambiente.
//    PROTOCOL=TCPIP è obbligatorio per una connessione di rete.
//    I valori arrivano dal file .env caricato in index.js.
const connectionString =
  `DATABASE=${process.env.DB2_DATABASE};` +
  `HOSTNAME=${process.env.DB2_HOST};` +
  `PORT=${process.env.DB2_PORT};` +
  `PROTOCOL=TCPIP;` +
  `UID=${process.env.DB2_UID};` +
  `PWD=${process.env.DB2_PWD};`;

// 3) Creiamo un POOL di connessioni. Aprire una connessione a ogni richiesta
//    HTTP è lento e costoso: il pool tiene pronte alcune connessioni e le
//    riusa. È il pattern corretto per un server web.
const pool = new ibmdb.Pool();
pool.setMaxPoolSize(10); // numero massimo di connessioni contemporanee

/**
 * Esegue una query sul database e restituisce le righe come array di oggetti.
 *
 * @param {string} sql    - La query SQL. Usa "?" per i parametri (prepared statement).
 * @param {Array}  params - Valori da sostituire ai "?" nella query (opzionale).
 * @returns {Promise<Array>} le righe risultanti.
 *
 * Nota: usare i "?" al posto di concatenare le stringhe protegge da SQL
 * injection e lascia al driver la gestione corretta di tipi ed escaping.
 */
function query(sql, params = []) {
  // Avvolgiamo l'API a callback del driver in una Promise, così nei router
  // possiamo usare la sintassi moderna async/await.
  return new Promise((resolve, reject) => {
    // 4) Chiediamo una connessione al pool.
    pool.open(connectionString, (openErr, conn) => {
      if (openErr) {
        return reject(openErr);
      }

      // 5) Eseguiamo la query passando anche i parametri.
      conn.query(sql, params, (queryErr, rows) => {
        // 6) IMPORTANTISSIMO: restituiamo la connessione al pool con close().
        //    Con il pool, close() non chiude davvero il socket: lo rimette a
        //    disposizione per la prossima richiesta.
        conn.close(() => {
          if (queryErr) {
            return reject(queryErr);
          }
          resolve(rows);
        });
      });
    });
  });
}

/**
 * Chiude tutte le connessioni del pool.
 * Da chiamare allo spegnimento dell'applicazione per liberare le risorse.
 */
function closePool() {
  return new Promise((resolve) => {
    pool.close(() => resolve(true));
  });
}

// 7) Esportiamo solo ciò che serve all'esterno: la funzione query e la
//    chiusura del pool. La stringa di connessione resta privata a questo file.
module.exports = { query, closePool };
