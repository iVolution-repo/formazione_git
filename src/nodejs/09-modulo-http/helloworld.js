// Descrizione: Modulo http - Creare un Web Server con Node.js: Hello World!
// createServer ritorna un oggetto http.Server e accetta una callback
// event-driven invocata dal motore V8 ad ogni richiesta, con parametri
// request (http.ServerRequest) e response (http.ServerResponse).
// Salvare come helloworld.js, avviare con "node helloworld.js" e navigare
// su http://localhost:1337.

var http = require('http');
var server = http.createServer(function (req, res) {
  console.log('Ricevuta richiesta:', req.method, req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});
server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
