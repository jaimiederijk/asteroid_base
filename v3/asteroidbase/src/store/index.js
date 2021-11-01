import { createStore } from 'vuex';

import settings from './modules/settings';
import characters from './modules/characters';
// import systems from './modules/systems';
import map from './modules/map';
import view from './modules/view';
import nations from './modules/nations';
import designs from './modules/manmadedesigns';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    // reset gamestate in all neccesery modules
    resetState({ commit }) {
      commit('resetState');
    },
    async progressTime({ dispatch, state }) {
      await dispatch('progressCurrentGameTime');
      if (!state.view.paused) {
        dispatch('progressTime');
      }
    },
  },
  modules: {
    settings,
    characters,
    // systems,
    map,
    view,
    nations,
    designs,
  },
});
