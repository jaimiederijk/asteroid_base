import GameObject from './gameobject';
import CelestialObject from './celestialobject';
import CelestialObject2 from './celestialobject2';
import objectTypes from './objecttypes';

class PlanetarySystem extends GameObject {
  constructor(id, coordinates, settings, sectorId) {
    super('planetary system', id, 'SYS', 'PlanetarySystem');
    this.settings = settings;
    this.type = objectTypes.getRandomObjectFromList(objectTypes.system.weightedSystemTypeList);
    this.sectorId = sectorId;
    this.inSectorCoordinates = coordinates;
    this.systemObjectsData = {};
    this.systemObjectsList = [];
    this.systemCenter = {};
    this.linkList = [];
    this.linkSystemData = {};
    this.populate();
  }

  // systemType() {
  //   return
  // }

  populate() {
    const systemData = objectTypes.system.typeData[this.type];
    const { density } = this.settings;
    const densityNumber = Math.floor(Math.random() * density) + 1;
    const farthestObject = PlanetarySystem.createCoordinatesViaBlagg(
      densityNumber - 1,
      { x: 0, y: 0 },
    );

    this.systemCenter.gravCenter = systemData.gravCenter;

    this.addStars();
    this.createCelestialObjectsAround({ x: 0, y: 0 }, densityNumber, systemData);

    this.systemSize = farthestObject.radius * 2 + 200;
  }

  addStars() {
    const systemInfo = objectTypes.system.typeData[this.type];
    const chosenObject = objectTypes.getRandomObjectFromList(systemInfo.weightedStarTypeList);
    const objData = objectTypes.celestialObjects.typeData[chosenObject];

    if (this.systemCenter.gravCenter === 'point') { // no object at center
      if (systemInfo.mainObjectList.length === 1) { // point grav center but only one object
        const objData2 = { ...objData };

        objData.orbit = {
          inSystemCoordinates: { x: 100, y: 0 },
          center: { x: 0, y: 0 },
          radius: 100,
        };
        objData2.orbit = {
          inSystemCoordinates: { x: -100, y: 0 },
          center: { x: 0, y: 0 },
          radius: 100,
        }; // should become a formula

        const newStar = new CelestialObject2(objData);
        const newStar2 = new CelestialObject2(objData2);

        newStar2.name = `${newStar.name} B`;
        newStar.name = `${newStar.name} A`;
        this.systemCenter.color = newStar.color;

        this.addCelestialObject(newStar);
        this.addCelestialObject(newStar2);
      } else { // oneven multistar
        const mainObjListLength = systemInfo.mainObjectList.length;
        objData.orbit = {
          inSystemCoordinates: { x: -200, y: 0 },
          center: { x: 0, y: 0 },
          radius: 200,
        };

        const newStar = new CelestialObject2(objData);
        this.systemCenter.color = newStar.color;

        this.addCelestialObject(newStar);

        for (let i = 1; i < mainObjListLength; i += 1) { // i = 1 skipp first one already added
          const key = systemInfo.mainObjectList[i];
          const newObjName = objectTypes.getRandomObjectFromList(systemInfo.mainObjectClasses[key]);
          const newObj = objectTypes.celestialObjects.typeData[newObjName];
          newObj.orbit = {
            inSystemCoordinates: { x: (200 * i), y: 0 },
            center: { x: 0, y: 0 },
            radius: (200 * i),
          };
          this.addCelestialObject(new CelestialObject2(newObj));
        }
      }
    } else { // single star
      objData.orbit = {
        inSystemCoordinates: { x: 0, y: 0 },
        center: { x: 0, y: 0 },
        radius: 0,
      };
      const newStar = new CelestialObject2(objData);
      this.systemCenter.color = newStar.color;

      this.addCelestialObject(newStar);
    }
  }

  addRandomStar() {
    const chosenObject = objectTypes.getRandomObjectOffType('stars');
    chosenObject.className = objectTypes.stars.className;
    chosenObject.shortName = objectTypes.stars.shortName;
    const newObject = new CelestialObject(chosenObject);
    this.systemCenter = {
      color: newObject.color,
      ids: [newObject.id],
      gravCenter: this.systemCenter.gravCenter,
    };
    this.addCelestialObject(newObject);
  }

  addRandomCelestialObject() {
    const chosenObjectShortName = objectTypes.getRandomObjectFromList(objectTypes.weightedCOList);
    const chosenObject = objectTypes.celestialObjects.subTypes.find(
      (subtype) => subtype.shortName === chosenObjectShortName,
    );
    this.addCelestialObject(new CelestialObject(chosenObject));
  }

  createCelestialObjectsAround(orbitCenter, density, composition) {
    const { createCoordinatesViaBlagg } = this.constructor;
    for (let i = 0; i < density; i += 1) {
      const randomType = objectTypes.getRandomObjectFromList(
        composition.weightedCompositionList[i],
      );
      const objData = objectTypes.celestialObjects.typeData[randomType];
      objData.orbit = createCoordinatesViaBlagg(i, orbitCenter);
      const newObj = new CelestialObject2(objData);

      this.addCelestialObject(newObj);
    }
  }

  static createCoordinatesViaBlagg(i, center) { // 214 * radius grav center * blagglaw[0]
    const { blaggLaw } = objectTypes.system;
    const orbit = {
      center,
      radius: 1000 * blaggLaw[i], // 1000 = au
      inSystemCoordinates: {},
    };
    const angle = Math.random();
    let x = orbit.radius * Math.sin(Math.PI * 2 * angle);
    let y = orbit.radius * Math.cos(Math.PI * 2 * angle);
    // console.log(x);
    x += center.x; // shift to center
    y += center.y;
    orbit.inSystemCoordinates = { x, y };

    return orbit;
  }

  addCelestialObject(newObject) {
    this.systemObjectsData[newObject.id] = newObject;
    this.systemObjectsList.push(newObject.id);
  }
}

export { PlanetarySystem as default };
