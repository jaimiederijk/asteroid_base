const actions = {
  setGameSettings({ commit }, settings) {
    commit('setGameSettings', settings);
  },
};

const mutations = {
  setGameSettings(state, settings) {
    state.density = settings.density;
    state.systemAmount = 10;
    state.starMapSize = 1000;
    state.difficulty = settings.difficulty;
  },
};

const state = () => ({
  density: 10,
  difficulty: 'normal',
});

export default {
  state,
  actions,
  mutations,
};
