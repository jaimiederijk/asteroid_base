// import { v4 as uuidv4 } from 'uuid';
import components from './shipcomponents';

const baseDesignData = {
  ships: {
    shipSizeList: ['small'],
    small: {
      shipList: ['frigate', 'largeFrigate'],
      frigate: {
        gridSize: { x: 5, y: 4 },
        shipClass: 'frigate',
        design: [
          {
            id: '0-1',
            componentId: 'top_engine',
            componentClass: 'engine',
            editable: false,
          }, {
            id: '1-1',
            componentId: 'top_genneric1',
            componentClass: 'hull',
            editable: false,
          }, {
            id: '2-1',
            componentId: 'top_turretmount',
            componentClass: 'hull',
            editable: false,
          }, {
            id: '3-1',
            componentId: 'top_command',
            componentClass: 'hull',
            editable: false,
          }, {
            id: '4-1',
            componentId: 'top_front',
            componentClass: 'hull',
            editable: false,
          }, {
            id: '0-2',
            componentId: 'bottom_engine',
            componentClass: 'engine',
            editable: false,
          }, {
            id: '1-2',
            componentId: 'bottom_cargo',
            componentClass: 'hull',
            editable: false,
          }, {
            id: '2-2',
            componentId: 'bottom_turretmount',
            componentClass: 'hull',
            editable: false,
          }, {
            id: '3-2',
            componentId: 'bottom_genneric1',
            componentClass: 'hull',
            editable: false,
          }, {
            id: '4-2',
            componentId: 'bottom_front',
            componentClass: 'hull',
            editable: false,
          }, {
            id: '2-0',
            componentId: 'top_small_gun_turret',
            componentClass: 'small_gun_turret_top',
            editable: true,
          }, {
            id: '2-3',
            componentId: 'bottom_small_gun_turret',
            componentClass: 'small_gun_turret_bottom',
            editable: true,
          },
        ],
      },
      largeFrigate: {
        gridSize: { x: 7, y: 4 },
        shipClass: 'frigate',
      },
    },
  },
};

// designs for all objects that are not natural
class ManMadeDesign {
  constructor(id) {
    this.id = id;
    this.name = 'New Ship 1';
    this.gridSize = baseDesignData.ships.small.frigate.gridSize;
    this.status = 'wip';
    this.shipClass = 'new';
    this.stats = {};
    this.componentGrid = this.populateGrid();
  }

  populateGrid() {
    const componentGrid = [];
    const designId = this.id;

    function emptyComponent(x, y) {
      const component = {
        id: `${x}-${y}`,
        parentId: designId,
        componentId: 'empty',
        componentClass: 'empty',
        img: '/shipdesign/empty.svg',
        editable: false,
        placement: { x, y },
      };
      return component;
    }

    for (let y = 0; y < this.gridSize.y; y += 1) {
      for (let x = 0; x < this.gridSize.x; x += 1) {
        componentGrid.push(emptyComponent(x, y));
      }
    }

    baseDesignData.ships.small.frigate.design.forEach((component) => {
      const index = componentGrid.findIndex((gridComponent) => gridComponent.id === component.id);
      const baseComp = { ...component, ...components.data[component.componentId] };

      if (!baseComp.editable) {
        baseComp.img = `/shipdesign/${baseComp.componentId}.svg`;
      }

      componentGrid[index] = { ...componentGrid[index], ...baseComp };
    });

    return componentGrid;
  }
}

export { ManMadeDesign as default };
