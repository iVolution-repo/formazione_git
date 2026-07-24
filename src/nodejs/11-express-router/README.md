# express-hello-world — Express + DB2 for i

Esempio didattico (formazione Zegna) di un server Express strutturato con i
Router, che si connette a **DB2 for i** ed esegue una query di test.

## Struttura

```
express-hello-world/
├─ package.json
├─ .env.example          # copia in .env e valorizza i parametri
└─ src/
   ├─ index.js           # punto di ingresso: crea l'app, monta i router, avvia il server
   ├─ db/
   │  └─ connection.js    # pool di connessioni e funzione query() verso DB2 for i
   └─ routes/
      ├─ hello.js          # router "/"    -> GET /, GET /ping
      └─ db.js             # router "/db"  -> GET /db/test, GET /db/tables
```

## Prerequisiti

- Node.js 18+ (l'esempio usa `--watch` per `npm run dev`).
- Il pacchetto `idb-connector` è un **binding nativo** che usa le API di
  sistema di IBM i: il processo Node.js deve girare **direttamente sull'IBM i,
  dentro PASE** (es. via SSH). Non funziona da un client remoto come Windows
  o Linux: in quel caso serve invece `odbc` + IBM i Access ODBC Driver, oppure
  `ibm_db` con licenza DB2 Connect valida.

## Avvio (sull'IBM i, dentro PASE)

```bash
# 1) installa le dipendenze (idb-connector viene compilato per PASE)
npm install

# 2) (opzionale) crea il file di configurazione e valorizzalo
copy .env.example .env      # su Windows (usa "cp" su Linux/WSL)

# 3) avvia
npm start                   # oppure: npm run dev  (riavvio automatico)
```

## Prova

- `GET http://localhost:3000/`            → `{ "message": "Hello World da Express!" }`
- `GET http://localhost:3000/ping`        → health check
- `GET http://localhost:3000/db/test`     → query di test su `SYSIBM.SYSDUMMY1`
- `GET http://localhost:3000/db/tables?schema=QSYS2` → esempio di query parametrizzata

## Note sulla connessione DB2 for i

`src/db/connection.js` usa `idb-connector` per connettersi al database
**locale** dell'IBM i su cui gira il processo Node.js:

- `connection.conn('*LOCAL')` — nessun host/porta/utente/password: il job
  Node.js eredita il profilo utente del sistema operativo IBM i (di norma
  il profilo con cui hai fatto login via SSH).
- Volendo autenticarsi esplicitamente si può passare un nome database (RDB)
  più utente/password: `connection.conn(nomeRDB, utente, password)`.

### Query parametrizzate

`query(sql, params)` gestisce due casi:

- **Senza parametri** → `statement.exec(sql, callback)`.
- **Con parametri** (`?` nella query) → si passa dal ciclo di vita completo
  del prepared statement di `idb-connector`:
  `prepare` → `bindParam` (ogni parametro come tripla `[valore, IN, CHAR]`)
  → `execute` → `fetchAll` (le righe di una SELECT non arrivano dentro
  `execute`, vanno recuperate esplicitamente con `fetchAll`).

> Alternativa a `idb-connector` se il server deve girare da un client remoto
> (Windows/Linux) contro un IBM i: il pacchetto `odbc` con il driver **IBM i
> Access ODBC**, oppure `ibm_db` con una licenza DB2 Connect valida.
