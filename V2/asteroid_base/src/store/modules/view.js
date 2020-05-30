const getDefaultState = () => ({
  currentView: '',
  objectView: {},
});

const actions = {
  changeSystemView({ commit }, systemId) {
    commit('changeSystemView', systemId);
  },
  changeObjectView({ commit }, object) {
    commit('changeObjectView', object);
  },
  // resetState({ commit }) {
  //   commit('resetState');
  // },
};

const mutations = {
  changeSystemView(state, systemId) {
    state.currentView = systemId;
  },
  changeObjectView(state, object) {
    state.objectView.systemId = object.systemId;
    state.objectView.id = object.objectId;
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
