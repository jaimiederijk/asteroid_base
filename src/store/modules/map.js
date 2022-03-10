import starMap from './models/starmap';

const getDefaultState = () => ({
  id: '',
  name: '',
  sectors: [], // dep
  settings: {},
  shortName: '',
  systems: [], // dep
  sectorsList: [],
  sectorsData: {},
  systemsData: {},
  systemsObjectsData: {},
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
