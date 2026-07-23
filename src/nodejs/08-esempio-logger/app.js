// Descrizione: consumo della classe Logger custom - registriamo un listener
// sull'evento "messageLogged" e poi chiamiamo logger.log() per scatenarlo.

const Logger = require('./logger');
const log = new Logger();

log.on('messageLogged', (arg) => {
  console.log('Listener called', arg);
});

// loggo un messaggio
log.log('messaggio di log');
