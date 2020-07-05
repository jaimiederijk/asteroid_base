import { v4 as uuidv4 } from 'uuid';
import GameObject from './gameobject';
import CelestialObject from './celestialobject';
import objectTypes from './objecttypes';

class System extends GameObject {
  constructor(settings, id) {
    super('system', id, 'SYS');
    this.systemObjects = [];
    this.init(settings);
  }

  init(settings) {
    this.resolveCoordinates(settings);
  }

  populate(density) {
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

  resolveCoordinates(settings) {
    const { sqrt } = settings;
    const mainDevider = Math.floor(settings.starMapSize / sqrt);

    const x = Math.floor(Math.random() * mainDevider + (settings.systemsAdded.x * mainDevider));
    const y = Math.floor(Math.random() * mainDevider + (settings.systemsAdded.y * mainDevider));

    this.starMapCoordinates = { x, y };
  }

  addRandomStar() {
    const chosenObject = this.constructor.getRandomObjectOffType(objectTypes.stars);
    chosenObject.className = objectTypes.stars.className;
    chosenObject.shortName = objectTypes.stars.shortName;
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
  generateNewSystem: (settings, id) => {
    const newSystem = new System(settings, id);
    return newSystem;
  },
  generateStarMap: (settings) => {
    const starMap = [];
    const modifiedSettings = settings;
    modifiedSettings.systemsAdded = { x: 0, y: 0 };
    modifiedSettings.sqrt = Math.floor(Math.sqrt(modifiedSettings.systemAmount));

    for (let i = 0; i < modifiedSettings.systemAmount; i += 1) {
      modifiedSettings.systemsAdded.x += 1;
      if (modifiedSettings.systemsAdded.x === modifiedSettings.sqrt) {
        modifiedSettings.systemsAdded.x = 1;
        modifiedSettings.systemsAdded.y += 1;
      }
      starMap.push(new System(modifiedSettings, uuidv4()));
    }
    return starMap;
  },
};

export { systemGenerator as default };
