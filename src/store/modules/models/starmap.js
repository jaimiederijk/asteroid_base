import { v4 as uuidv4 } from 'uuid';
import GameObject from './gameobject';
import PlanetarySystem from './planetarysystem';
// import CelestialObject from './celestialobject';
// import objectTypes from './objecttypes';

class StarMap extends GameObject {
  constructor(settings, id) {
    super('starmap', id, 'MAP', 'StarMap');
    this.settings = settings;
    this.systemsList = [];
    this.systemsData = {};
    this.sectorsList = [];
    this.sectorsData = {};
    this.systemObjectsData = {};

    this.init();
  }

  init() {
    this.populateSectors();
    this.createSectorLinks();
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
    const sectorsList = [];
    const sectorsData = {};
    const systemsList = [];
    const systemsData = {};
    const systemObjectsData = {};
    const sectorsGridSize = Math.sqrt(this.settings.sectorAmount);
    const { sectorSize } = this.settings;
    const { distributeOverArea } = this.constructor;

    const createSystems = (systemIds, settings, sectorId) => {
      const systemsInSectorById = {};
      const coordinatesPile = distributeOverArea(sectorSize, systemIds.length);
      for (let i = 0; i < systemIds.length; i += 1) {
        const system = new PlanetarySystem(systemIds[i], coordinatesPile.pop(), settings, sectorId);
        // pull systemobjects out and add to large list with all objects
        Object.assign(systemObjectsData, system.systemObjectsData);
        delete system.systemObjectsData;
        systemsList.push(system.id);
        systemsInSectorById[system.id] = system;
      }
      Object.assign(systemsData, systemsInSectorById);
    };

    const createInternalLinks = (systems) => {
      const internalSystemLinks = [];

      systems.forEach((aId) => {
        systems.forEach((bId) => {
          if (!(aId === bId)) { // aid is not same as bid
            const arr = [aId, bId].sort();
            if (internalSystemLinks.length === 0) {
              internalSystemLinks.push(arr);
            } else {
              let dupFound = true;
              // find duplicates
              for (let index = 0; index < internalSystemLinks.length; index += 1) {
                const element = internalSystemLinks[index];
                if (element.every((e) => arr.includes(e))) {
                  dupFound = true;
                  break;
                } else {
                  dupFound = false;
                }
              }
              if (!dupFound) {
                internalSystemLinks.push(arr);
              }
            }
          }
        });
      });

      internalSystemLinks.sort(); // makes it easier to check manualy
      return internalSystemLinks;
    };

    const createSector = (x, y, density) => {
      const systemAmount = 3 + Math.round(Math.random() * density);

      const sector = {
        id: uuidv4(),
        systems: [],
        coordinates: { col: x, row: y },
        internalSystemLinks: [],
      };
      // populate sector with systems
      for (let j = 0; j < systemAmount; j += 1) {
        sector.systems.push(uuidv4());
      }

      sector.internalSystemLinks = createInternalLinks(sector.systems);

      createSystems(sector.systems, this.settings, sector.id);

      return sector;
    };

    for (let y = 0; y < sectorsGridSize; y += 1) {
      for (let x = 0; x < sectorsGridSize; x += 1) {
        const sector = createSector(x, y, this.settings.density);
        sectorsList.push(sector.id);
        sectorsData[sector.id] = sector;
      }
    }

    this.systemObjectsData = { ...this.systemObjectsData, ...systemObjectsData };
    this.systemsData = { ...this.systemsData, ...systemsData };
    this.sectorsList.push(...sectorsList);
    this.systemsList.push(...systemsList);
    this.sectorsData = { ...this.sectorsData, ...sectorsData };
  }

