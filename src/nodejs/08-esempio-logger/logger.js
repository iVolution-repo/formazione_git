// Descrizione: esempio più avanzato in cui una classe Logger estende
// EventEmitter per emettere un evento personalizzato, passando parametri
// incapsulati all'interno di un oggetto.

const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    // Send http request
    console.log(`logger: ${message}`);
    // Scatena un evento
    this.emit('messageLogged', { data: message });
  }
}

module.exports = Logger;
