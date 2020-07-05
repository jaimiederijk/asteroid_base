const getDefaultState = () => ({
  currentView: '',
  objectView: {},
  currentGameTime: 0,
  paused: true,
});

const actions = {
  changeSystemView({ commit }, systemId) {
    commit('changeSystemView', systemId);
  },
  changeObjectView({ commit }, object) {
    commit('changeObjectView', object);
  },
  progressCurrentGameTime({ commit }) {
    return new Promise((resolve) => {
      commit('incrementCurrentGameTime');
      resolve();
    });
  },
  pause({ commit }) {
    commit('setPause', true);
  },
  unpause({ commit }) {
    commit('setPause', false);
  },
};

const mutations = {
  changeSystemView(state, systemId) {
    state.currentView = systemId;
  },
  changeObjectView(state, object) {
    state.objectView.systemId = object.systemId;
    state.objectView.id = object.objectId;
    state.objectView.name = object.objectName;
  },
  incrementCurrentGameTime(state) {
    state.currentGameTime += 1;
  },
  setPause(state, bool) {
    state.paused = bool;
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

const getters = {
  getCurrentDate: (state) => {
    const year = Math.floor(state.currentGameTime / 12);
    const month = state.currentGameTime - (year * 12) + 1;

    return { y: year, m: month };
  },
};

const state = getDefaultState();

export default {
  state,
  actions,
  mutations,
  getters,
};
