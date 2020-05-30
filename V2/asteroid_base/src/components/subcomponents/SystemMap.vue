<template>
  <div class="system_map">
    <h3>{{ system.name }}</h3>
    <ul>
      <li v-for="object in system.systemObjects"
      :key="object.name">
        <button
          v-on:click="$emit('changeActiveObject',object, system.id)"
          name="button"
          v-bind:class="object.color"
        >
          {{ object.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SystemMap',
  props: {
    system: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
  @each $colorname, $color in $sys_obj_colors {
    .#{$colorname} {
      background-color: $color;
      padding: 0 1rem;
    }
  }

</style>
