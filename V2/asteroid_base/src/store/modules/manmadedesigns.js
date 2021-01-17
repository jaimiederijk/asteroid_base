import ManMadeDesign from './models/manmadedesign';
import components from './models/shipcomponents';

const getDefaultState = () => ({
  all: [],
  components,
});

const actions = {
  createNewDesign({ commit }, object) {
    commit('createNewDesign', object);
  },
  updateDesignMetaData({ commit }, payload) {
    commit('updateDesignMetaData', payload);
  },
  setComponent({ commit }, newComponent) {
    commit('updateDesignComponent', newComponent);
  },
};

const mutations = {
  createNewDesign(state) {
    state.all.push(new ManMadeDesign());
  },
  updateDesignMetaData(state, payload) {
    state.all.find((design) => design.id === payload.id)[payload.metaType] = payload.value;
  },
  updateDesignComponent(state, newComponent) {
    state.all.find((design) => design.id === newComponent.parentId).componentGrid.find(
      (component) => component.id === newComponent.id,
    ).componentId = newComponent.componentId;
  },
};

const getters = {
  designsSortedByCLass: (state) => {
    const designs = state.all;
    designs.sort((a, b) => a.shipClass < b.shipClass);
    return designs;
  },
};

const state = getDefaultState();

export default {
  state,
  actions,
  mutations,
  getters,
};
