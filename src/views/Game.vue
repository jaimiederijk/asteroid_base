<template>
  <div id="gamepage">
    <nav id="game-nav">
      <router-link v-for="link in links" :key="link.name" :to="{ name: link.link }">
        <div class="">
          {{ link.name }}
        </div>
      </router-link>
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
  data() {
    return {
      links: [
        {
          name: 'Menu',
          link: 'home',
        }, {
          name: 'Starmap',
          link: 'starmap',
        }, {
          name: 'System',
          link: 'system',
        }, {
          name: 'Goverment',
          link: 'goverment',
        }, {
          name: 'Shipyard',
          link: 'shipyard',
        },
      ],
    };
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
    z-index: 9;
    position: fixed;
    display: flex;
    align-items: center;
    background-color: black;
    a, h2 {
      display: block;
    }
    a {
      // padding: 1rem;
      background-color: black;
      border: solid white 3px;
      color: white;
      padding: 4px 0;
      margin: 1rem;
      border-radius: 2px 50px 2px 2px;
      text-decoration: none;
      div {
        background-color: black;
        width: 100%;
        // position: relative;
        padding: 4px 20px;
        margin: 4px 0px;
        margin-left: -20px;
        // outline: solid black 2px;
        font-size: 2em;
      }
      &:hover {
        border-color: grey;
      }
    }
    h2 {
      padding-left: 1rem;
    }
    .router-link-exact-active {
      border: solid darkgrey 3px;
      // border-radius: 2px 2px 2px 2px;
      div {
        &::after {
          content: "<";
          position: absolute;
          margin-left: 10px;
          color: orange;
        }
        &::before {
          content: ">";
          position: absolute;
          margin-left: -30px;
          color: orange;
        }
      }
    }
  }
  #timebar {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 9;
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
