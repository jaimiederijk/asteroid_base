import Character from './models/character';

const getDefaultState = () => ({
  all: [],
});

const actions = {
  createNewCharacter({ commit }, character) {
    commit('createNewCharacter', character);
  },
  changeLastName({ commit }, character) {
    commit('changeLastName', character);
  },
};

const mutations = {
  createNewCharacter(state, character) {
    state.all.push(new Character(character));
  },
  changeLastName(state, character) {
    character.changeLastName('gree');
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

const getters = {
  getCharacterWithJob: (state) => (job) => (
    state.all.find((character) => character.job === job)
  ),
};

const state = getDefaultState();

export default {
  state,
  actions,
  mutations,
  getters,
};
