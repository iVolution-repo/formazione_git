// Descrizione: il modulo fs permette di lavorare a stretto contatto con il
// filesystem della macchina (copia, rinominazione, cancellazione, lettura e
// scrittura di file e cartelle). Tutte le funzioni disponibili nel modulo fs
// possono essere sync o asincrone (es. fs.access()).

const fs = require('fs');

// lettura asincrona di una directory
fs.readdir('./', function (err, files) {
  if (err) console.log('Error', err);
  else console.log('Result', files);
});

// scrittura di un file
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

try {
  const data2 = fs.readFileSync('./message.txt', { encoding: 'utf8', flag: 'r' });
  console.log('input2.txt content:', data2);
} catch (err) {
  console.error('Error reading input2.txt:', err);
}
