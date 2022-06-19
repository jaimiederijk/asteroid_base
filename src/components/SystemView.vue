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
        // if (currentSystem.objectData[id] === this.activeObjectCard.id) {
        //   currentSystem.objectData[id].selected = true;
        // } else {
        //   currentSystem.objectData[id].selected = false;
        // }
      });

      return currentSystem;
    },
  },
  methods: {
    ...mapActions([
      'changeSystemView',
    ]),
    changeActiveObjectCard(obj) {
      this.activeObjectCard = obj;
      this.combinedSystemInfo.data.systemObjectsList.forEach((id) => {
        // debugger;
        if (id === this.activeObjectCard.id) {
          this.combinedSystemInfo.objectData[id].selected = true;
        } else {
          this.combinedSystemInfo.objectData[id].selected = false;
        }
      });
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
