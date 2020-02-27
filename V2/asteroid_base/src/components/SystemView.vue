<template>
  <div class="SystemView">
    <button v-on:click="populateNewSystem()">start</button>
    <ul>
      <li
        v-for="system in systems"
        :key="system.systemName">
        <h2>{{ system.systemName }}</h2>
        <ul>
          <li v-for="object in system.systemObjects"
          :key="object.name">
            <button v-on:click="clickObject()" name="button">{{ object.name }}</button>
          </li>
        </ul>
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
  methods: {
    ...mapActions(['populateNewSystem',
    ]),
    clickObject: () => {
      console.log('df');
    },
  },
};
</script>

<style lang="css" scoped>
</style>
