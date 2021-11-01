<template lang="html">
  <button class="planetarysystem" type="button" name="button" :class="star.color"
    :style="{
      top: (system.inSectorCoordinates.y/settings.sectorSize.height)
        * (graphicalSettings.sectorWidth * 2) + 'px',
      left: (system.inSectorCoordinates.x/settings.sectorSize.width)
        * graphicalSettings.sectorWidth + 'px'
    }">
    <span>{{ system.name }}</span>
  </button>
</template>

<script>
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
    star() {
      return this.system.systemObjects.find((system) => system.type === 'star');
    },
  },
};
</script>

<style lang="scss" scoped>
  .planetarysystem {
    position: absolute;
    padding: 0;
    border: none;
    width: 0.5vw;
    height: 0.5vw;
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
        border-bottom: solid 2px white;
        transform: rotate(-45deg);
      }
    }
    &:hover {
      span {
        display: block;
      }
    }
  }
</style>
