/**
 * oggetti.js
 * ------------------------------------------------------------------
 * Raccolta di esempi pratici su oggetti, prototype e classi in
 * JavaScript, con le relative best practices commentate.
 *
 * Eseguibile con: node 5-oggetti.js
 * ------------------------------------------------------------------
 */

// Attiva la modalità strict: evita errori silenziosi (es. variabili
// globali create per errore), vieta costrutti ambigui e rende il
// comportamento del motore JS più prevedibile durante gli esempi.
'use strict';

// ==================================================================
// 1. CREAZIONE DI OGGETTI
//    In JavaScript esistono più modi per creare un oggetto:
//    - il letterale {} è il più usato e leggibile;
//    - new Object() è equivalente a {} ma più verboso, quasi mai usato
//      nella pratica;
//    - Object.create(proto) crea un oggetto vuoto specificando
//      ESPLICITAMENTE quale sarà il suo prototipo, cioè da quale
//      oggetto "eredita" proprietà e metodi (vedremo il prototype
//      in dettaglio più avanti, al punto 7).
// ==================================================================
function esempioCreazione() {
  const letterale = { nome: 'Anna', eta: 30 };

  const conCostruttore = new Object();
  conCostruttore.nome = 'Marco';

  // Object.create({...}) crea un nuovo oggetto che "eredita" il metodo
  // saluta dall'oggetto passato come argomento, senza doverlo ricopiare
  const daClassPoiVedremo = Object.create({ saluta() { return 'ciao'; } }); // prototype esplicito

  console.log('[letterale]', letterale);
  console.log('[Object.create]', daClassPoiVedremo.saluta());
}

// ==================================================================
// 2. ACCESSO, SHORTHAND E COMPUTED PROPERTIES
//    - Shorthand property: se ho già una variabile con lo stesso nome
//      che voglio usare come chiave, posso scrivere solo il nome invece
//      di ripeterlo due volte ({ nome: nome } -> { nome }).
//    - Computed property: permette di usare il VALORE di una variabile
//      come nome della chiave, calcolandolo al momento della creazione
//      dell'oggetto (utile quando la chiave non è nota in anticipo).
//    - Per leggere una proprietà si può usare la dot notation (obj.prop,
//      la più comune) oppure la bracket notation (obj['prop']), che è
//      indispensabile quando il nome della proprietà è dinamico o
//      contiene caratteri speciali (spazi, trattini, ecc.).
// ==================================================================
function esempioAccessoShorthand() {
  const nome = 'Luca';
  const eta = 25;

  // Shorthand: se la variabile ha lo stesso nome della proprietà
  const persona = { nome, eta };
  console.log('[shorthand]', persona);

  // Computed property: la chiave è calcolata dinamicamente
  const chiave = 'ruolo';
  const dipendente = { [chiave]: 'sviluppatore' };
  console.log('[computed]', dipendente);

  // Accesso con dot notation e bracket notation
  console.log('[dot]', persona.nome);
  console.log('[bracket]', persona['eta']); // utile quando la chiave è dinamica
}

