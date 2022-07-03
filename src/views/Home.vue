<template>
  <section class="home">
    <h1>Asteroid base</h1>
    <p>A game about building a empire in the cold darkness of space</p>
    <nav>
      <ul>
        <li v-if="gameDataPresent">
          <router-link :to="{ name: 'starmap' }">Continue game</router-link>
        </li>
        <li><router-link :to="{ name: 'newgame' }">new Game</router-link></li>
        <li><router-link :to="{ name: 'about' }">about</router-link></li>
      </ul>
    </nav>
  </section>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  computed: {
    gameDataPresent() {
      return this.$store.state.map.sectorsList.length > 0;
    },
  },
};
</script>
<style lang="scss" scoped>
  section {
    color: $color_text;
    a {
      color: $color_text;
      border: solid $color_border 3px;
      width: 30em;
      display: block;
      padding: 1rem;
      margin: 1rem auto;
    }
  }
</style>
