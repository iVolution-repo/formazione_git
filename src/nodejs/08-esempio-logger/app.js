// Descrizione: consumo della classe Logger custom - registriamo un listener
// sull'evento "messageLogged" e poi chiamiamo logger.log() per scatenarlo.

const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (arg) => {
  console.log('Listener called', arg);
});

// loggo un messaggio
logger.log('messaggio di log');
