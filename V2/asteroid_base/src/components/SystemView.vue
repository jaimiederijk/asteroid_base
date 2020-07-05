<template>
  <div>
    <button v-on:click="populateNewSystem()">start</button>
    <SystemMap
      v-bind:system="getSystemById(view.currentView)"
      v-on:changeActiveObject="changeActiveObject"
    />
    <ObjectCard
      v-bind:object="objectActive"
    />
    <ul>
      <li
        v-for="system in systems"
        :key="system.id">
        <button
          type="button"
          name="button"
          v-on:click="changeSystemView(system.id)"
        >
          {{ system.name }}
        </button>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import ObjectCard from '@/components/subcomponents/ObjectCard';
import SystemMap from '@/components/subcomponents/SystemMap';


export default {
  name: 'SystemView',
  data() {
    return {
      objectActive: {},
    };
  },
  props: {
  },
  computed: {
    ...mapState({
      systems: (state) => state.systems.all,
      characters: (state) => state.characters,
      settings: (state) => state.settings,
      view: (state) => state.view,
    }),
    ...mapGetters([
      'getSystemById',
    ]),
  },
  methods: {
    ...mapActions([
      'populateNewSystem',
      'changeSystemView',
    ]),
    changeActiveObject(obj, systemId) {
      this.objectActive = obj;
      this.objectActive.systemId = systemId;
    },
  },
  components: {
    ObjectCard,
    SystemMap,
  },
};
</script>

<style lang="scss">

</style>
