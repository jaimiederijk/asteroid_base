<template>
  <div class="system-map" :class="viewMode">
    <div>
      <h3>{{ system.data.name }}</h3>
      <button v-on:click="changeMapMode">change mode</button>
    </div>
    <ul>
      <li v-for="id in system.data.systemObjectsList"
        :key="id" class="system-object" :style="{
          top: (system.objectData[id].inSystemCoordinates.y/system.data.settings.systemSize)
          * windowWidth - 82 + 'px',
          left: (system.objectData[id].inSystemCoordinates.x/system.data.settings.systemSize)
          * windowWidth - 82 + 'px',
      }">
        <button
          v-on:click="$emit('changeActiveObjectCard',system.objectData[id], system.id)"
          name="button"
          v-bind:class="[system.objectData[id].color, system.objectData[id].type]"
        >
          <div class="cel-obj-name">
            <span>{{ system.objectData[id].name }}

              <div class="cel-obj-info">
                <p v-for="resource in system.objectData[id].resources"
                  :key="resource.name">
                  {{ resource.name }}
                </p>
              </div>
            </span>

          </div>

        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useWindowSize } from 'vue-window-size';

export default {
  name: 'SystemMap',
  data() {
    return {
      viewMode: 'list',
      mapWidth: 1000,
    };
  },
  setup() {
    const { width, height } = useWindowSize();
    return {
      windowWidth: width,
      windowHeight: height,
    };
  },
  props: {
    system: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    changeMapMode() {
      this.viewMode = (this.viewMode === 'orbits' ? 'list' : 'orbits');
    },
  },
  mounted() {
  },
};

</script>

<style lang="scss" scoped>
  .system-map {
    padding-top: 100px;
    > div {
      h3 {
        margin: 0 1rem;
      }
      position: absolute;
      height: 50px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  ul {
    padding: 0 1rem 0 0;
    overflow: hidden;
  }
  .list {
    ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(164px, 1fr));
      align-items: center;
      li {
        height: 164px;
        width: 164px;
      }
    }
  }
  .orbits {
    ul {
      height: 100vw; // calc(100vh - 150px);
      width: 100%;
      margin: 0;
      padding: 0;
      position: relative;
      li {
        position: absolute;
      }
    }
  }
  .system-object {
    list-style: none;
    display: block;

    button {
      display: block;
      position: relative;
      width: 50px;
      height: 50px;
      margin: 2rem;
      border-radius: 50%;
      border: none;
      .cel-obj-name {
        position: absolute;
        width: 50px;
        height: 50px;
        border-left: 2px solid white;
        bottom: 80%;
        left: 95%;
        transform-origin: bottom left;
        transform: rotateZ(45deg);
      }
      .cel-obj-info {
        color: white;
        position: absolute;
        text-align: left;
        p {
          font-size: 0.9em;
          margin: 2px;
          &:first-of-type {
            margin-top: 10px;
          }
        }
      }
      span {
        display: block;
        width: max-content;
        padding-left: 1px;
        position: relative;
        left: -1px;
        color: white;
        background-color: black;
        z-index: 9;
        transform-origin: bottom left;
        transform: rotateZ(-45deg);
        //text-decoration: underline;
        // border-left: 1px solid black;
        border-bottom: 2px solid white;
      }
    }
    .star {
      width: 100px;
      height: 100px;

    }
    @each $colorname, $color in $sys_obj_colors {
      .#{$colorname} {
        background-color: $color;
        padding: 0 1rem;
        &.star {
          box-shadow: 0px 0px 50px 0px $color;
        }
      }
    }
  }
  button {
    z-index: 88;
  }
</style>
