/*
   Objects - class keyword
   ----------------------------------------------------------
   The following code will define a class with a constructor,
   which will allow for multiple instances of an object. The
   new keyword will create a new instance of the class.

   There is also the class keyword, which is another way of
   creating objects - but follows the object-orientated pattern
   that other language have. You can read about JavaScript
   classes here: https://goo.gl/w2uaQn
*/
// @ts-nocheck
class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class Meccanico extends Person {
  constructor(name, surname) {
    super(name);
    this.surname = surname;
  }
  getName() {
    return this.name + " " + this.surname;
  }
  cambiaRuota() {
    return "Ruota cambiata!";
  }
} 

const me = new Person("Tricia");
const diego = new Meccanico("Diego","Rossi");

console.log(me.getName());
console.log(diego.getName());
