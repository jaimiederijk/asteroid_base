<template lang="html">
  <div>
    <h2>ship designer</h2>
    <button type="button" name="button" v-on:click="createNewDesign()">
      Add design
    </button>
    <ul>
      <li
        v-for="design in designsSortedByCLass"
        :key="design.id">
        <form v-on:submit.prevent="submit">
          <label :for="'class' + design.id">Class</label>
          <input
            :id="'class' + design.id" type="text"
            :value="design.shipClass"
            @change="updateDesignMetaData"
            :data-id="design.id"
            data-metaType="shipClass"
          >
          <label :for="'name' + design.id">Name</label>
          <input type="text"
            :id="'name' + design.id"
            :value="design.name"
            @change="updateDesignMetaData"
            :data-id="design.id"
            data-metatype="name"
          >
        </form>
        <div class="ship-design-view">
          <ShipDesignBlueprint
            v-bind:design="design"
            @selectBlueprintSection="selectBlueprintSection"
          />
          <DesignComponentSelector v-bind:selectedBlueprintSection="designSelection"/>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import ShipDesignBlueprint from '@/components/subcomponents/ShipDesignBlueprint';
import DesignComponentSelector from '@/components/subcomponents/DesignComponentSelector';

export default {
  name: 'ShipDesigner',
  data() {
    return {
      designSelection: { componentId: 'non' },
    };
  },
  computed: {
    ...mapState({
      designs: (state) => state.designs.all,
    }),
    ...mapGetters([
      'designsSortedByCLass',
    ]),
  },
  methods: {
    ...mapActions([
      'createNewDesign',
    ]),
    updateDesignMetaData(e) {
      const payload = {
        id: e.target.dataset.id,
        value: e.target.value,
        metaType: e.target.dataset.metatype,
      };
      this.$store.dispatch('updateDesignMetaData', payload);
    },
    selectBlueprintSection(component) {
      this.designSelection = component;
    },
  },
  components: {
    ShipDesignBlueprint,
    DesignComponentSelector,
  },
};
</script>

<style lang="scss" scoped>

  .ship-design-view {
    display: flex;
  }
</style>
