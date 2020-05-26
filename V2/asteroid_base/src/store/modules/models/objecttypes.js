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

export { objectTypes as default };
