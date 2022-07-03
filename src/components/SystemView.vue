<template>
  <div>
    <SystemMap
      v-bind:system="combinedSystemInfo"
      v-on:changeActiveObjectCard="changeActiveObjectCard"
    />
    <ObjectCard
      v-bind:object="objectCard"
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
      selectedObject: {},
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
    objectCard() {
      if (!Object.hasOwnProperty.call(this.selectedObject, 'name')) {
        return {};
      }
      function readyForDisplay(subjectInfo) { // change the backend to make this irrelevent
        const info = [];
        subjectInfo.forEach((data) => {
          info.push({ name: data.name, data: data.mass });
        });

        return info;
      }

      const data = {
        name: this.selectedObject.name,
        nameAction: 'changeSystemObjectName',
        id: this.selectedObject.id,
        infoList: [
          {
            subject: 'Type',
            info: this.selectedObject.type,
          }, {
            subject: 'Resources',
            info: readyForDisplay(this.selectedObject.resources),
          },
        ],
        actions: [

        ],
      };

      return data;
    },
  },
  methods: {
    ...mapActions([
      'changeSystemView',
    ]),
    changeActiveObjectCard(obj) {
      this.selectedObject = obj;
      this.combinedSystemInfo.data.systemObjectsList.forEach((id) => {
        // debugger;
        if (id === this.selectedObject.id) {
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
