import starMap from './models/starmap';

const getDefaultState = () => ({
  id: '',
  name: '',
  sectors: [],
  settings: {},
  shortName: '',
  systems: [],
  type: '',
});

const actions = {
  createStarMap({ commit, rootState }) {
    console.log('creatmpa');
    commit('createStarMap', rootState.settings);
  },
};

const mutations = {
  createStarMap(state, settings) {
    // state.all.push(...systemGenerator.generateStarMap(settings));
    // state.map = starMap.generateStarMap(settings);
    Object.assign(state, starMap.generateStarMap(settings));
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

const getters = {
  getPlanetarySystemById: (state) => (id) => (
    state.systems.find((system) => system.id === id)
  ),
};

const state = getDefaultState();

export default {
  state,
  actions,
  mutations,
  getters,
};
