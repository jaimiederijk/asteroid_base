<template>
  <section>
    <h2>starmap</h2>
    <div v-for="system in systems"
    :key="system.id"
    v-bind:style="{
      left: system.coordinates.x  + 'px' , top: system.coordinates.y  + 'px'
    }">
      <p>{{ system.name }}</p>
      <p>{{ system.systemsAddedV }}</p>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'StarMapView.vue',
  computed: {
    ...mapState({
      systems: (state) => state.systems.all,
    }),
  },
};
</script>

<style lang="css" scoped>
  div {
    position: absolute;
  }
</style>
