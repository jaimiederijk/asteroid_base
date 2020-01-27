
const objectTypes = {
  asteroids: {
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
  systemObjects:[]
};


var makeName = () => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 3; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

var addStar = (starSystem) => {
  var system = starSystem;

  var starType = Math.floor(Math.random() * objectTypes.stars.subTypes.length );

  var star = {
    name:makeName(),
    type:"star",
    className:objectTypes.stars.subTypes[starType].className,
    color:objectTypes.stars.subTypes[starType].color,
  }
  system.systemObjects.push(star);

  return system;
}


var generator = (settings) => {
  //output a json with all info about a single systems
  var world = {};

  world = addStar(emptySystem);
  console.log("worldgen output");
  console.log(world);
  return world;
}

module.exports = generator;
