<template>
  <div class="Goverment">
    <h2>Goverment of {{ getPlayerNation.name }}</h2>
    <CharacterCard v-bind:character="getCharacterWithJob('ruler')"/>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CharacterCard from '@/components/subcomponents/CharacterCard';

export default {
  name: 'GovermentView',
  computed: {
    ...mapGetters([
      'getCharacterWithJob',
      'getPlayerNation',
    ]),
  },
  components: {
    CharacterCard,
  },
};
</script>

<style lang="css" scoped>
</style>
