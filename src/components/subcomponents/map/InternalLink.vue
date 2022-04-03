<template>
  <svg :width="graphicalSettings.sectorWidth" :height="graphicalSettings.sectorWidth*2"
    xmlns="http://www.w3.org/2000/svg">
    <line
      :x1="origin.style.left + (0.5 * origin.style.width)"
      :y1="origin.style.top + (0.5 * origin.style.height)"
      :x2="target.style.left + (0.5 * target.style.width)"
      :y2="target.style.top + (0.5 * target.style.height)"
      stroke="rgb(240,240,240)" stroke-width="2"
      stroke-dasharray="7" opacity="0.2"
    />
  </svg>
</template>

<script>
export default {
  name: 'InternalLink',
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
