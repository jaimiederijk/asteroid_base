<template>
  <div>
    <SystemMap
      v-bind:system="combinedSystemInfo"
      v-on:changeActiveObjectCard="changeActiveObjectCard"
    />
    <ObjectCard
      v-bind:activeObject="activeObjectCard"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import ObjectCard from '@/components/subcomponents/common/ObjectCard';
import SystemMap from '@/components/subcomponents/SystemMap';

export default {
  name: 'SystemView',
  data() {
    return {
      activeObjectCard: {},
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
    combinedSystemInfo() {
      const currentSystem = {
        data: this.map.systemsData[this.view.currentView],
        objectData: {},
      }; // new object to be filled

      const { systemObjectsList } = this.map.systemsData[this.view.currentView];
      const { systemObjectsData } = this.map; // object that I want to extract from

      systemObjectsList.forEach((id) => {
        currentSystem.objectData[id] = systemObjectsData[id];
      });

      return currentSystem;
    },
  },
  methods: {
    ...mapActions([
      'changeSystemView',
    ]),
    changeActiveObjectCard(obj, systemId) {
      this.activeObjectCard = obj;
      this.activeObjectCard.systemId = systemId;
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
