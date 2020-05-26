const getDefaultState = () => ({
  currentView: '',
});

const actions = {
  changeSystemView({ commit }, systemId) {
    commit('changeSystemView', systemId);
  },
  // resetState({ commit }) {
  //   commit('resetState');
  // },
};

const mutations = {
  changeSystemView(state, systemId) {
    state.currentView = systemId;
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

const getters = {

};

const state = getDefaultState();

export default {
  state,
  actions,
  mutations,
  getters,
};
