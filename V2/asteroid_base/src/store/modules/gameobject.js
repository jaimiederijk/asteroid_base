import { v4 as uuidv4 } from 'uuid';

class GameObject {
  constructor(type) {
    this.id = uuidv4();
    this.type = type;
    this.name = this.makeName();
  }

  makeName() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let typeCharacter = '';

    switch (this.type) {
      case 'star':
        typeCharacter = 'STA';
        break;
      case 'comet':
        typeCharacter = 'COM';
        break;
      case 'meteoroid':
        typeCharacter = 'MET';
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
}

export { GameObject as default };
