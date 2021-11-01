<template lang="html">
  <section>
    <h2>Blueprints</h2>
    <button type="button" name="button" v-on:click="createNewDesign()">Add design</button>
    <ul>
      <li v-for="design in designsSortedByCLass" :key="design.id">
        <div class="ship-design-view" v-if="!designToEdit || designToEdit === design.id">
          <ShipDesignBlueprint
            v-bind:design="design" :designToEdit="designToEdit"
            @selectBlueprintSection="selectBlueprintSection"
            @updateDesignMetaData="updateDesignMetaData"
          />
          <ShipDesignStats
            v-bind:design="design" :designToEdit="designToEdit"
            @updateDesignMetaData="updateDesignMetaData"
          />
          <button
            v-if="!designToEdit" type="button" name="button"
            v-on:click="editDesign(design.id)"
          >
            Edit
          </button>
          <button v-if="designToEdit" type="button" name="button" v-on:click="editDesign(false)">
            Save design
          </button>
          <ShipDesignComponentSelector
            v-if="designToEdit"
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
      designToEdit: false,
    };
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters([
      'designsSortedByCLass',
    ]),

  },
  methods: {
    createNewDesign() {
      this.$store.dispatch('createNewDesign').then((id) => this.editNewDesign(id));
    },
    editNewDesign(id) {
      this.designToEdit = id;
    },
    selectBlueprintSection(component) {
      this.designSelection = component;
    },
    editDesign(design) {
      this.designToEdit = design;
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

<style lang="css" scoped>
  .ship-design-view {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }
</style>
