<template lang="html">
  <div>
    <!-- !!!!change this to take component.img -->
    <img v-bind:src="'/shipdesign/' + design.componentId + '.svg'">
  </div>
</template>

<script>
export default {
  name: 'ShipDesignBlueprintComponent',
  props: {
    design: {},
    n: Number,
  },
  methods: {
  },
};
</script>

<style lang="css" scoped>
  p {
    color: white;
    font-size: 3em;
  }
  img {
    width: 100%;
    display: block;
  }
</style>
