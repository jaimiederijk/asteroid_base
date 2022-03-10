import { v4 as uuidv4 } from 'uuid';
import GameObject from './gameobject';

class ManMadeObject extends GameObject {
  constructor(objectType) {
    super(objectType.className, uuidv4(), objectType.shortName, 'ManMadeObject');
  }
}

export { ManMadeObject as default };
