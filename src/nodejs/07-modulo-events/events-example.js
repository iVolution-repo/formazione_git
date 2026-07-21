// Descrizione: esempio base della classe EventEmitter (Class: EventEmitter).
// Convenzione: i nomi delle classi iniziano con lettera maiuscola. Il
// listener deve essere registrato prima che l'evento avvenga.

const EventEmitter = require('events');
const emitter = new EventEmitter();

// il listener deve essere registrato prima che l'evento avvenga
emitter.on('messageLogged', function () {
  console.log('listener called');
});

// "emettiamo" il verificarsi di un evento
setTimeout(() => {
  emitter.emit('messageLogged');
}, 3000);
