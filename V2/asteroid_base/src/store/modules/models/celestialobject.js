import { v4 as uuidv4 } from 'uuid';
import GameObject from './gameobject';
import objectTypes from './objecttypes';

class CelestialObject extends GameObject {
  constructor(objectType) {
    super(objectType.className, uuidv4(), objectType.shortName);
    this.systemCoordinates = this.resolveSystemCoordinates();
    this.color = objectType.color;
    this.shortName = objectType.shortName;


    // console.log(GameObject.getRandomInt(powmin, powmax));
    this.characteristics = {
      mass: this.resolveMass(objectType),
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

  resolveMass(objectType) {
    let mass = 0;
    if (this.type === 'star') {
      const [solarMin, solarMax] = objectType.characteristics.massRange;
      mass = GameObject.getRandomNumber(solarMin, solarMax, 100);
    } else {
      const [min, max, powmin, powmax] = objectType.characteristics.massRange;
      mass = CelestialObject.getRandomMass(min, max, powmin, powmax);
    }
    return mass;
  }
  // resolveIntegrity() {
  //
  // }

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

  static getRandomMass(min, max, powmin, powmax) {
    const number = GameObject.getRandomNumber(min, max, 10);
    const power = GameObject.getRandomNumber(powmin, powmax, 1);

    return Math.floor(number * 10 ** power);
  }
}

export { CelestialObject as default };
