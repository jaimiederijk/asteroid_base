<template lang="html">
  <button class="planetarysystem" type="button" name="button"
    v-on:click="selectPlanetarySystem(system.id)"
    :class="[system.systemCenter.color, system.type]"
    :style="{
      top: system.style.top + 'px',
      left: (system.inSectorCoordinates.x/settings.sectorSize.width)
        * graphicalSettings.sectorWidth + 'px',
      width: graphicalSettings.sectorWidth * 0.05 + 'px',
      height: graphicalSettings.sectorWidth * 0.05 + 'px'
    }">
    <span>{{ system.name }}</span>
    <!-- <div v-if="system.linkList.length > 0" :style="{
      top: -system.style.top + 'px',
      left: -system.style.left + 'px',
    }">
      <Line  v-for="linkId in system.linkList" :key="linkId"
      v-bind:target="system.linkSystemData[linkId]" :origin="system"
      :graphicalSettings="graphicalSettings"/>
    </div> -->
  </button>
</template>

<script>
import { mapActions } from 'vuex';
// import Line from '@/components/subcomponents/map/Line';

export default {
  name: 'PlanetarySystem',
  props: {
    system: {
      type: Object,
      default() {
        return {};
      },
    },
    settings: {
      type: Object,
      default() {
        return {};
      },
    },
    graphicalSettings: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'changeSystemView',
    ]),
    selectPlanetarySystem(id) {
      this.changeSystemView(id);
      this.$router.push({ name: 'system' });
    },
  },
  components: {
    // Line,
  },
};
</script>

<style lang="scss" scoped>
  .planetarysystem {
    position: absolute;
    padding: 0;
    border: none;
    z-index: 14;
    // width: 0.5vw;
    // height: auto;
    border-radius: 1rem;
    box-shadow: 0px 0px 10px 0px #fff;
    span {
      position: absolute;
      width: max-content;
      background-color: rgba(0,0,0,0.5);
      z-index: 15;
      top: -35px;
      left: 17px;
      display: none;
      border-bottom: solid 2px white;
      &::before {
        position: absolute;
        left: -13px;
        top: 23px;
        width: 16px;
        height: 2px;
        content: '';
        border-bottom: dashed 2px white;
        transform: rotate(-45deg);
      }
    }
    // div {
    //   position: absolute;
    //   z-index: 13;
    //   pointer-events: none;
    // }
    &:hover {
      outline: dashed 2px white;
      outline-offset: 15px;
      span {
        display: block;
      }
    }
  }
  .zoomed span {
    left: 30px;
    display: block;
  }
</style>
