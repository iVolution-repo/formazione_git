// ===========================================================================
// src/db/connection.js
// Modulo dedicato alla connessione verso DB2 for i.
// Isolare la logica del database in un file separato è una buona pratica:
// i router non devono sapere COME ci si connette, ma solo chiedere "esegui
// questa query". Se domani cambiamo driver o parametri, tocchiamo solo qui.
//
// NOTA IMPORTANTE: "idb-connector" è un binding nativo che usa le API di
// sistema di IBM i (DB2 for i toolkit). Funziona SOLO se il processo Node.js
// gira direttamente sull'IBM i (dentro PASE), non da un client remoto come
// Windows o Linux. Se il server Express deve girare su una macchina remota,
// serve invece un driver ODBC/JDBC con licenza (es. "odbc" + IBM i Access
// ODBC Driver, oppure "ibm_db" con licenza DB2 Connect valida).
// ===========================================================================

// 1) Importiamo idb-connector: espone le classi dbconn (connessione) e
//    dbstmt (statement) con API a callback.
const { dbconn, dbstmt, IN, CHAR } = require('idb-connector');

// 2) Apriamo la connessione. "*LOCAL" indica il database locale dell'IBM i
//    su cui gira il processo Node.js: non serve host/porta/utente/password
//    perché il job eredita il profilo utente del sistema operativo.
//    Se invece serve autenticarsi esplicitamente si può usare:
//    connection.conn(process.env.DB2_DATABASE || '*LOCAL', process.env.DB2_UID, process.env.DB2_PWD);
const connection = new dbconn();
connection.conn(process.env.DB2_DATABASE || '*LOCAL');

/**
 * Esegue una query sul database e restituisce le righe come array di oggetti.
 *
 * @param {string} sql    - La query SQL.
 * @param {Array}  params - Valori per i parametri "?" (opzionale, prepared statement).
 * @returns {Promise<Array>} le righe risultanti.
 */
function query(sql, params = []) {
  // Avvolgiamo l'API a callback di idb-connector in una Promise, così nei
  // router possiamo usare async/await.
  return new Promise((resolve, reject) => {
    const statement = new dbstmt(connection);

    if (params.length === 0) {
      // 3a) Query senza parametri: exec esegue direttamente l'SQL.
      statement.exec(sql, (result, error) => {
        statement.close();
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
      return;
    }

    // 3b) Query con parametri: prepare -> bind -> execute (prepared statement).
    statement.prepare(sql, (error) => {
      if (error) {
        statement.close();
        return reject(error);
      }
      // bindParam vuole ogni parametro come tripla [valore, io, indicator]:
      // IN = parametro di input, CHAR = tipo dato carattere.
      const bindingParams = params.map((value) => [value, IN, CHAR]);
      statement.bindParam(bindingParams, (bindError) => {
        if (bindError) {
          statement.close();
          return reject(bindError);
        }
        statement.execute((execResult, execError) => {
          if (execError) {
            statement.close();
            return reject(execError);
          }

          // Con prepare/bindParam/execute su una SELECT le righe non arrivano
          // dentro "execResult": vanno recuperate esplicitamente con fetchAll.
          statement.fetchAll((rows, fetchError) => {
            statement.close();
            if (fetchError) {
              return reject(fetchError);
            }
            resolve(rows);
          });
        });
      });
    });
  });
}

/**
 * Chiude la connessione verso il database.
 * Da chiamare allo spegnimento dell'applicazione per liberare le risorse.
 */
function closePool() {
  return new Promise((resolve) => {
    connection.close();
    resolve(true);
  });
}

// 7) Esportiamo solo ciò che serve all'esterno: la funzione query e la
//    chiusura del pool. La stringa di connessione resta privata a questo file.
module.exports = { query, closePool };
