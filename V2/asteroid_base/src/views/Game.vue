<template>
  <div id="gamepage">
    <nav id="game-nav">
      <router-link :to="{ name: 'mainmenu' }">Menu</router-link>
      <router-link :to="{ name: 'system' }">System</router-link>
      <router-link :to="{ name: 'goverment' }">Goverment</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'Game',
};
</script>
<style lang="scss" scoped>
  #game-nav {
    display: flex;
    a {
      display: inline-block;

      padding: 1rem;
      background-color: red;
    }
    .router-link-exact-active {
      background-color: green;
    }
  }
</style>
