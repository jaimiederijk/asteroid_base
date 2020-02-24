import Vue from 'vue';
import Vuex from 'vuex';
import systemgenerator from './modules/worldgenerator';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    systems: [
    ],
  },
  mutations: {
    populateNewSystem(state) {
      state.systems.push(systemgenerator());
    },
  },
  actions: {
    populateNewSystem({ commit }) {
      commit('populateNewSystem');
    },
  },
  modules: {
  },
});
