<template>
  <div class="info_card">
    <h3>{{ character.firstName}} {{ character.lastName }}</h3>
    <em>age: {{ character.age }}</em> <em>job: {{ character.job }}</em>
  </div>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
    character: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="css" scoped>
</style>
