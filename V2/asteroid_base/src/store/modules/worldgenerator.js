// world generator
// adds system to world json
//

const objectTypes = {
  system: {
    size: 20000,
  },
  celestialObjects: {
    name: 'asteroid',
    subTypes: [
      {
        className: 'comet',
        sizeRange: [10, 100],
        characteristics: {
          possibleResources: ['water', 'ice'],
        },
      }, {
        className: 'meteoroid',
        sizeRange: [1, 10],
        characteristics: {
          possibleResources: ['metal', 'rock'],
        },
      }, {
        className: 'asteroid',
        sizeRange: [10, 100],
        characteristics: {
          possibleResources: ['metal', 'rock'],
        },
      },
    ],
  },
  stars: {
    name: 'star',
    subTypes: [
      {
        className: 'O Class',
        color: 'blue',
        temperature: 32000,
        size: 6.6,
        mass: 16,
      }, {
        className: 'B Class',
        color: 'bluewhite',
        temperature: 15000,
        size: 4.0,
        mass: 8,
      }, {
        className: 'A Class',
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
        className: 'G Class',
        color: 'yellow',
        temperature: 32000,
        size: 1,
        mass: 1,
      }, {
        className: 'K Class',
        color: 'lightorange',
        temperature: 4500,
        size: 0.85,
        mass: 0.7,
      }, {
        className: 'M Class',
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


const makeName = (type) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let typeCharacter = '';

  switch (type) {
    case 'star':
      typeCharacter = 'S';
      break;
    case 'comet':
      typeCharacter = 'C';
      break;
    case 'asteroid':
      typeCharacter = 'A';
      break;
    case 'system':
      typeCharacter = 'SYS';
      break;
    default:
      typeCharacter = 'X';
  }

  result += typeCharacter;
  for (let i = 0; i < 3; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const addStar = (starSystem) => {
  const system = starSystem;
  const systemCenterCoordinates = objectTypes.system.size / 2;
  const starType = Math.floor(Math.random() * objectTypes.stars.subTypes.length);

  const star = {
    name: makeName('star'),
    type: 'star',
    className: objectTypes.stars.subTypes[starType].className,
    color: objectTypes.stars.subTypes[starType].color,
    systemCoordinates: { x: systemCenterCoordinates, y: systemCenterCoordinates },
  };
  system.systemObjects.push(star);

  return system;
};

const randomObject = () => {
  const objectType = Math.floor(Math.random() * objectTypes.celestialObjects.subTypes.length);
  const subType = objectTypes.celestialObjects.subTypes[objectType];

  return subType;
};

const randomSystemCoordinates = () => {
  const chosenCoordinates = { x: 0, y: 0 };

  function randomCoordinate() {
    Math.floor(Math.random() * objectTypes.system.size);
  }
  const x = randomCoordinate();
  const y = randomCoordinate();
  chosenCoordinates.x = x;
  chosenCoordinates.y = y;

  return chosenCoordinates;
};

const createObject = () => {
  const chosenObject = randomObject();
  const chosenCoordinates = randomSystemCoordinates();

  const object = {
    name: makeName(chosenObject.className),
    type: chosenObject.className,
    color: 'grey',
    systemCoordinates: chosenCoordinates,
  };

  return object;
};

const addObjects = (system) => {
  const systemWithObjects = system;

  for (let i = 0; i < 10; i += 1) {
    systemWithObjects.systemObjects.push(createObject());
  }

  return systemWithObjects;
};

const generateSystem = () => {
  let systemWithStar = {};
  let systemWithObjects = {};

  const newSystem = new EmptySystem(makeName('system'), []);

  systemWithStar = addStar(newSystem);
  systemWithObjects = addObjects(systemWithStar);

  return systemWithObjects;
};

// output world with new system
const systemgenerator = () => {
  const newSystem = generateSystem();

  return newSystem;
};

export { systemgenerator as default };