// ==================================================================
// 3. METODI, THIS E SHORTHAND METHODS
//    this si riferisce all'oggetto su cui il metodo è chiamato,
//    NON a dove il metodo è definito. Le arrow function non hanno
//    un proprio this: ereditano quello dello scope esterno.
//
//    Questo è uno dei concetti più fraintesi di JavaScript: il valore
//    di "this" non dipende da DOVE la funzione è scritta, ma da COME
//    viene chiamata. Se chiamo obj.metodo(), this è obj. Se estraggo
//    quel metodo in una variabile e la chiamo da sola, this si perde
//    (in strict mode diventa undefined, causando errori a runtime).
//    Le arrow function, invece, non creano un proprio "this": lo
//    ereditano lessicalmente dal contesto in cui sono state definite,
//    per questo NON vanno usate come metodi quando serve accedere
//    alle proprietà dell'oggetto tramite this.
// ==================================================================
function esempioThis() {
  const contatore = {
    valore: 0,
    incrementa() {          // shorthand method
      this.valore++;
      return this.valore;
    },
    incrementaSbagliato: () => {
      // MALE: this qui NON è contatore, ma quello dello scope esterno
      // this.valore++; // -> errore o comportamento inatteso
    },
  };

  console.log('[metodo]', contatore.incrementa()); // 1
  console.log('[metodo]', contatore.incrementa()); // 2

  // ATTENZIONE: estrarre il metodo perde il legame con "this"
  // fnEstratta è solo un riferimento alla funzione, non "ricorda" più
  // che apparteneva a contatore: chiamandola da sola, this è undefined
  const fnEstratta = contatore.incrementa;
  try {
    fnEstratta();
  } catch (e) {
    console.log('[this perso]', e.message);
  }

  // Soluzione: bind crea una NUOVA funzione con this "agganciato" in modo
  // permanente a contatore, indipendentemente da come verrà poi chiamata.
  // In alternativa, si può sempre invocare il metodo nella sua forma
  // originale: contatore.incrementa().
  const fnConBind = contatore.incrementa.bind(contatore);
  console.log('[bind]', fnConBind()); // 3
}

// ==================================================================
// 4. COPIA, MERGE E IMMUTABILITÀ
//    L'assegnazione copia solo il riferimento: due variabili puntano
//    allo stesso oggetto.
//
//    Gli oggetti in JavaScript sono passati "by reference": quando si
//    assegna un oggetto a una nuova variabile, non si crea una copia
//    dei dati, ma si copia solo l'indirizzo di memoria che punta allo
//    stesso oggetto. Modificando una qualsiasi delle due variabili, si
//    modifica l'unico oggetto condiviso. Per ottenere una copia
//    indipendente serve un'operazione esplicita (spread, Object.assign,
//    structuredClone, ecc.).
// ==================================================================
function esempioCopiaMerge() {
  const originale = { a: 1, b: 2 };
  const riferimento = originale;
  riferimento.a = 99;
  console.log('[riferimento condiviso]', originale); // { a: 99, b: 2 } <- anche originale cambia!

  // Copia shallow (superficiale): lo spread operator {...obj} crea un
  // NUOVO oggetto copiando le proprietà di primo livello. Da qui in poi
  // modificare "copia" non tocca più "originale".
  const copia = { ...originale };
  copia.a = 1;
  console.log('[copia shallow]', originale, copia); // originale invariato

  // Merge: unendo più oggetti con lo spread, le proprietà degli oggetti
  // successivi sovrascrivono quelle con lo stesso nome degli oggetti
  // precedenti (l'ordine in cui vengono "spalmati" conta).
  const merged = { ...{ a: 1, b: 2 }, ...{ b: 20, c: 3 } };
  console.log('[merge]', merged); // { a: 1, b: 20, c: 3 }

  // Object.freeze: rende l'oggetto immutabile, ma SOLO a livello
  // superficiale (shallow): impedisce di aggiungere, rimuovere o
  // modificare le proprietà dirette dell'oggetto, ma NON quelle di
  // eventuali oggetti annidati al suo interno.
  // In strict mode assegnare una proprietà congelata lancia un TypeError
  // (in sloppy mode verrebbe invece ignorato silenziosamente, senza
  // dare alcun segnale che l'assegnazione non è andata a buon fine).
  const congelato = Object.freeze({ x: 1, nested: { y: 2 } });
  try {
    // @ts-expect-error - assegnazione volutamente vietata, serve a dimostrare il TypeError a runtime
    congelato.x = 100;
  } catch (e) {
    console.log('[freeze]', e.message);
  }
  congelato.nested.y = 100; // FUNZIONA: freeze è shallow, i nested non sono protetti
  console.log('[freeze shallow]', congelato);
}

