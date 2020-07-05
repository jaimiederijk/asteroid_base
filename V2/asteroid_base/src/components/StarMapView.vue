<template>
  <section>
    <h2>starmap</h2>
    <div v-for="system in systems"
    :key="system.id"
    v-bind:style="{
      left: system.starMapCoordinates.x  + 'px' , top: system.starMapCoordinates.y  + 'px'
    }">
      {{ system.name }}
      {{ system.starMapCoordinates }}
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