  // create connection between two sectors by finding two specific planatary systems in diffrent
  // sectors and linking them
  createSectorLinks() {
    const sectorAmountRoot = this.settings.sectorAmountRoot - 1;

    const findSuitableSystem = (direction, systems) => {
      let suitableSystem = this.systemsData[systems[0]];

      function compare(system, operator, oldsystem) {
        switch (operator) {
          case '>': return system > oldsystem;
          case '<': return system < oldsystem;
          default: return false;
        }
      }

      systems.forEach((systemId) => {
        if (compare(
          this.systemsData[systemId].inSectorCoordinates[direction.rowOrCol],
          direction.comparison,
          suitableSystem.inSectorCoordinates[direction.rowOrCol],
        )) {
          suitableSystem = this.systemsData[systemId];
        }
      });

      return suitableSystem;
    };

    const findSector = (sectorCoordinates) => (
      this.sectorsList.find((sectorId) => (
        this.sectorsData[sectorId].coordinates.row === sectorCoordinates.row
        && this.sectorsData[sectorId].coordinates.col === sectorCoordinates.col
      ))
    );

    const addLinks = (oSysId, neighSysId, direction) => { // (ownSystemId, neighbourSystemId)
      const linkData = { ...this.systemsData[neighSysId] };
      linkData.direction = direction;
      this.systemsData[oSysId].linkList.push(neighSysId);
      this.systemsData[oSysId].linkSystemData[neighSysId] = linkData;
    };

    // find conection for each direction
    this.sectorsList.forEach((sectorId) => {
      const sectorData = this.sectorsData[sectorId];
      let neighbour = '';
      let ownSuitableSystem = '';
      let neighbourSuitableSystem = '';
      // left
      if (sectorData.coordinates.col > 0) {
        neighbour = findSector({
          col: (sectorData.coordinates.col - 1), // -1 for neighbour
          row: sectorData.coordinates.row,
        });
        ownSuitableSystem = findSuitableSystem({
          rowOrCol: 'x',
          comparison: '<', // smallest x coordinates
        }, sectorData.systems);
        neighbourSuitableSystem = findSuitableSystem({
          rowOrCol: 'x',
          comparison: '>',
        }, this.sectorsData[neighbour].systems);

        addLinks(ownSuitableSystem.id, neighbourSuitableSystem.id, 'left');
      }
      // right
      if (sectorData.coordinates.col < sectorAmountRoot) {
        neighbour = findSector({
          col: (sectorData.coordinates.col + 1),
          row: sectorData.coordinates.row,
        });
        ownSuitableSystem = findSuitableSystem({
          rowOrCol: 'x',
          comparison: '>',
        }, sectorData.systems);
        neighbourSuitableSystem = findSuitableSystem({
          rowOrCol: 'x',
          comparison: '<',
        }, this.sectorsData[neighbour].systems);

        addLinks(ownSuitableSystem.id, neighbourSuitableSystem.id, 'right');
      }
      // top
      if (sectorData.coordinates.row > 0) {
        neighbour = findSector({
          col: sectorData.coordinates.col,
          row: (sectorData.coordinates.row - 1),
        });
        ownSuitableSystem = findSuitableSystem({
          rowOrCol: 'y',
          comparison: '<',
        }, sectorData.systems);
        neighbourSuitableSystem = findSuitableSystem({
          rowOrCol: 'y',
          comparison: '>',
        }, this.sectorsData[neighbour].systems);

        addLinks(ownSuitableSystem.id, neighbourSuitableSystem.id, 'top');
      }
      // Bottom
      if (sectorData.coordinates.row < sectorAmountRoot) {
        neighbour = findSector({
          col: sectorData.coordinates.col,
          row: (sectorData.coordinates.row + 1),
        });
        ownSuitableSystem = findSuitableSystem({
          rowOrCol: 'y',
          comparison: '>',
        }, sectorData.systems);
        neighbourSuitableSystem = findSuitableSystem({
          rowOrCol: 'y',
          comparison: '<',
        }, this.sectorsData[neighbour].systems);

        addLinks(ownSuitableSystem.id, neighbourSuitableSystem.id, 'bottom');
      }
    });
  }
}

const starMap = {
  generateStarMap: (settings) => {
    // settings { sectorAmount, density, sectorSize}
    function validateSettings() {
      const validatedSettings = settings;
      validatedSettings.sectorAmount = 100;
      validatedSettings.density = 4;
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
