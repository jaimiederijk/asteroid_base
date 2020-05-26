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
  // resetState({ commit }) {
  //   commit('resetState');
  // },
};

const mutations = {
  populateNewSystem(state, payload) {
    state.all.push(systemGenerator.generateNewSystem(payload.settings, payload.newId));
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

const getters = {
  getSystemById: (state) => (id) => (
    state.all.find((system) => system.id === id)
  ),
};

const state = getDefaultState();

export default {
  state,
  actions,
  mutations,
  getters,
};
