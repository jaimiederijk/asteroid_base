// world generator
// adds system to world json
// old delete

import { v4 as uuidv4 } from 'uuid';

const objectTypes = {
  system: {
    size: 20000,
  },
  celestialObjects: {
    name: 'asteroid',
    subTypes: [
      {
        className: 'comet',
        color: 'greyblue',
        sizeRange: [10, 100],
        characteristics: {
          possibleResources: ['water', 'ice'],
          makeuptype: ['stony', 'carbonaceous', 'metallic'],
        },
      }, {
        className: 'meteoroid',
        color: 'lightgrey',
        sizeRange: [1, 10],
        characteristics: {
          possibleResources: ['metal', 'rock'],
        },
      }, {
        className: 'asteroid',
        color: 'grey',
        sizeRange: [10, 100],
        characteristics: {
          possibleResources: ['metal', 'rock'],
        },
      },
    ],
  },
  stars: {
    className: 'star',
    subTypes: [
      {
        subClassName: 'O Class',
        color: 'blue',
        temperature: 32000,
        size: 6.6,
        mass: 16,
      }, {
        subClassName: 'B Class',
        color: 'bluewhite',
        temperature: 15000,
        size: 4.0,
        mass: 8,
      }, {
        subClassName: 'A Class',
        color: 'white',
        temperature: 8500,
        size: 1.6,
        mass: 1.7,
      }, {
        className: 'F Class',
        color: 'yellowwhite',
        temperature: 7000,
        size: 1.3,
        mass: 1.14,
      }, {
        subClassName: 'G Class',
        color: 'yellow',
        temperature: 32000,
        size: 1,
        mass: 1,
      }, {
        subClassName: 'K Class',
        color: 'lightorange',
        temperature: 4500,
        size: 0.85,
        mass: 0.7,
      }, {
        subClassName: 'M Class',
        color: 'orangered',
        temperature: 3200,
        size: 0.5,
        mass: 0.30,
      },
    ],
  },
  dwarfPlanets: {
    name: 'dwarf planet',
  },
};

function EmptySystem(name, objects) {
  this.systemName = name;
  this.systemObjects = objects;
}
function addUuid(type) {
  const newID = type + uuidv4();

  return newID;
}

function makeName(type) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let typeCharacter = '';

  switch (type) {
    case 'star':
      typeCharacter = 'STA';
      break;
    case 'comet':
      typeCharacter = 'COM';
      break;
    case 'asteroid':
      typeCharacter = 'AST';
      break;
    case 'system':
      typeCharacter = 'SYS';
      break;
    default:
      typeCharacter = 'UNI';
  }

  result += typeCharacter;
  for (let i = 0; i < 3; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function addStar(starSystem) {
  const system = starSystem;
  const systemCenterCoordinates = objectTypes.system.size / 2;
  const starType = Math.floor(Math.random() * objectTypes.stars.subTypes.length);

  const star = {
    id: addUuid('sta'),
    name: makeName('star'),
    type: 'star',
    className: objectTypes.stars.subTypes[starType].className,
    color: objectTypes.stars.subTypes[starType].color,
    systemCoordinates: { x: systemCenterCoordinates, y: systemCenterCoordinates },
  };
  system.systemObjects.push(star);

  return system;
}

function randomObject() {
  const objectType = Math.floor(Math.random() * objectTypes.celestialObjects.subTypes.length);
  const subType = objectTypes.celestialObjects.subTypes[objectType];

  return subType;
}

function randomSystemCoordinates() {
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

function createObject(newobject) {
  const chosenObject = newobject;
  const chosenCoordinates = randomSystemCoordinates();

  const object = {
    id: addUuid(chosenObject.className.substring(0, 3)),
    name: makeName(chosenObject.className),
    type: chosenObject.className,
    color: chosenObject.color,
    systemCoordinates: chosenCoordinates,
    characteristics: {
      integrity: Math.floor(Math.random() * 60) + 20,
    },
  };

  return object;
}

function addObjects(system) {
  const systemWithObjects = system;

  for (let i = 0; i < 10; i += 1) {
    systemWithObjects.systemObjects.push(createObject(randomObject()));
  }

  return systemWithObjects;
}

function generateSystem() {
  let systemWithStar = {};
  let systemWithObjects = {};

  const newSystem = new EmptySystem(makeName('system'), []);

  systemWithStar = addStar(newSystem);
  systemWithObjects = addObjects(systemWithStar);
  systemWithObjects.id = addUuid('SYS');

  return systemWithObjects;
}

// output world with new system
function systemgenerator() {
  const newSystem = generateSystem();

  return newSystem;
}

export { systemgenerator as default };
