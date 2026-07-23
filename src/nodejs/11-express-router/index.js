// ===========================================================================
// src/index.js
// Punto di ingresso dell'applicazione Express.
// Qui creiamo l'app, montiamo i router, definiamo la gestione degli errori
// e avviamo il server HTTP.
// ===========================================================================

// 1) Carichiamo le variabili d'ambiente dal file .env (porta, credenziali DB2).
//    Va fatto per PRIMO, prima di importare moduli che leggono process.env.
require('dotenv').config();

// 2) Importiamo Express, il framework web.
const express = require('express');

// 3) Importiamo i router definiti nei file separati e il pool del database.
const helloRouter = require('./routes/hello');
const dbRouter = require('./routes/db');
const { closePool } = require('./db/connection');

// 4) Creiamo l'istanza dell'applicazione.
const app = express();

// 5) Middleware: abilita la lettura del body JSON delle richieste in ingresso.
app.use(express.json());

// 6) Montiamo i router su un path base.
//    - helloRouter risponde sotto "/"      -> GET /,    GET /ping
//    - dbRouter    risponde sotto "/db"     -> GET /db/test, GET /db/tables
//    Questo e il cuore dell'uso del Router: ogni gruppo di rotte vive in un
//    file dedicato e viene "agganciato" qui con un prefisso.
app.use('/', helloRouter);
app.use('/db', dbRouter);

// 7) Middleware per le rotte non trovate (404).
//    Viene raggiunto solo se nessuna rotta precedente ha risposto.
app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Rotta non trovata' });
});

// 8) Middleware CENTRALIZZATO di gestione errori.
//    Ha 4 parametri (err, req, res, next): questo dice a Express che e un
//    error handler. Ci arrivano tutti gli errori passati con next(err),
//    ad esempio i fallimenti delle query nel router del database.
app.use((err, req, res, next) => {
  console.error('Errore:', err.message);
  res.status(500).json({ ok: false, error: err.message });
});

// 9) Avviamo il server in ascolto sulla porta configurata (default 3000).
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
  console.log(`Prova la connessione DB2:  http://localhost:${PORT}/db/test`);
});

// 10) Spegnimento pulito: alla chiusura del processo (Ctrl+C) chiudiamo prima
//     il pool di connessioni DB2 e poi il server HTTP, per liberare le risorse.
process.on('SIGINT', async () => {
  console.log('\nChiusura in corso...');
  await closePool();
  server.close(() => process.exit(0));
});
