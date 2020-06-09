<template>
  <div id="gamepage">
    <nav id="game-nav">
      <router-link :to="{ name: 'mainmenu' }">Menu</router-link>
      <router-link :to="{ name: 'system' }">System</router-link>
      <router-link :to="{ name: 'goverment' }">Goverment</router-link>
      <router-link v-if="view.objectView.id"
        :to="{ name: 'object', params: {} }">
        {{ view.objectView.name }}
      </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Game',
  computed: mapState({
    view: (state) => state.view,
  }),
};
</script>
<style lang="scss" scoped>
  #gamepage {
    background-color: black;
  }
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
