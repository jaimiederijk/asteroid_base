import { v4 as uuidv4 } from 'uuid';
import GameObject from './gameobject';
import objectTypes from './objecttypes';

class CelestialObject2 extends GameObject {
  constructor(obj) {
    super(obj.className, uuidv4(), obj.shortName, 'CelestialObject');
    // this.inSystemCoordinates = obj.inSystemCoordinates;
    this.color = obj.color;
    this.characteristics = {
      mass: 1,
      integrity: Math.floor(Math.random() * 60) + 20,
    };
    this.resources = this.resolveResources();
    this.orbit = obj.orbit;
  }

  resolveResources() {
    const resources = [];
    const amountOfResources = Math.floor(Math.random() * objectTypes.resources.raw.length);
    const availableResources = objectTypes.resources.raw.filter((resource) => resource.type !== 'misc');
    let availableMass = this.characteristics.mass;

    do {
      let resourceAssign = {};
      const i = Math.floor(Math.random() * availableResources.length);
      resourceAssign = availableResources[i];
      if (!resources.some((res) => res.name === resourceAssign.name)) {
        resourceAssign.mass = Math.floor(Math.random() * availableMass);
        availableMass -= resourceAssign.mass;
        resources.push(resourceAssign);
      }
    } while (resources.length < amountOfResources);

    return resources;
  }
}

export { CelestialObject2 as default };
