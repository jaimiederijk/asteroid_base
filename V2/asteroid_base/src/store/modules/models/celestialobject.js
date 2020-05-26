import { v4 as uuidv4 } from 'uuid';
import GameObject from './gameobject';
import objectTypes from './objecttypes';

class CelestialObject extends GameObject {
  constructor(objecttype) {
    super(objecttype.className, uuidv4());
    this.systemCoordinates = this.resolveSystemCoordinates();
    this.color = objecttype.color;
    this.characteristics = {
      integrity: Math.floor(Math.random() * 60) + 20,
    };
  }

  resolveSystemCoordinates() {
    let coordinates = {};
    if (this.type !== 'star') {
      coordinates = this.constructor.randomSystemCoordinates();
    } else {
      const center = objectTypes.system.size / 2;
      coordinates.x = center;
      coordinates.y = center;
    }
    return coordinates;
  }

  static randomSystemCoordinates() {
    const chosenCoordinates = { x: 0, y: 0 };

    function randomCoordinate() {
      return Math.floor(Math.random() * objectTypes.system.size);
    }
    const x = randomCoordinate();
    const y = randomCoordinate();
    chosenCoordinates.x = x;
    chosenCoordinates.y = y;

    return chosenCoordinates;
  }
}

export { CelestialObject as default };
