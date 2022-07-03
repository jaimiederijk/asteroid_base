import starMap from './models/starmap';

const getDefaultState = () => ({
  id: '',
  name: '',
  settings: {},
  shortName: '',
  sectorsList: [],
  sectorsData: {},
  systemsData: {},
  systemsList: [],
  systemObjectsData: {},
  type: '',
});

const actions = {
  createStarMap({ dispatch, commit, rootState }) {
    console.log('creatmap');
    return dispatch('generateStarMap').then(() => {
      commit('changeSystemView', rootState.map.systemsList[0]);
      console.log('map done');
    });
  },
  generateStarMap({ commit, rootState }) {
    return new Promise((resolve) => {
      commit('createStarMap', rootState.settings);
      resolve();
    });
  },
  changeSystemObjectName({ commit }, payload) {
    commit('changeSystemObjectName', payload);
  },
};

const mutations = {
  createStarMap(state, settings) {
    Object.assign(state, starMap.generateStarMap(settings));
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  changeSystemObjectName(state, payload) {
    state.systemObjectsData[payload.id].name = payload.name;
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
