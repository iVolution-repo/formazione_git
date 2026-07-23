// ===========================================================================
// src/routes/db.js
// Router che raggruppa le rotte legate al database DB2 for i.
// Verrà montato sotto il path "/db" (vedi index.js), quindi le rotte qui
// sotto risponderanno a /db/test e /db/tables.
// ===========================================================================

const express = require('express');
const router = express.Router();

// Importiamo la funzione query dal nostro modulo di connessione.
// Il router non conosce i dettagli della connessione: chiede solo "esegui".
const { query } = require('../db/connection.js');

// ---------------------------------------------------------------------------
// GET /db/test
// Query di test per verificare che la connessione a DB2 for i funzioni.
// Usiamo SYSIBM.SYSDUMMY1: è una tabella di sistema con UNA sola riga,
// perfetta per un controllo di connettivita senza dipendere da dati applicativi.
// ---------------------------------------------------------------------------
router.get('/test', async (req, res, next) => {
  try {
    const rows = await query(
      // CURRENT_SERVER restituisce il nome del sistema IBM i a cui siamo connessi:
      // conferma visiva che stiamo parlando con il server giusto.
      'SELECT CURRENT_DATE AS DATA, ' +
      '       CURRENT_TIME AS ORA, ' +
      '       CURRENT_SERVER AS SISTEMA ' +
      'FROM SYSIBM.SYSDUMMY1'
    );

    // rows è un array di oggetti: [{ DATA: '2026-07-23', ORA: '...', SISTEMA: '...' }]
    res.json({ ok: true, rows });
  } catch (err) {
    // In caso di errore lo passiamo al middleware di gestione errori (index.js)
    // invece di gestirlo qui: manteniamo il codice pulito e centralizzato.
    next(err);
  }
});

// ---------------------------------------------------------------------------
// GET /db/tables?schema=NOMELIB
// Esempio di query PARAMETRIZZATA (prepared statement).
// Elenca le prime 20 tabelle di uno schema/libreria passato via query string.
// Il valore dello schema NON viene concatenato nella SQL: viaggia come
// parametro "?", cosi il driver lo gestisce in sicurezza (niente SQL injection).
// ---------------------------------------------------------------------------
router.get('/tables', async (req, res, next) => {
  try {
    // Prendiamo lo schema dalla query string; se assente usiamo QSYS2 come default.
    const schema = (req.query.schema || 'QSYS2').toUpperCase();

    const rows = await query(
      'SELECT TABLE_NAME, TABLE_TEXT ' +
      'FROM QSYS2.SYSTABLES ' +
      'WHERE TABLE_SCHEMA = ? ' +   // <-- il "?" verra sostituito dal parametro
      'ORDER BY TABLE_NAME ' +
      'FETCH FIRST 20 ROWS ONLY',
      [schema]                       // <-- valore passato in modo sicuro
    );

    res.json({ ok: true, schema, count: rows.length, rows });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
