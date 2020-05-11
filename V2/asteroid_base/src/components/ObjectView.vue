<template>
  <div class="ObjectView">
    <h3>{{ object.name }}</h3>
    <p>{{ object.type }}</p>
  </div>
</template>
<script>


export default {
  name: 'ObjectView',
  props: {
    object: {
      type: Object,
      default() {
        return {
          name: 'not selected',
          type: 'not selected',
        };
      },
    },
  },
  computed: {
  },
};
</script>
<style lang="scss" scoped>

</style>
