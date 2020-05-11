<template>
  <div id="gamepage">
    <router-link :to="{ name: 'mainmenu' }">Menu</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'Game',
};
</script>
