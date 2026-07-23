const http = require('node:http');

function parseArgs() {
  const args = { concurrency: 50, duration: 10, host: '127.0.0.1', port: 8000, path: '/' };
  for (let i = 2; i < process.argv.length; i++) {
    const a = process.argv[i];
    if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=');
      if (k === 'concurrency') args.concurrency = Number(v);
      if (k === 'duration') args.duration = Number(v);
      if (k === 'host') args.host = v;
      if (k === 'port') args.port = Number(v);
      if (k === 'path') args.path = v;
    }
  }
  return args;
}

function sendRequest(options) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = http.request(options, (res) => {
      // consume data
      res.on('data', () => {});
      res.on('end', () => {
        const latency = Date.now() - start;
        resolve({ success: true, statusCode: res.statusCode, latency });
      });
    });
    req.on('error', (err) => {
      const latency = Date.now() - start;
      resolve({ success: false, error: err.message, latency });
    });
    req.setTimeout(10000, () => {
      req.abort();
    });
    req.end();
  });
}

async function worker(id, endTime, options, stats) {
  while (Date.now() < endTime) {
    const r = await sendRequest(options);
    stats.total++;
    stats.latencies.push(r.latency);
    if (r.success) stats.success++;
    else stats.fail++;
  }
}

function summarize(stats, durationSeconds) {
  const total = stats.total;
  const success = stats.success;
  const fail = stats.fail;
  const lat = stats.latencies;
  const min = lat.length ? Math.min(...lat) : 0;
  const max = lat.length ? Math.max(...lat) : 0;
  const avg = lat.length ? Math.round(lat.reduce((a,b)=>a+b,0)/lat.length) : 0;
  const rps = Math.round(total / durationSeconds);
  return { total, success, fail, min, max, avg, rps };
}

async function main() {
  const args = parseArgs();
  console.log('Load test config:', args);
  const options = { hostname: args.host, port: args.port, path: args.path, method: 'GET' };

  const stats = { total: 0, success: 0, fail: 0, latencies: [] };
  const endTime = Date.now() + args.duration * 1000;

  const workers = [];
  for (let i = 0; i < args.concurrency; i++) {
    workers.push(worker(i, endTime, options, stats));
  }

  await Promise.all(workers);

  const summary = summarize(stats, args.duration);
  console.log('\nResult:');
  console.log(`Total requests: ${summary.total}`);
  console.log(`Successful: ${summary.success}`);
  console.log(`Failed: ${summary.fail}`);
  console.log(`Latency ms (min/avg/max): ${summary.min}/${summary.avg}/${summary.max}`);
  console.log(`Throughput (approx rps): ${summary.rps}`);
}

if (require.main === module) main().catch(err => {
  console.error('Loadtest error:', err);
  process.exit(1);
});
