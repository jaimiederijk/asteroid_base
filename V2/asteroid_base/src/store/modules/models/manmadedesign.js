import { v4 as uuidv4 } from 'uuid';

// designs for all objects that are not natural
class ManMadeDesign {
  constructor() {
    this.id = uuidv4();
    this.name = 'New Ship 1';
    this.gridSize = { x: 7, y: 5 };
    this.status = 'wip';
    this.shipClass = 'new';
    this.componentGrid = this.populateGrid();
  }

  populateGrid() {
    const componentGrid = [];
    const designId = this.id;

    function emptyComponent(x, y) {
      const component = {
        id: uuidv4(),
        parentId: designId,
        componentId: 'empty',
        placement: { x, y },
      };
      return component;
    }

    for (let y = 0; y < this.gridSize.y; y += 1) {
      for (let x = 0; x < this.gridSize.x; x += 1) {
        componentGrid.push(emptyComponent(x, y));
      }
    }

    return componentGrid;
  }
}

export { ManMadeDesign as default };
