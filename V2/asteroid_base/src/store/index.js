import Vue from 'vue';
import Vuex from 'vuex';
import systemgenerator from './modules/worldgenerator';
import Character from './modules/character';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    systems: [
    ],
    characters: [
    ],
  },
  mutations: {
    populateNewSystem(state) {
      state.systems.push(systemgenerator());
    },
    createNewCharacter(state, character) {
      state.characters.push(new Character(character));
    },
    changeLastName(state, character) {
      character.changeLastName('gree');
    },
  },
  actions: {
    populateNewSystem({ commit }) {
      commit('populateNewSystem');
    },
    createNewCharacter({ commit }, character) {
      commit('createNewCharacter', character);
    },
    changeLastName({ commit }, character) {
      commit('changeLastName', character);
    },
  },
  getters: {
    // getObject: (state) => (sysid, objid) => {
    //   const sys = state.systems.find((system) => system.id === sysid);
    //   return sys.systemObjects.find((object) => object.id === objid);
    // },
  },
  modules: {
  },
});
