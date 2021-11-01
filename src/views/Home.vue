<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>A game about building a empire in the cold darkness of space</p>
    <nav>
      <ul>
        <li><router-link :to="{ name: 'Newgame' }">new Game</router-link></li>
        <li><router-link :to="{ name: 'system' }">system</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
};
</script>