// ==================================================================
// 5. DESTRUCTURING DI OGGETTI
//    Il destructuring permette di "estrarre" più proprietà da un
//    oggetto in un'unica istruzione, assegnandole a variabili con lo
//    stesso nome della proprietà (o con un nome diverso, a scelta).
//    È molto usato per evitare di scrivere ripetutamente
//    "const x = obj.x" per ogni singola proprietà che serve.
// ==================================================================
function esempioDestructuring() {
  const persona = { nome: 'Bea', eta: 28, citta: 'Roma' };

  // Estrae "nome" ed "eta" in due variabili con lo stesso nome della proprietà
  const { nome, eta } = persona;
  console.log('[destructuring base]', nome, eta);

  // Rinominare la variabile risultante: utile per evitare conflitti di nomi
  // o per dare un nome più significativo nel contesto in cui viene usata
  const { nome: nomeRinominato } = persona;
  console.log('[rinominato]', nomeRinominato);

  // Valore di default: usato SOLO se la proprietà non esiste (o è undefined)
  // sull'oggetto di partenza; se "persona" non ha "paese", si usa 'Italia'
  const { paese = 'Italia' } = persona; // default se la proprietà non esiste
  console.log('[default]', paese);

  // Rest pattern (...resto): raccoglie in un nuovo oggetto tutte le
  // proprietà NON esplicitamente destrutturate prima di esso
  const { nome: n2, ...resto } = persona; // rest: raccoglie le proprietà rimanenti
  console.log('[rest]', resto);
}

// ==================================================================
// 6. ITERAZIONE SU OGGETTI
//    A differenza degli array, gli oggetti non sono direttamente
//    iterabili con for...of: servono metodi dedicati.
//    - for...in scorre tutte le chiavi enumerabili dell'oggetto (incluse
//      quelle ereditate dal prototype, motivo per cui va usato con
//      cautela);
//    - Object.keys/values/entries restituiscono rispettivamente un array
//      di chiavi, di valori, o di coppie [chiave, valore], considerando
//      SOLO le proprietà dirette dell'oggetto (non quelle ereditate);
//    - combinando Object.entries con for...of si ottiene il modo più
//      chiaro e sicuro per iterare chiave e valore insieme.
// ==================================================================
function esempioIterazione() {
  const auto = { marca: 'Fiat', modello: 'Panda', anno: 2020 };

  for (const chiave in auto) {
    console.log('[for...in]', chiave, '->', auto[chiave]);
  }

  console.log('[keys]', Object.keys(auto));
  console.log('[values]', Object.values(auto));
  console.log('[entries]', Object.entries(auto));

  // entries + for...of: il modo più pulito per iterare chiave/valore
  for (const [chiave, valore] of Object.entries(auto)) {
    console.log('[entries loop]', chiave, valore);
  }
}

