<template>
  <svg :width="graphicalSettings.sectorWidth" :height="graphicalSettings.sectorWidth*2"
    xmlns="http://www.w3.org/2000/svg">
    <line
      :x1="origin.style.left + (0.5 * origin.style.width)"
      :y1="origin.style.top + (0.5 * origin.style.height)"
      :x2="lineCoord.lineTarX"
      :y2="lineCoord.lineTarY"
      stroke="rgb(240,240,240)" stroke-width="2"
      stroke-dasharray="10" opacity="0.5"
    />
    <line
      :x1="lineCoord.TraOriX"
      :y1="lineCoord.TraOriY"
      :x2="lineCoord.TraTarX"
      :y2="lineCoord.TraTarY"
      stroke="rgb(240,240,240)" stroke-width="2"
      stroke-dasharray="0"
    />
  </svg>
</template>

<script>
export default {
  name: 'Line',
  props: {
    target: {
      type: Object,
      default() {
        return {};
      },
    },
    origin: {
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
    lineCoord() {
      const lineCoord = {
        lineTarX: 0,
        lineTarY: 0,
        TraOriX: 0,
        TraOriY: 0,
        TraTarX: 0,
        TraTarY: 0,
      };
      const offset = 5;
      const lineLength = 10;
      const width = this.graphicalSettings.sectorWidth;
      switch (this.target.direction) {
        case 'right':
          lineCoord.lineTarX = width - offset;
          lineCoord.lineTarY = width; // width is half off height
          lineCoord.TraOriX = width - offset;
          lineCoord.TraOriY = width + lineLength;
          lineCoord.TraTarX = width - offset;
          lineCoord.TraTarY = width - lineLength;
          break;
        case 'left':
          lineCoord.lineTarX = 0 + offset;
          lineCoord.lineTarY = width;
          lineCoord.TraOriX = offset;
          lineCoord.TraOriY = width - lineLength;
          lineCoord.TraTarX = offset;
          lineCoord.TraTarY = width + lineLength;
          break;
        case 'top':
          lineCoord.lineTarX = width / 2;
          lineCoord.lineTarY = 0 + offset;
          lineCoord.TraOriX = width / 2 - lineLength;
          lineCoord.TraOriY = offset;
          lineCoord.TraTarX = width / 2 + lineLength;
          lineCoord.TraTarY = offset;
          break;
        case 'bottom':
          lineCoord.lineTarX = width / 2;
          lineCoord.lineTarY = width * 2 - offset;
          lineCoord.TraOriX = width / 2 - lineLength;
          lineCoord.TraOriY = width * 2 - offset;
          lineCoord.TraTarX = width / 2 + lineLength;
          lineCoord.TraTarY = width * 2 - offset;
          break;
        default:
          console.log('no direction in line drawing');
      }
      return lineCoord;
    },
    // gradIdLink() {
    //   return `url(#line${this.origin.id}${this.target.name})`;
    // },
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  svg {
    position: absolute;
    top: 0;
    left: 0;
    // clip-path: polygon(0% 0%, 0% 100%, 10% 100%, 10% 5%,
    // 90% 5%, 90% 95%, 10% 95%, 10% 100%, 100% 100%, 100% 0%);
  }
</style>
