<template>
  <div class="Goverment">
    <h2>Goverment</h2>
    <CharacterCard v-bind:character="getCharacterWithJob('ruler')"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CharacterCard from '@/components/CharacterCard';

export default {
  name: 'GovermentView',
  computed: {
    ...mapGetters([
      'getCharacterWithJob',
    ]),
  },
  components: {
    CharacterCard,
  },
};
</script>

<style lang="css" scoped>
</style>
