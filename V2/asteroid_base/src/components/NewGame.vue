<template>
  <div>
    <h2>Create a new game</h2>
    <form id="newgame-form" v-on:submit.prevent="submit">
      <fieldset v-if="formPage === 1">
        <legend>create your ruler</legend>
        <label for="first-name">Firstname</label>
        <input v-model="ruler.firstName" id="firstname" type="text" placeholder="edit me">
        <label for="lastname">Lastname</label>
        <input v-model="ruler.lastName" id="lastname" type="text" placeholder="edit me">
      </fieldset>
      <fieldset v-if="formPage === 2">
        <legend>galaxy settings</legend>
        <label for="density">density</label>
        <label for="density-sparse">sparse</label>
        <input v-model="galaxySettings.density" id="density-sparse" type="radio" value="5">
        <label for="density-normal">normal</label>
        <input v-model="galaxySettings.density" id="density-normal" type="radio" value="10">
        <label for="density-dense">dense</label>
        <input v-model="galaxySettings.density" id="density-dense" type="radio" value="20">
      </fieldset>
      <button v-if="formPage > 1" v-on:click="formPage -= 1" type="button">Back</button>
      <button v-if="formPage !== maxPage" v-on:click="formPage += 1" type="button">Next</button>
      <input v-if="formPage === maxPage" type="submit" value="create game">
    </form>
    <CharacterCard v-bind:character="ruler"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CharacterCard from '@/components/CharacterCard';

export default {
  name: 'NewGame',
  data() {
    return {
      formPage: 1,
      maxPage: 2,
      // temp data with default values
      ruler: {
        firstName: 'James',
        lastName: 'Reikaard',
        age: 22,
        job: 'ruler',
      },
      galaxySettings: {
        density: 10, // sparse, normal, dense
        difficulty: 'normal',
      },
    };
  },
  methods: {
    ...mapActions([
      'createNewCharacter',
    ]),
    submit() {
      this.$store.dispatch('createNewCharacter', this.ruler);
      this.$store.dispatch('setGameSettings', this.galaxySettings);
      this.$router.push('system');
    },
  },
  components: {
    CharacterCard,
  },
  mounted() {
  },
};
</script>

<style lang="css" scoped>
</style>
