// world generator
// adds system to world json
//

const objectTypes = {
  system: {
    size:20000
  },
  celestialObjects: {
    name:"asteroid",
    subTypes: [
      {
        className:"comet",
        sizeRange:[10,100],
        characteristics: {
          possibleResources:["water","ice"]
        }
      },{
        className:"meteoroid",
        sizeRange:[1,10],
        characteristics: {
          possibleResources:["metal","rock"]
        }
      },{
        className:"asteroid",
        sizeRange:[10,100],
        characteristics: {
          possibleResources:["metal","rock"]
        }
      }
    ],
  },
  stars: {
    name:"star",
    subTypes:[
      {
        className: "O Class",
        color: "blue",
        temperature: 32000,
        size:6.6,
        mass:16
      },{
        className: "B Class",
        color: "bluewhite",
        temperature: 15000,
        size:4.0,
        mass:8
      },{
        className: "A Class",
        color: "white",
        temperature: 8500,
        size:1.6,
        mass:1.7
      },{
        className: "F Class",
        color: "yellowwhite",
        temperature: 7000,
        size:1.3,
        mass:1.14
      },{
        className: "G Class",
        color: "yellow",
        temperature: 32000,
        size:1,
        mass:1
      },{
        className: "K Class",
        color: "lightorange",
        temperature: 4500,
        size:0.85,
        mass:0.7
      },{
        className: "M Class",
        color: "orangered",
        temperature: 3200,
        size:0.5,
        mass:0.30
      }
    ]
  },
  dwarfPlanets:{
    name:"dwarf planet"
  }
}

const emptySystem = {
  systemName:"",
  systemObjects:[]
};


var makeName = (type) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  var typeCharacter = '';

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
  };

  result += typeCharacter;
  for ( var i = 0; i < 3; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

var addStar = (starSystem) => {
  var system = starSystem;
  var systemCenterCoordinates = objectTypes.system.size/2;
  var starType = Math.floor(Math.random() * objectTypes.stars.subTypes.length );

  var star = {
    name:makeName('star'),
    type:"star",
    className:objectTypes.stars.subTypes[starType].className,
    color:objectTypes.stars.subTypes[starType].color,
    systemCoordinates:{x:systemCenterCoordinates,y:systemCenterCoordinates}
  }
  system.systemObjects.push(star);

  return system;
}

var randomObject = () => {
  var objectType = Math.floor(Math.random() * objectTypes.celestialObjects.subTypes.length );
  var subType = objectTypes.celestialObjects.subTypes[objectType];

  return subType;
}

var randomSystemCoordinates = () => {
  var chosenCoordinates = {x:0,y:0};

  var randomCoordinate = () => {
    Math.floor(Math.random() * objectTypes.system.size );
  }
  var x = randomCoordinate();
  var y = randomCoordinate();
  chosenCoordinates.x = x;
  chosenCoordinates.y = y;

  return chosenCoordinates;

}

var createObject = () => {
  var chosenObject = randomObject();
  var chosenCoordinates = randomSystemCoordinates();

  var object = {
    name:makeName(chosenObject.className),
    type:chosenObject.className,
    color:"grey",
    systemCoordinates:chosenCoordinates
  };

  return object;
}

var addObjects = (system) => {
  var systemWithObjects = system;

  for (var i = 0; i < 10; i++) {
    systemWithObjects.systemObjects.push(createObject());
  }

  return systemWithObjects;
}

var generateSystem = () => {
  var systemWithStar = {};
  var systemWithObjects = {};
  var newSystem = emptySystem;

  newSystem.systemName = makeName("system");

  systemWithStar = addStar(emptySystem);
  systemWithObjects = addObjects(systemWithStar);

  return systemWithObjects;

}

// output world with new system
var generator = (settings) => {
  // var gameWorld = oldWorld;
  var newSystem = {};

  newSystem = generateSystem();
  // gameWorld.world.systems.push(newSystem);

  return newSystem;
}

module.exports = generator;
