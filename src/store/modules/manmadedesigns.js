import { v4 as uuidv4 } from 'uuid';
import ManMadeDesign from './models/manmadedesign';
import components from './models/shipcomponents';

const getDefaultState = () => ({
  all: {
    designsList: [],
    designsData: {},
  },
  components,
});

const actions = {
  createNewDesign({ commit, dispatch }) {
    return new Promise((resolve) => {
      const newId = uuidv4();
      commit('createNewDesign', newId);
      dispatch('updateStats', newId);
      resolve(newId);
    });
  },
  updateDesignMetaData({ commit }, payload) {
    commit('updateDesignMetaData', payload);
  },
  setComponent({ commit, dispatch }, newComponent) {
    commit('updateDesignComponent', newComponent);
    dispatch('updateStats', newComponent.parentId);
  },
  updateStats({ commit }, id) {
    commit('updateStats', id);
  },
};

const mutations = {
  createNewDesign(state, newId) {
    state.all.designsData = { ...state.all.designsData, ...{ [newId]: new ManMadeDesign(newId) } };
    // Object.assign(state.designsData, { newId: new ManMadeDesign(newId) });
    state.all.designsList.push(newId);
  },
  updateDesignMetaData(state, payload) {
    state.all.designsData[payload.id][payload.metaType] = payload.value;
  },
  updateDesignComponent(state, newComponent) {
    console.log('update comp');

    const index = state.all.designsData[newComponent.parentId].componentGrid.findIndex(
      (component) => component.id === newComponent.id,
    );
    const newComp = state.components.data[newComponent.componentId];

    state.all.designsData[newComponent.parentId].componentGrid[index] = {
      ...state.all.designsData[newComponent.parentId].componentGrid[index], ...newComp,
    };
  },
  updateStats(state, id) {
    const design = state.all.designsData[id];
    const stats = {
      hp: 0,
      armor: 0,
      acceleration: 0,
      range: 0,
      damage: 0,
    };

    design.componentGrid.forEach((comp) => {
      if (Object.prototype.hasOwnProperty.call(comp, 'hp')) {
        stats.hp += comp.hp;
      }
      if (Object.prototype.hasOwnProperty.call(comp, 'armor')) {
        stats.armor += comp.armor;
      }
      if (Object.prototype.hasOwnProperty.call(comp, 'acceleration')) {
        stats.acceleration += comp.acceleration;
      }
      if (Object.prototype.hasOwnProperty.call(comp, 'range')) {
        stats.range += comp.range;
      }
      if (Object.prototype.hasOwnProperty.call(comp, 'damage')) {
        stats.damage += comp.damage;
      }
    });

    state.all.designsData[id].stats = stats;
  },
};

const getters = {
  designsSortedByCLass: (state) => { // Get sorting working again
    const designs = state.all;
    // designs.sort((a, b) => a.shipClass < b.shipClass);
    return designs;
  },
  designsList: (state) => state.all.designsList,
  designsData: (state) => state.all.designsData,
};

const state = getDefaultState();

export default {
  state,
  actions,
  mutations,
  getters,
};
