// old delete
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

  static checkIfObjectIsNear(listOfObject, theObject, collisionRadius) {
    const li = listOfObject;
    const ob = theObject;
    const colRad = collisionRadius;

    const checkCollision = (p1x, p1y, r1, p2x, p2y, r2) => (
      (r1 + r2) ** 2 > (p1x - p2x) ** 2 + (p1y - p2y) ** 2
    );

    for (let i = 0; i < li.length; i += 1) {
      if (checkCollision(li[i].coordinates.x, li[i].coordinates.y, colRad, ob.x, ob.y, colRad)) {
        return true; // object is near
      }
    }
    return false; // object is not near anything
  }

  resolveCoordinates(settings) {
    const radius = settings.maxRadius * settings.systemsAdded.y;

    let x = 0;// Math.cos(angle) * radius;
    let y = 0;// Math.sin(angle) * radius;
    const center = settings.starMapSize / 2;
    const v = settings.systemsAdded.y;
    const collisionRadius = settings.maxRadius / 4;
    this.systemsAddedV = v;

    do {
      const angle = Math.random() * Math.PI * 2;
      console.log(radius);
      if (settings.systemsAdded.x === 0) {
        // set center
        x = center;
        y = center;
      } else {
        x = center + Math.cos(angle) * radius;
        y = center + Math.sin(angle) * radius;
      }
    } while (this.constructor.checkIfObjectIsNear(settings.starMap, { x, y }, collisionRadius));
    // const { sqrt } = settings;
    // const mainDevider = Math.floor(settings.starMapSize / sqrt);
    //
    // const x = Math.floor(Math.random() * mainDevider + (settings.systemsAdded.x * mainDevider));
    // const y = Math.floor(Math.random() * mainDevider + (settings.systemsAdded.y * mainDevider));
    //
    this.coordinates = { x, y };
  }

  addRandomStar() {
    const chosenObject = this.constructor.getRandomObjectOffType(objectTypes.stars.subTypes);
    chosenObject.className = objectTypes.stars.className;
    chosenObject.shortName = objectTypes.stars.shortName;
    const star = new CelestialObject(chosenObject);
    this.systemObjects.push(star);
  }

  addRandomCelestialObject() {
    const chosenObject = this.constructor.getRandomObjectOffType(objectTypes.celestialObjects.subTypes);
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
    modifiedSettings.systemsAdded = { x: 0, y: 1 };
    modifiedSettings.sqrt = Math.floor(Math.sqrt(modifiedSettings.systemAmount));
    modifiedSettings.maxRadius = Math.floor(modifiedSettings.starMapSize / modifiedSettings.sqrt);
    modifiedSettings.starMap = starMap;

    for (let i = 0; i < modifiedSettings.systemAmount; i += 1) {
      if (modifiedSettings.systemsAdded.x === (
        modifiedSettings.systemsAdded.y * modifiedSettings.systemsAdded.y + 3)) {
        modifiedSettings.systemsAdded.y += 1;
      }
      starMap.push(new System(modifiedSettings, uuidv4()));
      modifiedSettings.systemsAdded.x += 1;
    }
    return starMap;
  },
};

export { systemGenerator as default };
