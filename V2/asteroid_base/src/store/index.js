import Vue from 'vue';
import Vuex from 'vuex';
import systemGenerator from './modules/system';
import Character from './modules/character';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    systems: [
    ],
    characters: [
    ],
    settings: {
    },
  },
  mutations: {
    populateNewSystem(state) {
      state.systems.push(systemGenerator.generateNewSystem(state.settings));
    },
    createNewCharacter(state, character) {
      state.characters.push(new Character(character));
    },
    changeLastName(state, character) {
      character.changeLastName('gree');
    },
    setGameSettings(state, settings) {
      state.settings = settings;
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
    setGameSettings({ commit }, settings) {
      commit('setGameSettings', settings);
    },
  },
  getters: {
    getCharacterWithJob: (state) => (job) => {
      console.log(job);
      return state.characters.find((character) => character.job === job);
    },
    // getObject: (state) => (sysid, objid) => {
    //   const sys = state.systems.find((system) => system.id === sysid);
    //   return sys.systemObjects.find((object) => object.id === objid);
    // },
  },
  modules: {
  },
});
