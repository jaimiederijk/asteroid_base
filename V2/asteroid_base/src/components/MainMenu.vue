<template>
  <nav>
    <ul>
      <li><router-link :to="{ name: 'newgame' }">new game</router-link></li>
      <li><router-link :to="{ name: 'goverment' }">goverment</router-link></li>
      <li><router-link :to="{ name: 'system' }">map</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'MainMenu',
};
</script>

<style lang="css" scoped>
</style>
