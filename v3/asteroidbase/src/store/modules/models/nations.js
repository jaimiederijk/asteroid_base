import { v4 as uuidv4 } from 'uuid';

class Nation {
  constructor(nation) {
    this.id = uuidv4();
    this.name = nation.name;
    this.type = nation.type;
    this.playerLed = nation.playerLed;
    this.resources = {

    };
    this.population = {
      uneducated: 0,
      educated: 0,
      highlyEducated: 0,
    };
  }

  changeName(newName) {
    this.name = newName;
  }
}

export { Nation as default };
