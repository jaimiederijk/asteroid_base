import Nation from './models/nations';

const getDefaultState = () => ({
  all: [],
  currentGameTime: 0,
});

const actions = {
  progressCurrentGameTime({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('incrementnatGameTime');
        resolve();
      }, 2000);
    });
  },
  createNewNation({ commit }, nation) {
    commit('createNewNation', nation);
  },
};

const mutations = {
  incrementnatGameTime(state) { // all game loop stuff goes here
    state.currentGameTime += 1;
  },
  createNewNation(state, nation) {
    state.all.push(new Nation(nation));
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

const getters = {
  getPlayerNation: (state) => (
    state.all.find((nation) => nation.playerLed)
  ),
};

const state = getDefaultState();

export default {
  state,
  actions,
  mutations,
  getters,
};