// ==================================================================
// 7. PROTOTYPE: la base dell'ereditarietà in JavaScript
//    Ogni oggetto ha un prototipo interno (accessibile con
//    Object.getPrototypeOf) da cui eredita proprietà e metodi.
//
//    A differenza di linguaggi come Java o C#, JavaScript non ha
//    "classi" nel senso classico: l'ereditarietà si basa su una catena
//    di oggetti collegati tra loro (prototype chain). Quando si accede
//    a una proprietà che un oggetto non possiede direttamente, il motore
//    JS la cerca automaticamente nel suo prototipo, poi nel prototipo
//    del prototipo, e così via, fino a raggiungere Object.prototype
//    (la radice di quasi tutte le catene) e infine null.
//    Le "funzioni costruttore" (Animale, Cane) sono il modo in cui,
//    prima dell'introduzione delle classi (ES6), si simulava la
//    creazione di "istanze" con un prototipo condiviso.
// ==================================================================
function esempioPrototype() {
  // Funzione costruttore "old style" (pre-ES6): per convenzione si scrive
  // con la maiuscola iniziale e va invocata con "new", che crea un nuovo
  // oggetto, lo lega a "this" dentro la funzione e lo restituisce
  function Animale(nome) {
    this.nome = nome;
  }

  // I metodi vanno sul prototype, non nel costruttore, per essere
  // condivisi da tutte le istanze invece di essere ricreati ogni volta.
  // Se il metodo fosse definito dentro il costruttore (this.saluta = ...),
  // ogni singola istanza si porterebbe dietro una COPIA della funzione,
  // sprecando memoria; mettendolo sul prototype, invece, tutte le
  // istanze condividono la STESSA funzione in memoria.
  Animale.prototype.saluta = function () {
    return `Ciao, sono ${this.nome}`;
  };

  const cane = new Animale('Fido');
  const gatto = new Animale('Micio');

  console.log('[prototype method]', cane.saluta());
  console.log('[metodo condiviso]', cane.saluta === gatto.saluta); // true: stessa funzione in memoria

  // Catena dei prototipi: cane -> Animale.prototype -> Object.prototype -> null
  // instanceof verifica se il prototipo di Animale si trova nella catena
  // di prototipi dell'oggetto "cane"
  console.log('[instanceof]', cane instanceof Animale); // true
  console.log('[getPrototypeOf]', Object.getPrototypeOf(cane) === Animale.prototype); // true

  // Ereditarietà "manuale" tramite prototype (come funzionava prima delle classi):
  // per far ereditare Cane da Animale servono TRE passaggi espliciti,
  // che le classi (punto 8) nascondono dietro una sintassi più semplice.
  function Cane(nome, razza) {
    // 1. richiama il costruttore "padre" passandogli il "this" di Cane,
    //    così Animale può inizializzare this.nome come farebbe da solo
    Animale.call(this, nome);
    this.razza = razza;
  }
  // 2. il prototipo di Cane diventa un oggetto che eredita da
  //    Animale.prototype, così le istanze di Cane hanno accesso anche
  //    ai metodi definiti su Animale (come saluta)
  Cane.prototype = Object.create(Animale.prototype); // eredita i metodi
  // 3. ripristina il riferimento al costruttore corretto, che il passaggio
  //    precedente avrebbe altrimenti sovrascritto con quello di Animale
  Cane.prototype.constructor = Cane;
  Cane.prototype.abbaia = function () {
    return `${this.nome} fa: Bau!`;
  };

  const fido2 = new Cane('Rex', 'Labrador');
  console.log('[ereditarietà via prototype]', fido2.saluta(), '|', fido2.abbaia());
}

// ==================================================================
// 8. CLASSI: zucchero sintattico sopra il prototype
//    Le classi in JS non introducono un nuovo modello: sotto il
//    cofano usano ancora prototype e catena di ereditarietà.
//
//    "Zucchero sintattico" significa che la sintassi "class" è solo un
//    modo più leggibile e familiare (specie per chi viene da altri
//    linguaggi) di scrivere ESATTAMENTE lo stesso meccanismo visto al
//    punto 7: costruttore + metodi sul prototype + catena di eredità.
//    In più, le classi aggiungono alcune funzionalità moderne comode
//    come i campi privati (#), i getter/setter, e i membri static.
// ==================================================================
class Animale2 {
  // Campo privato: il simbolo # lo rende accessibile SOLO dall'interno
  // della classe stessa. Tentare di leggerlo o scriverlo dall'esterno
  // (es. rex.#vite) causa un errore di sintassi, non semplicemente
  // undefined: è una vera incapsulazione, non una convenzione.
  #vite;

  // Proprietà statica: appartiene alla CLASSE stessa, non alle singole
  // istanze. Si accede con Animale2.regno, mai con istanza.regno.
  // Utile per costanti o dati condivisi da tutte le istanze.
  static regno = 'Animalia';

  constructor(nome) {
    this.nome = nome;
    this.#vite = 1;
  }

  saluta() {
    return `Ciao, sono ${this.nome}`;
  }

