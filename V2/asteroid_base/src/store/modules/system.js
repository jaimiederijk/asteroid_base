import GameObject from './gameobject';
import CelestialObject from './celestialobject';
import objectTypes from './objecttypes';

class System extends GameObject {
  constructor(settings) {
    super('system');
    this.systemObjects = [];
    this.init(settings.density);
  }

  init(density) {
    console.log(density);
    this.addRandomStar();
    const densityNumber = Math.floor(Math.random() * density) + 10;
    for (let i = 0; i < densityNumber; i += 1) {
      this.addRandomCelestialObject();
    }
  }

  static getRandomObjectOffType(objectList) {
    const objectTypesAmount = objectList.subTypes.length;
    const objectTypeIndex = Math.floor(Math.random() * objectTypesAmount);
    const chosenObject = objectList.subTypes[objectTypeIndex];

    return chosenObject;
  }

  addRandomStar() {
    const chosenObject = this.constructor.getRandomObjectOffType(objectTypes.stars);
    chosenObject.className = 'star';
    const star = new CelestialObject(chosenObject);
    this.systemObjects.push(star);
  }

  addRandomCelestialObject() {
    const chosenObject = this.constructor.getRandomObjectOffType(objectTypes.celestialObjects);
    this.addCelestialObject(chosenObject);
  }

  addCelestialObject(objecttype) {
    const newObject = new CelestialObject(objecttype);
    this.systemObjects.push(newObject);
  }
}

const systemGenerator = {
  generateNewSystem: (settings) => {
    const newSystem = new System(settings);
    return newSystem;
  },
};

export { systemGenerator as default };
