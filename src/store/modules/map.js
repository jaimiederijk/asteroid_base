import starMap from './models/starmap';

const getDefaultState = () => ({
  id: '',
  name: '',
  settings: {},
  shortName: '',
  sectorsList: [],
  sectorsData: {},
  systemsData: {},
  systemObjectsData: {},
  type: '',
});

const actions = {
  createStarMap({ commit, rootState }) {
    console.log('creatmap');
    commit('createStarMap', rootState.settings);
  },
};

const mutations = {
  createStarMap(state, settings) {
    Object.assign(state, starMap.generateStarMap(settings));
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

const getters = {
  getPlanetarySystemById: (state) => (id) => (
    state.systemsData[id]
  ),
};

const state = getDefaultState();

export default {
  state,
  actions,
  mutations,
  getters,
};
