// ===========================================================================
// src/routes/hello.js
// Router di esempio "hello world".
// Un Router di Express è come una mini-applicazione: raggruppa un insieme di
// rotte correlate in un file dedicato, che poi montiamo nell'app principale.
// ===========================================================================

const express = require('express');

// 1) Creiamo un'istanza di Router. È qui che registriamo le rotte.
const router = express.Router();

// 2) GET / -> risponde con un semplice messaggio di benvenuto.
//    Il path "/" è relativo al punto in cui monteremo il router (vedi index.js).
router.get('/', (req, res) => {
  res.json({ message: 'Hello World da Express!' });
});

// 3) GET /ping -> utile come health check dell'applicazione.
router.get('/ping', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 4) Esportiamo il router così index.js può montarlo.
module.exports = router;
