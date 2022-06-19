<template lang="html">
  <section class="design-stats">
    <p v-if="!designToEdit">Class: {{ design.shipClass }}</p>
    <div v-if="designToEdit">
      <label :for="'class' + design.id">Class</label>
      <input
        :id="'class' + design.id" type="text"
        :value="design.shipClass"
        @change="updateDesignMetaData"
        :data-id="design.id"
        data-metaType="shipClass"
      >
    </div>
    <div>
      <p>Acceleration: <span>10km/s</span></p>
      <p>Armor: <span>10km/s</span></p>
      <p>Damage output:</p>
      <p>Max range:</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ShipDesignStats',
  props: {
    design: {},
    designToEdit: {},
  },
  methods: {
    updateDesignMetaData(e) {
      this.$emit('updateDesignMetaData', e);
    },
  },
};
</script>

<style lang="scss" scoped>
  .design-stats {
    background-color: $color_blueprint;
    padding: 0.5rem 1rem;
    color: $color_text;
    border: solid 2px $color_text;
    border-radius: 3px;
    text-align: left;
    div {
      font-size: 0.8em;
      span {
        text-align: right;
      }
    }
  }
</style>
