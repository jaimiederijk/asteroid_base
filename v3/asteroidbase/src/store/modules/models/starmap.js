import { v4 as uuidv4 } from 'uuid';
import GameObject from './gameobject';
import PlanetarySystem from './planetarysystem';
// import CelestialObject from './celestialobject';
// import objectTypes from './objecttypes';

class StarMap extends GameObject {
  constructor(settings, id) {
    super('starmap', id, 'MAP');
    this.settings = settings;
    this.systems = [];
    this.sectors = this.populateSectors();
  }

  static distributeOverArea(bounds, amount) {
    const arrayOfDistro = [];
    const borderClearance = {
      width: Math.round(bounds.width * 0.1),
      height: Math.round(bounds.height * 0.1),
    };
    const smallerBounds = {
      lowWidth: borderClearance.width,
      highWidth: bounds.width - borderClearance.width,
      lowHeigth: borderClearance.height,
      highHeight: bounds.height - borderClearance.height,
    };
    const collisionRadius = Math.round(bounds.width * 0.15);

    // initial placed object
    const objectToBePlaced = {
      x: GameObject.getRandomNumber(smallerBounds.lowWidth, smallerBounds.highWidth, 1),
      y: GameObject.getRandomNumber(smallerBounds.lowHeigth, smallerBounds.highHeight, 1),
    };

    arrayOfDistro.push(objectToBePlaced);

    // add random coordinates that dont collide with eachother
    for (let i = 0; i < amount - 1; i += 1) {
      let newObjCoordinates = { x: 100, y: 100 };
      do {
        newObjCoordinates = {
          x: GameObject.getRandomNumber(smallerBounds.lowWidth, smallerBounds.highWidth, 1),
          y: GameObject.getRandomNumber(smallerBounds.lowHeigth, smallerBounds.highHeight, 1),
        };
      } while (GameObject.checkIfObjectIsNear(arrayOfDistro, newObjCoordinates, collisionRadius));
      arrayOfDistro.push(newObjCoordinates);
    }

    return arrayOfDistro;
  }

  // create sector put it in array
  //  sector contains (id, array with systems that are in sector, gridcordinates
  populateSectors() {
    console.log('pop sector');
    const sectors = [];
    const systems = [];
    const sectorsGridSize = Math.sqrt(this.settings.sectorAmount);
    const { sectorSize } = this.settings;
    const { distributeOverArea } = this.constructor;
    console.log(sectorsGridSize);

    const createSystems = (systemIds, settings) => {
      const systemsInSector = [];
      const coordinatesPile = distributeOverArea(sectorSize, systemIds.length);
      for (let i = 0; i < systemIds.length; i += 1) {
        const system = new PlanetarySystem(systemIds[i], coordinatesPile.pop(), settings);
        systemsInSector.push(system);
      }

      systems.push(...systemsInSector);
    };

    const createSector = (x, y, density) => {
      const systemAmount = 3 + Math.round(Math.random() * density);

      const sector = {
        id: uuidv4(),
        systems: [],
        coordinates: { col: x, row: y },
      };
      // populate sector with systems
      for (let j = 0; j < systemAmount; j += 1) {
        sector.systems.push(uuidv4());
      }

      createSystems(sector.systems, this.settings);

      return sector;
    };

    for (let y = 0; y < sectorsGridSize; y += 1) {
      for (let x = 0; x < sectorsGridSize; x += 1) {
        sectors.push(createSector(x, y, this.settings.density));
      }
    }

    this.systems.push(...systems);

    return sectors;
  }
}

const starMap = {
  generateStarMap: (settings) => {
    // settings { sectorAmount, density, sectorSize}
    function validateSettings() {
      const validatedSettings = settings;
      validatedSettings.sectorAmount = 100;
      validatedSettings.density = 6;
      validatedSettings.sectorSize = { width: 500, height: 1000 };
      validatedSettings.sectorAmountRoot = 100;

      const root = Math.sqrt(validatedSettings.sectorAmount);

      // sector amount root is not integer
      if (!Number.isInteger(root)) {
        validatedSettings.sectorAmount = Math.round(root) ** 2;
      }
      validatedSettings.sectorAmountRoot = Math.sqrt(validatedSettings.sectorAmount);

      return validatedSettings;
    }

    const validatedSettings = validateSettings(settings);

    const map = new StarMap(validatedSettings, 'loss_region');

    return map;
  },
};

export { starMap as default };
