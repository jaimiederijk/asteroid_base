<template>
  <div class="SystemView">
    <button v-on:click="populateNewSystem()">start</button>
    <ul>
      <li
        v-for="system in systems"
        :key="system.systemName">
        {{ system.systemName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';


export default {
  name: 'SystemView',
  props: {
  },
  computed: mapState({
    systems: (state) => state.systems,
  }),
  methods: mapActions([
    'populateNewSystem',
  ]),
};
</script>

<style lang="css" scoped>
</style>
