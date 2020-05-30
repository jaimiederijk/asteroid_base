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
}

export { GameObject as default };
