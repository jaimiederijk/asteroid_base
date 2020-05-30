<template lang="html">
  <div>
    <p>{{ obj.name }}</p>
    <p>{{ obj.type }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ObjectView',
  computed: mapState({
    view: (state) => state.view,
    obj(state) {
      return this.$store.getters.getObjectById(state.view.objectView);
    },
  }),
};
</script>

<style lang="css" scoped>
</style>
