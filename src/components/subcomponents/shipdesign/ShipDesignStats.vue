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
    <div class="stats">
      <span>Acceleration: </span><span>{{ design.stats.acceleration }} km/s</span>
      <span>HP: </span><span>{{ design.stats.hp }}</span>
      <span>Armor: </span><span>{{ design.stats.armor }}</span>
      <span>Damage output:</span><span>{{ design.stats.damage }}</span>
      <span>Max range:</span><span>{{ design.stats.range }}</span>
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
    .stats {
      span {
      }
    }
    div {
      font-size: 0.8em;
      span {
        text-align: right;
      }
    }
  }
</style>
