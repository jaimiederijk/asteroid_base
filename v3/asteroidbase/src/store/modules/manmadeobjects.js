import { v4 as uuidv4 } from 'uuid';
import ManMadeDesign from './models/manmadedesign';

const getDefaultState = () => ({
  all: [],
});

const actions = {
  createNewObject({ commit }) {
    return new Promise((resolve) => {
      const newId = uuidv4();
      commit('createNewObject', newId);
      resolve(newId);
    });
  },
  updateObject({ commit }, payload) {
    commit('updateObject', payload);
  },
  destroyObject({ commit }, newComponent) {
    commit('updateDesignComponent', newComponent);
  },
};

const mutations = {
  createNewObject(state, newId) {
    state.all.push(new ManMadeDesign(newId));
  },
  updateObject(state, payload) {
    state.all.find((design) => design.id === payload.id)[payload.metaType] = payload.value;
  },
  destroyObject(state, newComponent) {
    state.all.find((design) => design.id === newComponent.parentId).componentGrid.find(
      (component) => component.id === newComponent.id,
    ).componentId = newComponent.componentId;
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

const getters = {
  objectsByLocation: (state) => (location) => (
    state.all.find((manMadeObject) => manMadeObject.location === location)
  ),
  objectsById: (state) => (id) => (
    state.all.find((manMadeObject) => manMadeObject.id === id)
  ),
};

const state = getDefaultState();

export default {
  state,
  actions,
  mutations,
  getters,
};
