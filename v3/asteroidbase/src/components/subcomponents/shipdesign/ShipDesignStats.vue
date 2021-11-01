<template lang="html">
  <section>
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

</style>
