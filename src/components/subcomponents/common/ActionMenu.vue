<template lang="html">
  <form class="object-action-menu">
    <input type="text" id="lname" name="lname"><br><br>
    <input type="submit" value="Submit">
  </form>
</template>

<script>
export default {
  name: 'object-action-menu',
  props: {
    actionData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    changeView(val) {
      this.$emit('changeView', val);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>