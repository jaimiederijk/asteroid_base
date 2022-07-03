<template lang="html">
  <section>
    <h2>Blueprints</h2>
    <button type="button" name="button" v-on:click="createNewDesign()">Add design</button>
    <ul>
      <li v-for="designId in designsList" :key="designId">
        <div class="ship-design-view" v-if="!designToEdit || designToEdit === designId">
          <ShipDesignBlueprint
            v-bind:design="designsData[designId]" :designToEdit="designToEdit" :editMode="editMode"
            @selectBlueprintSection="selectBlueprintSection"
            @updateDesignMetaData="updateDesignMetaData"
          />
          <ShipDesignStats
            v-bind:design="designsData[designId]" :designToEdit="designToEdit"
            @updateDesignMetaData="updateDesignMetaData"
          />
          <button
            v-if="!editMode" type="button" name="button"
            v-on:click="editDesign(designId)"
          >
            Edit
          </button>
          <button v-if="editMode" type="button" name="button" v-on:click="exitEdit()">
            Done
          </button>
          <ShipDesignComponentSelector
            v-if="editMode"
            v-bind:selectedBlueprintSection="designSelection"
          />
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ShipDesignBlueprint from './ShipDesignBlueprint';
import ShipDesignStats from './ShipDesignStats';
import ShipDesignComponentSelector from './ShipDesignComponentSelector';

export default {
  name: 'Blueprints',
  data() {
    return {
      designSelection: { componentId: 'non' },
      designToEdit: '',
      editMode: false,
    };
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters([
      'designsList',
      'designsData',
    ]),
  },
  methods: {
    createNewDesign() {
      this.$store.dispatch('createNewDesign').then((id) => this.editDesign(id));
    },
    selectBlueprintSection(component) {
      this.designSelection = component;
    },
    editDesign(designId) {
      this.designToEdit = designId;
      this.editMode = true;
    },
    exitEdit() {
      this.designToEdit = '';
      this.editMode = false;
    },
    updateDesignMetaData(e) {
      const payload = {
        id: e.target.dataset.id,
        value: e.target.value,
        metaType: e.target.dataset.metatype,
      };
      this.$store.dispatch('updateDesignMetaData', payload);
    },
  },
  components: {
    ShipDesignBlueprint,
    ShipDesignStats,
    ShipDesignComponentSelector,
  },
};
</script>

<style lang="scss" scoped>
  ul {
    padding: 0%;
  }
  .ship-design-view {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    position: relative;
    &> button {
      height: 3rem;
      position: absolute;
      bottom: 0.5rem;
      left: calc(25% + 5rem);
      min-width: 4rem;
    }
  }
</style>
