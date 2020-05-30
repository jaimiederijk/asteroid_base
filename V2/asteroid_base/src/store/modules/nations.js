const getDefaultState = () => ({
  all: [],
});

const actions = {

};

const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

const state = getDefaultState();

export default {
  state,
  actions,
  mutations,
};
