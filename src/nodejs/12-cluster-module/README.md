# Load test for cluster server

This folder contains `server.js` (cluster example) and a simple `loadtest.js` script.

Usage:

1. Start the server:

```bash
node server.js
```

2. In another terminal run the load test (defaults: concurrency=50, duration=10s):

```bash
node loadtest.js --concurrency=50 --duration=10 --host=127.0.0.1 --port=8000 --path=/
```

Adjust `--concurrency` and `--duration` as needed.