  // Getter: permette di "leggere" #vite come se fosse una proprietà
  // normale (animale.vite), pur essendo in realtà l'esecuzione di un
  // metodo. Utile per esporre in lettura un campo privato.
  get vite() {
    return this.#vite;
  }

  // Setter: intercetta ogni assegnazione (animale.vite = 5) permettendo
  // di validare il nuovo valore PRIMA di accettarlo, evitando che lo
  // stato interno dell'oggetto diventi incoerente.
  set vite(valore) {
    if (valore < 0) throw new Error('le vite non possono essere negative');
    this.#vite = valore;
  }

  // Metodo statico: si chiama sulla classe (Animale2.descrizioneRegno()),
  // non sulla singola istanza. Utile per funzionalità legate al concetto
  // generale di "Animale2" piuttosto che a uno specifico animale.
  static descrizioneRegno() {
    return `Regno: ${Animale2.regno}`;
  }
}

// "extends" stabilisce che Cane2 eredita da Animale2: tutte le istanze
// di Cane2 avranno accesso anche ai metodi e alle proprietà di Animale2,
// esattamente come nella catena di prototipi vista manualmente al punto 7,
// ma con una sintassi molto più concisa e leggibile.
class Cane2 extends Animale2 {
  constructor(nome, razza) {
    // super(...) richiama il costruttore della classe padre (Animale2):
    // è OBBLIGATORIO chiamarlo prima di poter usare "this" nel costruttore
    // di una classe figlia, perché è super() a creare effettivamente
    // l'istanza e a inizializzarne le proprietà ereditate.
    super(nome);
    this.razza = razza;
  }

  abbaia() {
    return `${this.nome} (${this.razza}) fa: Bau!`;
  }

  // Override: ridefinisce un metodo già presente nella classe padre.
  // Quando si chiama rex.saluta(), viene eseguita QUESTA versione,
  // non quella di Animale2, perché la ricerca del metodo parte dalla
  // classe più specifica (Cane2) e risale la catena solo se necessario.
  saluta() {
    // super.saluta() permette comunque di richiamare esplicitamente la
    // versione del metodo definita nella classe padre, per riutilizzarne
    // la logica invece di riscriverla da capo
    return `${super.saluta()}, sono un cane`;
  }
}

function esempioClassi() {
  const animale = new Animale2('Generico');
  console.log('[classe base]', animale.saluta());
  console.log('[campo privato via getter]', animale.vite);

  animale.vite = 5;
  console.log('[setter]', animale.vite);
  try {
    animale.vite = -1; // lancia errore per via della validazione nel setter
  } catch (e) {
    console.log('[setter validazione]', e.message);
  }

  console.log('[statico]', Animale2.descrizioneRegno());

  const rex = new Cane2('Rex', 'Labrador');
  console.log('[ereditarietà]', rex.saluta());
  console.log('[metodo figlio]', rex.abbaia());
  // instanceof restituisce true per ENTRAMBE le classi, perché Cane2
  // eredita da Animale2: rex è sia un Cane2 sia, indirettamente, un Animale2
  console.log('[instanceof]', rex instanceof Cane2, rex instanceof Animale2); // true, true

  // ATTENZIONE: il campo privato #vite non è accessibile dall'esterno,
  // nemmeno da una sottoclasse come Cane2: la privacy dei campi con #
  // è limitata rigorosamente alla classe in cui sono dichiarati
  // console.log(rex.#vite); // SyntaxError se scritto fuori dalla classe
}

// ==================================================================
// Runner: esegue gli esempi in sequenza
//    Ogni funzione esempioXxx() è indipendente dalle altre: per
//    concentrarsi su un singolo argomento alla volta, basta commentare
//    (o scommentare) le righe corrispondenti qui sotto.
// ==================================================================
function main() {
  // esempioCreazione();
  esempioAccessoShorthand();
  // esempioThis();
  // esempioCopiaMerge();
  // esempioDestructuring();
  // esempioIterazione();
  // esempioPrototype();
  // esempioClassi();
  console.log('\nFatto.');
}

main();
