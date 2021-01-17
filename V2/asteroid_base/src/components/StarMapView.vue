<template>
  <section>
    <!-- <h2>starmap</h2> -->
    <ul>
      <li v-for="system in systems"
      :key="system.id"
      v-bind:style="{
        left: system.coordinates.x  + 'px' , top: system.coordinates.y  + 'px'
      }">
        <p>{{ system.name }}</p>
        <p>{{ system.systemsAddedV }}</p>
      </li>
    </ul>
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
  section {
    width: 100%;
    overflow: scroll;
    height: 70vh;
  }
  ul {
    position: relative;
    width: 10000px;
    height: 10000px;
  }
  li {
    position: absolute;
  }
</style>
