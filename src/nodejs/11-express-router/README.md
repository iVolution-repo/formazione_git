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
- Il pacchetto `ibm_db` include il **CLI driver** IBM: su Windows scarica i
  binari precompilati durante `npm install`, quindi di norma non serve altro.
  In caso di errori di build può servire Python e i Visual C++ Build Tools.

## Avvio

```bash
# 1) installa le dipendenze
npm install

# 2) crea il file di configurazione e valorizzalo
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

La stringa di connessione (in `src/db/connection.js`) usa:

- `DATABASE` = nome **RDB** del sistema (lo trovi con `WRKRDBDIRE` su IBM i)
- `HOSTNAME` = host del sistema IBM i
- `PORT`     = `446` (DRDA) — usa `448` con TLS
- `PROTOCOL=TCPIP` (obbligatorio per connessioni di rete)

> Alternativa a `ibm_db`: il pacchetto `odbc` con il driver **IBM i Access
> ODBC**. Su IBM i (in PASE) si userebbe invece `idb-connector`, che qui non è
> adatto perché giriamo da Windows contro un sistema remoto.
