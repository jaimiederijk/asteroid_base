<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>A game about building a empire in the cold darkness of space</p>
    <router-link :to="{ name: 'mainmenu' }">Game</router-link>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
};
</script>
