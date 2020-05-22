<template>
  <div class="object_view">
    <h3>{{ object.name }}</h3>
    <p>{{ object.type }}</p>
  </div>
</template>
<script>


export default {
  name: 'ObjectCard',
  props: {
    object: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
  },
};
</script>
<style lang="scss" scoped>

</style>
