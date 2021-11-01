class GameObject {
  constructor(type, id, shortName) {
    this.id = id;
    this.type = type;
    this.shortName = shortName;
    this.name = this.makeName();
  }

  makeName() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let typeCharacter = '';

    if (typeof this.shortName !== 'undefined') {
      typeCharacter = this.shortName;
    } else {
      typeCharacter = 'UNI';
    }

    result += typeCharacter;
    result += '-';
    for (let i = 0; i < 3; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static getRandomNumber(min, max, precision) {
    const decimal = precision;
    const minRange = Math.ceil(min * decimal);
    const maxRange = Math.floor(max * decimal);

    return (Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange) / decimal;
  }

  static checkIfObjectIsNear(listOfObject, theObject, collisionRadius) {
    const li = listOfObject;
    const ob = theObject;
    const colRad = collisionRadius;

    const checkCollision = (p1x, p1y, r1, p2x, p2y, r2) => (
      (r1 + r2) ** 2 > (p1x - p2x) ** 2 + (p1y - p2y) ** 2
    );

    for (let i = 0; i < li.length; i += 1) {
      if (checkCollision(li[i].x, li[i].y, colRad, ob.x, ob.y, colRad)) {
        return true; // object is near
      }
    }
    return false; // object is not near anything
  }

  static getRandomObjectOffType(objectList) {
    const objectTypesAmount = objectList.subTypes.length;
    const objectTypeIndex = Math.floor(Math.random() * objectTypesAmount);
    const chosenObject = objectList.subTypes[objectTypeIndex];

    return chosenObject;
  }
}

export { GameObject as default };
