<template lang="html">
  <nav class="game-nav-bar">
    <button
      v-for="button in uielements" :key="button.name"
      type="button" name="button"
      v-bind:class="{ active: button.active }"
      @click='changeView(button.name)'
    >
      <div class="innerbutton">
        {{ button.name }}
      </div>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'UIBar',
  props: {
    uielements: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    changeView(val) {
      this.$emit('changeView', val);
    },
  },
};
</script>

<style lang="scss" scoped>
  nav {
    display: flex;
  }
  button {
    border: solid white 2px;
    background-color: black;
    color: white;
    padding: 0px 6px;
    margin: 5px 1rem;
    border-radius: 3px 3px;
    box-sizing: border-box;
    &:hover {
      border: solid grey 2px;
    }
    &.active {
      .innerbutton {
        &::before {
          background-color: orange;
        }
        &::after{
          background-color: orange;
        }
      }
    }
    .innerbutton {
      background-color: black;
      position: relative;
      width: 100%;
      padding: 10px 0px;
      margin: 0px 0px;
      // border: solid black 4px;
      // margin-left: 0px;
      outline: solid black 2px;
      font-size: 2em;
      &::before {
        content: "";
        position: absolute;
        background-color: black;
        height: 80%;
        width: 2px;
        top: 10%;
        left: -8px;
      }
      &::after {
        content: "";
        position: absolute;
        background-color: black;
        height: 80%;
        width: 2px;
        top: 10%;
        right: -8px;
      }
    }
  }
</style>
