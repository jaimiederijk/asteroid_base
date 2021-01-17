<template lang="html">
  <div class="">
    <h3>selected component</h3>
    <p>{{ selectedBlueprintSection.componentId }}</p>
    <span>{{ selectedBlueprintSection.placement }}</span>
    <h3>Component list</h3>
    <ul class="components_list">
      <li v-for="component in components.small" :key="component.id">
        <button type="button" name="button" v-on:click="selectComponent(component)">
          <div class="component_infobox">
            <p>{{ component.name }}</p>
          </div>
          <img :src="'/shipdesign/' + component.img" :alt="component.name">
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DesignComponentSelector',
  props: {
    selectedBlueprintSection: {
      type: Object,
    },
  },
  computed: {
    components() {
      return this.$store.state.designs.components;
    },
  },
  methods: {
    selectComponent(component) {
      const newComponent = this.selectedBlueprintSection;
      newComponent.componentId = component.id;
      return this.$store.dispatch('setComponent', newComponent);
    },
  },
};
</script>

<style lang="scss" scoped>
  h3 {
    color: red;
  }
  button {
    display: flex;
    justify-content: space-between;
    .component_infobox {
      width: 45%;
      text-align: left;
      border: solid white 1px;
      * {
        padding: 0 1rem;
      }
    }
    img {
      width: 50%;
    }
  }
</style>
