import { v4 as uuidv4 } from 'uuid';

class Character {
  constructor(character) {
    this.id = uuidv4();
    this.firstName = character.firstName;
    this.lastName = character.lastName;
    this.age = character.age;
    this.job = character.job;
  }

  textFunction() {
    console.log(this.firstName);
  }

  changeLastName(newlastname) {
    this.lastName = newlastname;
  }
}

export { Character as default };
