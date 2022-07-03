<template lang="html">
  <div :class="editable ? 'editable' : ''">
    <!-- !!!!change this to take component.img -->
    <img v-bind:src="design.img">
  </div>
</template>

<script>
export default {
  name: 'ShipDesignBlueprintComponent',
  props: {
    design: {},
    n: Number,
    editMode: Boolean,
  },
  computed: {
    editable() {
      return this.editMode && this.design.editable;
    },
  },
  methods: {
  },
};
</script>

<style lang="css" scoped>
  .editable {
    outline: dashed 2px white;
  }
  p {
    color: white;
    font-size: 3em;
  }
  img {
    width: 100%;
    display: block;
  }
</style>
