const objectTypes = {
  getRandomObjectOffType: function getRandomObjectOffType(objectList) {
    const objectTypesAmount = this[objectList].subTypes.length;
    const objectTypeIndex = Math.floor(Math.random() * objectTypesAmount);
    const chosenObject = this[objectList].subTypes[objectTypeIndex];
    console.log(chosenObject);
    return chosenObject;
  },
  getRandomObjectFromList: function getRandomObjectFromList(list) {
    const randomNumber = Math.floor(Math.random() * list.length);
    const chosenObject = list[randomNumber];

    return chosenObject;
  },
  createWeightedObjList: function createWeightedObjList(list, objData) {
    const weightedList = [];
    list.forEach((objName) => {
      for (let index = 0; index < objData[objName].occurence; index += 1) {
        weightedList.push(objName);
      }
    });

    return weightedList;
  },
  system: {
    size: 20000, // deprec
    blaggLaw: [0.387, 0.723, 1.000, 1.524, 2.67, 5.200, 9.550, 19.23, 30.13, 41.8],
    typeList: ['single', 'binarySimilar', 'binarySmallBig'],
    typeData: {
      single: {
        className: 'single',
        gravCenter: 'star',
        mainObjectList: ['star1'],
        mainObjectClasses: {
          star1: [
            'starOClass', 'starBClass', 'starAClass', 'starFClass', 'starGClass', 'starKClass', 'starMClass',
          ],
        },
        occurence: 66,
        composition: [
          {
            blaggN: 4, // first 4 in the blagg sequence
            objList: ['terrestrial', 'asteroidBelt'],
            objData: {
              terrestrial: {
                occurence: 90,
              },
              asteroidBelt: {
                occurence: 10,
              },
            },
          }, {
            blaggN: 2,
            objList: ['gasGiant', 'terrestrial'],
            objData: {
              gasGiant: {
                occurence: 90,
              },
              terrestrial: {
                occurence: 10,
              },
            },
          }, {
            blaggN: 6,
            objList: ['gasGiant', 'iceGiant', 'terrestrial'],
            objData: {
              gasGiant: {
                occurence: 10,
              },
              iceGiant: {
                occurence: 80,
              },
              terrestrial: {
                occurence: 10,
              },
            },
          },
        ],
        get weightedCompositionList() {
          delete this.weightedCompositionList;
          const weightedPerBlagg = [];
          this.composition.forEach((comp) => {
            for (let i = 0; i < comp.blaggN; i += 1) {
              const wList = objectTypes.createWeightedObjList(
                comp.objList, comp.objData,
              );
              weightedPerBlagg.push(wList);
            }
          });
          this.weightedCompositionList = weightedPerBlagg;

          return this.weightedCompositionList;
        },
        get weightedStarTypeList() {
          delete this.weightedStarTypeList;
          this.weightedStarTypeList = objectTypes.createWeightedObjList(
            this.mainObjectClasses.star1, objectTypes.celestialObjects.typeData,
          );
          return this.weightedStarTypeList;
        },
      },
      binarySimilar: {
        className: 'binary similar',
        gravCenter: 'point',
        mainObjectList: ['star1'],
        mainObjectClasses: {
          star1: [
            'starOClass', 'starBClass', 'starAClass', 'starFClass', 'starGClass', 'starKClass', 'starMClass',
          ],
        },
        occurence: 16,
        composition: [
          {
            blaggN: 4, // first 4 in the blagg sequence
            objList: ['terrestrial', 'asteroidBelt'],
            objData: {
              terrestrial: {
                occurence: 90,
              },
              asteroidBelt: {
                occurence: 10,
              },
            },
          }, {
            blaggN: 2,
            objList: ['gasGiant', 'terrestrial'],
            objData: {
              gasGiant: {
                occurence: 90,
              },
              terrestrial: {
                occurence: 10,
              },
            },
          }, {
            blaggN: 6,
            objList: ['gasGiant', 'iceGiant', 'terrestrial'],
            objData: {
              gasGiant: {
                occurence: 10,
              },
              iceGiant: {
                occurence: 80,
              },
              terrestrial: {
                occurence: 10,
              },
            },
          },
        ],
        get weightedCompositionList() {
          delete this.weightedCompositionList;
          const weightedPerBlagg = [];
          this.composition.forEach((comp) => {
            for (let i = 0; i < comp.blaggN; i += 1) {
              const wList = objectTypes.createWeightedObjList(
                comp.objList, comp.objData,
              );
              weightedPerBlagg.push(wList);
            }
          });
          this.weightedCompositionList = weightedPerBlagg;

          return this.weightedCompositionList;
        },
        get weightedStarTypeList() {
          delete this.weightedStarTypeList;
          this.weightedStarTypeList = objectTypes.createWeightedObjList(
            this.mainObjectClasses.star1, objectTypes.celestialObjects.typeData,
          );
          return this.weightedStarTypeList;
        },
      },
      binarySmallBig: {
        className: 'binary small bigg star',
        gravCenter: 'point',
        mainObjectList: ['star1', 'star2'],
        mainObjectClasses: {
          star1: ['starOClass', 'starBClass', 'starAClass'],
          star2: ['starGClass', 'starKClass', 'starMClass'],
        },
        occurence: 17,
        composition: [
          {
            blaggN: 4, // first 4 in the blagg sequence
            objList: ['terrestrial', 'asteroidBelt'],
            objData: {
              terrestrial: {
                occurence: 90,
              },
              asteroidBelt: {
                occurence: 10,
              },
            },
          }, {
            blaggN: 2,
            objList: ['gasGiant', 'terrestrial'],
            objData: {
              gasGiant: {
                occurence: 90,
              },
              terrestrial: {
                occurence: 10,
              },
            },
          }, {
            blaggN: 6,
            objList: ['gasGiant', 'iceGiant', 'terrestrial'],
            objData: {
              gasGiant: {
                occurence: 10,
              },
              iceGiant: {
                occurence: 80,
              },
              terrestrial: {
                occurence: 10,
              },
            },
          },
        ],
        get weightedCompositionList() {
          delete this.weightedCompositionList;
          const weightedPerBlagg = [];
          this.composition.forEach((comp) => {
            for (let i = 0; i < comp.blaggN; i += 1) {
              const wList = objectTypes.createWeightedObjList(
                comp.objList, comp.objData,
              );
              weightedPerBlagg.push(wList);
            }
          });
          this.weightedCompositionList = weightedPerBlagg;

          return this.weightedCompositionList;
        },
        get weightedStarTypeList() {
          delete this.weightedStarTypeList;
          this.weightedStarTypeList = objectTypes.createWeightedObjList(
            this.mainObjectClasses.star1, objectTypes.celestialObjects.typeData,
          );
          return this.weightedStarTypeList;
        },
      },
    },
    get weightedSystemTypeList() {
      delete this.weightedSystemTypeList;
      this.weightedSystemTypeList = objectTypes.createWeightedObjList(this.typeList, this.typeData);
      return this.weightedSystemTypeList;
    },
  },
  celestialObjects: {
    freeSmallobjectList: [ // objects that are present in a system by themselfs
      'comet', 'meteoroid', 'asteroid', 'dwarfPlanet',
    ],
    freeLargeObjectList: [ // planets that cleared its orbit
      'gasGiant', 'terrestrial', 'iceGiant',
    ],
    satelliteList: [ // object that can be in orbit of large object
      'dwarfPlanet', 'asteroid',
    ],

    typeData: {
      comet: {
        className: 'comet',
        shortName: 'COM',
        color: 'greyblue',
        occurence: 10, // out of 100
        characteristics: {
          massRange: [1, 10, 13, 14], // a , b = kg c, d = to the power of
          sizeRange: [10, 100],
          possibleResources: ['water', 'metal'],
          makeuptype: ['stony', 'carbonaceous', 'metallic'],
        },
      },
      meteoroid: {
        className: 'meteoroid',
        shortName: 'MET',
        color: 'lightgrey',
        occurence: 1,
        characteristics: {
          massRange: [1, 10, 0, 3],
          sizeRange: [1, 1],
          possibleResources: ['metal', 'rock'],
        },
      },
      asteroid: {
        className: 'asteroid',
        shortName: 'AST',
        color: 'grey',
        occurence: 50,
        characteristics: {
          massRange: [1, 10, 13, 14],
          sizeRange: [10, 100],
          possibleResources: ['metal', 'rock'],
        },
      },
      dwarfPlanet: {
        className: 'dwarf planet',
        shortName: 'DWA',
        color: 'grey',
        occurence: 30,
        characteristics: {
          massRange: [1, 10, 20, 22],
          sizeRange: [100, 500],
          possibleResources: ['metal', 'rock'],
        },
      },
      gasGiant: {
        className: 'gas giant',
        shortName: 'GG',
        color: 'brown',
        occurence: 9,
        characteristics: {
          massRange: [1, 10, 13, 14],
          sizeRange: [1000, 5000],
          possibleResources: ['metal', 'rock'],
        },
      },
      terrestrial: {
        className: 'Terrestrial planet',
        shortName: 'TP',
        color: 'grey',
        occurence: 9,
        characteristics: {
          massRange: [1, 10, 13, 14],
          sizeRange: [500, 1000],
          possibleResources: ['metal', 'rock'],
        },
      },
      iceGiant: {
        className: 'Ice giant',
        shortName: 'IG',
        color: 'white',
        occurence: 9,
        characteristics: {
          massRange: [1, 10, 13, 14],
          sizeRange: [500, 1000],
          possibleResources: ['metal', 'rock'],
        },
      },
      asteroidBelt: {
        className: 'Asteroid belt',
        shortName: 'ASTB',
        color: 'grey',
        occurence: 9,
        characteristics: {
          massRange: [1, 10, 13, 14],
          sizeRange: [500, 1000],
          possibleResources: ['metal', 'rock'],
        },
      },
      starOClass: {
        className: 'O Class',
        shortName: 'STA-O',
        color: 'blue',
        occurence: 1,
        characteristics: {
          massRange: [16, 30],
          possibleResources: [],
          temperature: 32000,
          size: 6.6,
        },
      },
      starBClass: {
        className: 'B Class',
        shortName: 'STA-B',
        color: 'bluewhite',
        occurence: 1,
        characteristics: {
          massRange: [2.1, 16],
          possibleResources: [],
          temperature: 15000,
          size: 4.0,
        },
      },
      starAClass: {
        className: 'A Class',
        shortName: 'STA-A',
        color: 'white',
        occurence: 1,
        characteristics: {
          massRange: [1.4, 2.1],
          possibleResources: [],
          temperature: 8500,
          size: 1.6,
        },
      },
      starFClass: {
        className: 'F Class',
        shortName: 'STA-F',
        color: 'yellowwhite',
        occurence: 3,
        characteristics: {
          massRange: [1.04, 1.4],
          possibleResources: [],
          temperature: 7000,
          size: 1.3,
        },
      },
      starGClass: {
        className: 'G Class',
        shortName: 'STA-G',
        color: 'yellow',
        occurence: 8,
        characteristics: {
          massRange: [0.8, 1.04],
          possibleResources: [],
          temperature: 5500,
          size: 1,
        },
      },
      starKClass: {
        className: 'K Class',
        shortName: 'STA-K',
        color: 'lightorange',
        occurence: 12,
        characteristics: {
          massRange: [0.45, 0.8],
          possibleResources: [],
          temperature: 4500,
          size: 0.85,
        },
      },
      starMClass: {
        className: 'M Class',
        shortName: 'STA-M',
        color: 'orangered',
        occurence: 76,
        characteristics: {
          massRange: [0.08, 0.45],
          possibleResources: [],
          temperature: 3200,
          size: 0.5,
        },
      },
    },
    subTypes: [
      {
        className: 'comet',
        shortName: 'COM',
        color: 'greyblue',
        characteristics: {
          occurence: 10, // out of 100
          massRange: [1, 10, 13, 14], // a , b = kg c, d = to the power of
          sizeRange: [10, 100],
          possibleResources: ['water', 'metal'],
          makeuptype: ['stony', 'carbonaceous', 'metallic'],
        },
      }, {
        className: 'meteoroid',
        shortName: 'MET',
        color: 'lightgrey',
        characteristics: {
          occurence: 1,
          massRange: [1, 10, 0, 3],
          sizeRange: [1, 1],
          possibleResources: ['metal', 'rock'],
        },
      }, {
        className: 'asteroid',
        shortName: 'AST',
        color: 'grey',
        characteristics: {
          occurence: 50,
          massRange: [1, 10, 13, 14],
          sizeRange: [10, 100],
          possibleResources: ['metal', 'rock'],
        },
      }, {
        className: 'dwarf planet',
        shortName: 'DWA',
        color: 'grey',
        characteristics: {
          occurence: 30,
          massRange: [1, 10, 20, 22],
          sizeRange: [100, 500],
          possibleResources: ['metal', 'rock'],
        },
      }, {
        className: 'gas giant',
        shortName: 'GG',
        color: 'brown',
        characteristics: {
          occurence: 9,
          massRange: [1, 10, 13, 14],
          sizeRange: [1000, 5000],
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
          massRange: [16, 30],
          possibleResources: [],
          temperature: 32000,
          size: 6.6,
        },
      }, {
        className: 'B Class',
        color: 'bluewhite',
        characteristics: {
          massRange: [2.1, 16],
          possibleResources: [],
          temperature: 15000,
          size: 4.0,
        },
      }, {
        className: 'A Class',
        color: 'white',
        characteristics: {
          massRange: [1.4, 2.1],
          possibleResources: [],
          temperature: 8500,
          size: 1.6,
        },
      }, {
        className: 'F Class',
        color: 'yellowwhite',
        characteristics: {
          massRange: [1.04, 1.4],
          possibleResources: [],
          temperature: 7000,
          size: 1.3,
        },
      }, {
        className: 'G Class',
        color: 'yellow',
        characteristics: {
          massRange: [0.8, 1.04],
          possibleResources: [],
          temperature: 5500,
          size: 1,
        },
      }, {
        className: 'K Class',
        color: 'lightorange',
        characteristics: {
          massRange: [0.45, 0.8],
          possibleResources: [],
          temperature: 4500,
          size: 0.85,
        },
      }, {
        className: 'M Class',
        color: 'orangered',
        characteristics: {
          massRange: [0.08, 0.45],
          possibleResources: [],
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
  get weightedCOList() {
    const newList = [];

    this.celestialObjects.subTypes.forEach((element) => {
      for (let index = 0; index < element.characteristics.occurence; index += 1) {
        newList.push(element.shortName);
      }
    });
    // console.log(newList);
    return newList;
  },
};

export { objectTypes as default };
