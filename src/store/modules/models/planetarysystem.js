import GameObject from './gameobject';
import CelestialObject from './celestialobject';
import objectTypes from './objecttypes';

class PlanetarySystem extends GameObject {
  constructor(id, coordinates, settings) {
    super('planetary system', id, 'SYS', 'PlanetarySystem');
    this.settings = settings;
    this.inSectorCoordinates = coordinates;
    this.systemObjectsData = {};
    this.systemObjectsList = [];
    this.systemCenter = {};
    this.populate();
  }

  populate() {
    const { density } = this.settings;
    const densityNumber = Math.floor(Math.random() * density) + 10;

    for (let i = 0; i < densityNumber; i += 1) {
      this.addRandomCelestialObject();
    }

    this.settings.systemSize = objectTypes.system.size;
    this.addRandomStar();
  }

  addRandomStar() {
    const chosenObject = objectTypes.getRandomObjectOffType('stars');
    chosenObject.className = objectTypes.stars.className;
    chosenObject.shortName = objectTypes.stars.shortName;
    const newObject = new CelestialObject(chosenObject);
    this.systemCenter = { color: newObject.color, ids: [newObject.id] };
    this.addCelestialObject(newObject);
  }

  addRandomCelestialObject() {
    const chosenObjectShortName = objectTypes.getRandomObjectFromList(objectTypes.weightedCOList);
    const chosenObject = objectTypes.celestialObjects.subTypes.find(
      (subtype) => subtype.shortName === chosenObjectShortName,
    );
    this.addCelestialObject(new CelestialObject(chosenObject));
  }

  addCelestialObject(newObject) {
    this.systemObjectsData[newObject.id] = newObject;
    this.systemObjectsList.push(newObject.id);
  }
}

export { PlanetarySystem as default };
