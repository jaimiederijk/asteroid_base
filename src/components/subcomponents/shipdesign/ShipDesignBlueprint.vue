<template lang="html">
  <div class="ship_design_blueprint">
    <h3 v-if="!designToEdit">{{ design.name }}</h3>
    <input v-if="designToEdit" type="text"
      :id="'name' + design.id"
      :value="design.name"
      @change="updateDesignMetaData"
      :data-id="design.id"
      data-metatype="name"
    >
    <table>
      <tr v-for="n in design.gridSize.y" :key="n">
        <td
          :class="component.id === selectedComponent ? 'active': ''"
          v-for="component in rowComponents[n-1]" :key="component.id"
          v-on:click="selectThisSection(component)"
          >
          <ShipDesignBlueprintComponent :design="component" :n="n"/>
        </td>
      </tr>
    </table>
    <div class="background_blueprint"></div>
  </div>
</template>

<script>
import ShipDesignBlueprintComponent from './ShipDesignBlueprintComponent';

export default {
  name: 'ShipDesignBlueprint.vue',
  props: {
    design: {},
    designToEdit: {},
  },
  data() {
    return {
      selectedComponent: '',
    };
  },
  computed: {
    rowComponents() {
      const { componentGrid } = this.design;
      const componentsPerRow = {};

      for (let i = 0; i < this.design.gridSize.y; i += 1) {
        componentsPerRow[i] = componentGrid.filter((component) => component.placement.y === i);
      }

      return componentsPerRow;
    },
  },
  methods: {
    selectThisSection(component) {
      this.selectedComponent = component.id;
      this.$emit('selectBlueprintSection', component);
    },
    updateDesignMetaData(e) {
      this.$emit('updateDesignMetaData', e);
    },
  },
  components: {
    ShipDesignBlueprintComponent,
  },
};
</script>

<style lang="scss" scoped>
  .background_blueprint {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background:
      repeating-linear-gradient(
        to bottom,
        rgba(240,240,240,1) 2.38%,
        transparent 2.38%,
        transparent 50%,
        rgba(240,240,240,1) 50%,
        rgba(240,240,240,1) 52.38%,
        transparent 52.38%,
        transparent 100%,
      ),
      repeating-linear-gradient(
        to right,
        rgba(240,240,240,1) 2.38%,
        transparent 2.38%,
        transparent 50%,
        rgba(240,240,240,1) 50%,
        rgba(240,240,240,1) 52.38%,
        transparent 52.38%,
        transparent 100%,
      )
    ;
    background-size: 5vw 5vw;
    opacity: 0.5;
  }
  .ship_design_blueprint {
    h3 {
      color: white;
      text-align: left;
      &:hover {
        color: red;
      }
    }
    width: 50%;
    background-color: blue;
    position: relative;
    padding: 0.5rem 2rem 2rem 2rem;
  }
  table {
    table-layout: fixed;
    border-collapse: collapse;
    td {
      padding: 0;
      position: relative;
      z-index: 91;
      white-space: nowrap;
      &:hover {
        background-color: rgba(230,230,230,0.5);
      }
    }
  }
  input {
    position: relative;
    z-index: 99;
    display: block;
    padding: 0.5rem;
    background: transparent;
    border: none;
    color: white;
    font-size: 1.1em;
    outline: solid white 1px;
  }
  .active {
    outline: solid red 1px;
  }
</style>
