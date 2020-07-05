import { v4 as uuidv4 } from 'uuid';
import systemGenerator from './models/system';

const getDefaultState = () => ({
  all: [],
});

const actions = {
  populateNewSystem({ commit, rootState }) {
    return new Promise((resolve) => {
      const payload = {
        newId: uuidv4(),
        settings: rootState.settings,
      };
      commit('populateNewSystem', payload);
      resolve(payload.newId);
    });
  },
  createStarMap({ commit, rootState }) {
    commit('createStarMap', rootState.settings);
  },
  // resetState({ commit }) {
  //   commit('resetState');
  // },
};

const mutations = {
  populateNewSystem(state, payload) {
    const newSystem = systemGenerator.generateNewSystem(payload.settings, payload.newId);
    newSystem.populate(payload.settings.density);
    state.all.push(newSystem);
  },
  createStarMap(state, settings) {
    state.all.push(...systemGenerator.generateStarMap(settings));
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

const getters = {
  getSystemById: (state) => (id) => (
    state.all.find((system) => system.id === id)
  ),
  getObjectById: (state) => (objectView) => {
    const sys = state.all.find((system) => system.id === objectView.systemId);
    const obj = sys.systemObjects.find((object) => object.id === objectView.id);
    return obj;
  },
};

const state = getDefaultState();

export default {
  state,
  actions,
  mutations,
  getters,
};
