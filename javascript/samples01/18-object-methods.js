/*
   Objects - methods
   ----------------------------------------------------------
   It is possible to define functions within object, which can
   then make the object act like a class. It is normal to call
   functions within an object 'methods'. Using the this keyword
   within a method will reference the parent object. The
   following example will only let you create a single instance
   of Person.
*/
// @ts-nocheck
const Person = {
  name: "",
  setName(value) {
    this.name = value;
  }
}
const me = Person;
me.setName("Tricia");
console.log(me.name)
