import GameObject from './gameobject';
import CelestialObject from './celestialobject';
import objectTypes from './objecttypes';

class PlanetarySystem extends GameObject {
  constructor(id, coordinates, settings) {
    super('planetary system', id, 'SYS');
    this.settings = settings;
    this.inSectorCoordinates = coordinates;
    this.systemObjects = [];
    this.populate();
  }

  populate() {
    const { density } = this.settings;
    const densityNumber = Math.floor(Math.random() * density) + 10;

    for (let i = 0; i < densityNumber; i += 1) {
      this.addRandomCelestialObject();
    }

    this.addRandomStar();
  }

  addRandomStar() {
    const chosenObject = objectTypes.getRandomObjectOffType('stars');
    chosenObject.className = objectTypes.stars.className;
    chosenObject.shortName = objectTypes.stars.shortName;
    const star = new CelestialObject(chosenObject);

    this.systemObjects.push(star);
  }

  addRandomCelestialObject() {
    const chosenObject = objectTypes.getRandomObjectOffType('celestialObjects');
    this.addCelestialObject(chosenObject);
  }

  addCelestialObject(objecttype) {
    const newObject = new CelestialObject(objecttype);
    this.systemObjects.push(newObject);
  }
}

export { PlanetarySystem as default };
