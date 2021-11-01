const objectTypes = {
  getRandomObjectOffType: function getRandomObjectOffType(objectList) {
    const objectTypesAmount = this[objectList].subTypes.length;
    const objectTypeIndex = Math.floor(Math.random() * objectTypesAmount);
    const chosenObject = this[objectList].subTypes[objectTypeIndex];

    return chosenObject;
  },
  system: {
    size: 20000,
  },
  celestialObjects: {
    subTypes: [
      {
        className: 'comet',
        shortName: 'COM',
        color: 'greyblue',
        characteristics: {
          massRange: [1, 10, 13, 14],
          sizeRange: [10, 100],
          possibleResources: ['water', 'metal'],
          makeuptype: ['stony', 'carbonaceous', 'metallic'],
        },
      }, {
        className: 'meteoroid',
        shortName: 'MET',
        color: 'lightgrey',
        sizeRange: [1, 10],
        characteristics: {
          massRange: [1, 10, 13, 14],
          possibleResources: ['metal', 'rock'],
        },
      }, {
        className: 'asteroid',
        shortName: 'AST',
        color: 'grey',
        sizeRange: [10, 100],
        characteristics: {
          massRange: [1, 10, 13, 14],
          possibleResources: ['metal', 'rock'],
        },
      }, {
        className: 'dwarf planet',
        shortName: 'DWA',
        color: 'grey',
        sizeRange: [100, 500],
        characteristics: {
          massRange: [1, 10, 13, 14],
          possibleResources: ['metal', 'rock'],
        },
      },
    ],
  },
  stars: {
    className: 'star',
    shortName: 'STA',
    subTypes: [
      {
        className: 'O Class',
        color: 'blue',
        characteristics: {
          massRange: [16, 30, 13, 14],
          possibleResources: ['metal', 'rock'],
          temperature: 32000,
          size: 6.6,
        },
      }, {
        className: 'B Class',
        color: 'bluewhite',
        characteristics: {
          massRange: [2.1, 16, 13, 14],
          possibleResources: ['metal', 'rock'],
          temperature: 15000,
          size: 4.0,
        },
      }, {
        className: 'A Class',
        color: 'white',
        characteristics: {
          massRange: [1.4, 2.1, 13, 14],
          possibleResources: ['metal', 'rock'],
          temperature: 8500,
          size: 1.6,
        },
      }, {
        className: 'F Class',
        color: 'yellowwhite',
        characteristics: {
          massRange: [1.04, 1.4, 13, 14],
          possibleResources: ['metal', 'rock'],
          temperature: 7000,
          size: 1.3,
        },
      }, {
        className: 'G Class',
        color: 'yellow',
        characteristics: {
          massRange: [0.45, 1.04, 13, 14],
          possibleResources: ['metal', 'rock'],
          temperature: 5500,
          size: 1,
        },
      }, {
        className: 'K Class',
        color: 'lightorange',
        characteristics: {
          massRange: [0.08, 0.45, 13, 14],
          possibleResources: ['metal', 'rock'],
          temperature: 4500,
          size: 0.85,
        },

      }, {
        className: 'M Class',
        color: 'orangered',
        characteristics: {
          massRange: [1, 10, 13, 14],
          possibleResources: ['metal', 'rock'],
          temperature: 3200,
          size: 0.5,
        },
      },
    ],
  },
  nations: {
    subTypes: [
      {
        govermentType: 'empire',
        rulers: 1,
        council: 3,
      },
    ],
  },
  resources: {
    raw: [
      {
        name: 'metal ore',
        density: 2500,
        type: 'ore',
      }, {
        name: 'carbonbased',
        density: 2200,
        type: 'material',
      }, {
        name: 'water',
        density: 997,
        type: 'material',
      }, {
        name: 'organic',
        density: 790,
        type: 'material',
      }, {
        name: 'gas',
        density: 71,
        type: 'gas',
      }, {
        name: 'waste',
        density: 2000,
        type: 'misc',
      },
    ],
    refined: [
      {
        name: 'metals',
        density: 0,
      }, {
        name: 'rare metals',
        density: 0,
      }, {
        name: 'heavy metals',
        density: 0,
      }, {
        name: 'water',
        density: 0,
      }, {
        name: 'food',
        density: 0,
      }, {
        name: 'noble gasses',
        density: 0,
      }, {
        name: 'fuel',
        density: 0,
      },
    ],
  },
};

export { objectTypes as default };
