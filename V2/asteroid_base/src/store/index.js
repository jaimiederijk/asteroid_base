import Vue from 'vue';
import Vuex from 'vuex';
// import systemGenerator from './modules/models/system';
// import Character from './modules/character';
import settings from './modules/settings';
import characters from './modules/characters';
import systems from './modules/systems';
import view from './modules/view';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    // reset gamestate in all neccesery modules
    resetState({ commit }) {
      commit('resetState');
    },
  },
  modules: {
    settings,
    characters,
    systems,
    view,
  },
});
