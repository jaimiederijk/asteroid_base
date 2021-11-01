<template>
  <div>
    <SystemMap
      v-bind:system="getPlanetarySystemById(view.currentView)"
      v-on:changeActiveObject="changeActiveObject"
    />
    <ObjectCard
      v-bind:object="objectActive"
    />
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
      map: (state) => state.map,
      characters: (state) => state.characters,
      settings: (state) => state.settings,
      view: (state) => state.view,
    }),
    ...mapGetters([
      'getPlanetarySystemById',
    ]),
  },
  methods: {
    ...mapActions([
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
