import { v4 as uuidv4 } from 'uuid';
import ManMadeDesign from './models/manmadedesign';
import components from './models/shipcomponents';

const getDefaultState = () => ({
  all: [],
  components,
});

const actions = {
  createNewDesign({ commit }) {
    return new Promise((resolve) => {
      const newId = uuidv4();
      commit('createNewDesign', newId);
      resolve(newId);
    });
  },
  updateDesignMetaData({ commit }, payload) {
    commit('updateDesignMetaData', payload);
  },
  setComponent({ commit }, newComponent) {
    commit('updateDesignComponent', newComponent);
  },
};

const mutations = {
  createNewDesign(state, newId) {
    state.all.push(new ManMadeDesign(newId));
  },
  updateDesignMetaData(state, payload) {
    state.all.find((design) => design.id === payload.id)[payload.metaType] = payload.value;
  },
  updateDesignComponent(state, newComponent) {
    console.log('updades');
    state.all.find((design) => design.id === newComponent.parentId).componentGrid.find(
      (component) => component.id === newComponent.id,
    ).componentId = newComponent.componentId;
  },
};

const getters = {
  designsSortedByCLass: (state) => {
    const designs = state.all;
    designs.sort((a, b) => a.shipClass < b.shipClass);
    return designs;
  },
};

const state = getDefaultState();

export default {
  state,
  actions,
  mutations,
  getters,
};
