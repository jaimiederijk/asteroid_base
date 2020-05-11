<template>
  <div>
    <h2>Create a new game</h2>
    <form v-on:submit.prevent="submit">
      <fieldset>
        <legend>create your ruler</legend>
        <label for="first-name">Firstname</label>
        <input v-model="ruler.firstName" id="firstname" type="text" placeholder="edit me">
        <label for="lastname">Lastname</label>
        <input v-model="ruler.lastName" id="lastname" type="text" placeholder="edit me">
      </fieldset>
      <input type="submit" name="" value="">
    </form>
    <div class="character-card">
      <h3>{{ ruler.firstName}} {{ ruler.lastName }}</h3>
      <em>age: {{ ruler.age }}</em> <em>job: {{ ruler.job }}</em>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'NewGame',
  data() {
    return {
      ruler: {
        firstName: '',
        lastName: '',
        age: 22,
        job: 'ruler',
      },
    };
  },
  methods: {
    ...mapActions([
      'createNewCharacter',
    ]),
    submit() {
      this.$store.dispatch('createNewCharacter', this.ruler);
    },
  },
};
</script>

<style lang="css" scoped>
</style>
