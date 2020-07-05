<template>
  <div id="gamepage">
    <nav id="game-nav">
      <router-link :to="{ name: 'Home' }">Menu</router-link>
      <router-link :to="{ name: 'starmap' }">Starmap</router-link>
      <router-link :to="{ name: 'system' }">System</router-link>
      <router-link :to="{ name: 'goverment' }">Goverment</router-link>
      <router-link v-if="view.objectView.id"
        :to="{ name: 'object', params: {} }">
        {{ view.objectView.name }}
      </router-link>
      <h2>{{ getPlayerNation.name + " " + getPlayerNation.type }}</h2>
    </nav>
    <router-view></router-view>
    <div id='timebar'>
      <button v-if="view.paused" v-on:click="unpause(); progressTime();"
      type="button" name="button">
        unpause
        <span>01-{{ getCurrentDate.m }}-{{ getCurrentDate.y }}</span>
      </button>
      <button id="pause" v-if="!view.paused" v-on:click="pause" type="button" name="button">
        paused
        <span>01-{{ getCurrentDate.m }}-{{ getCurrentDate.y }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Game',
  computed: {
    ...mapState({
      view: (state) => state.view,
      nations: (state) => state.nations,
    }),
    ...mapGetters([
      'getPlayerNation',
      'getCurrentDate',
    ]),
  },
  methods: {
    ...mapActions([
      'progressTime',
      'pause',
      'unpause',
    ]),
  },
};
</script>
<style lang="scss" scoped>
  #gamepage {
    background-color: black;
  }
  #game-nav {
    display: flex;
    align-items: center;
    background-color: grey;
    a, h2 {
      display: block;
    }
    a {
      padding: 1rem;
      background-color: red;
    }
    h2 {
      padding-left: 1rem;
    }
    .router-link-exact-active {
      background-color: green;
    }
  }
  #timebar {
    position: fixed;
    bottom: 0;
    right: 0;
    button {
      border: 2px solid rgb(110, 10, 10);
      width: 7rem;
      height: 3rem;
      background-color: red;
      &#pause {
        background-color: green;
      }
    }
  }
</style>
