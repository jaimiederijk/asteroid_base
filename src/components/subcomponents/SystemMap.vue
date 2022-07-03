<template>
  <div class="system-map" :class="viewMode">
    <div>
      <h3>{{ system.data.name }}</h3>
      <button v-on:click="changeMapMode">change mode</button>
    </div>
    <ul>
      <li v-for="id in system.data.systemObjectsList"
        :key="id" class="system-object" :style="{
          top: (mapCenter +
          (system.objectData[id].orbit.inSystemCoordinates.y * relativeSize -25)) + 'px',
          left: (mapCenter +
          (system.objectData[id].orbit.inSystemCoordinates.x * relativeSize -25)) + 'px',
        }">
        <svg :height="windowWidth" :width="windowWidth" xmlns="http://www.w3.org/2000/svg"
          :style="{
            top: -(mapCenter +
            (system.objectData[id].orbit.inSystemCoordinates.y * relativeSize -25)) + 'px',
            left: -(mapCenter +
            (system.objectData[id].orbit.inSystemCoordinates.x * relativeSize -25)) + 'px',
          }">
          <circle
            :cx="mapCenter"
            :cy="mapCenter"
            :r="(system.objectData[id].orbit.radius * relativeSize)"
            stroke="white" stroke-width="1" fill-opacity="0"/>
        </svg>
        <button
          v-on:click="$emit('changeActiveObjectCard',system.objectData[id])"
          name="button"
          v-bind:class="[system.objectData[id].color, system.objectData[id].type,
            {selected_arrow: system.objectData[id].selected}]"
        >
          <div class="cel-obj-name">
            <span>
              {{ system.objectData[id].name }}
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
  computed: {
    relativeSize() {
      const width = this.windowWidth;
      // const sysOjbAmount = this.system.data.systemObjectsList.length - 1;
      // const factor = (sysOjbAmount < 8) ? sysOjbAmount * 1.4 : sysOjbAmount * 1.4 * 2;
      return width / this.system.data.systemSize;
    },
    mapCenter() {
      return this.windowWidth / 2;
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
  svg {
    position: absolute;
  }
  .list {
    svg {
      display: none;
    }
    ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(164px, 1fr));
      align-items: center;
      li {
        height: 164px;
        width: 164px;
        justify-self: center;
      }
      button {
        margin-top: 40%;
      }
      .cel-obj-name {
        transform-origin: bottom left;
        transform: rotateZ(45deg);
      }
    }
  }
  .orbits {
    ul {
      height: 100vw; // calc(100vh - 150px);
      width: 100%;
      margin: 0;
      padding: 0;
      transform-style: preserve-3d;
      transform-origin: bottom left;
      transform: rotateX(65deg);
      position: relative;
      top: -55vw;
      .selected_arrow::before {
        transform: scaleY(1.7);
      }
      li {
        position: absolute;
        .cel-obj-name {
          transform-origin: bottom left;
          transform: scaleY(1.6) rotateZ(45deg) rotateX(0deg);
        }
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
      // margin: 2rem;
      border-radius: 50%;
      border: none;
      .cel-obj-name {
        position: absolute;
        width: 50px;
        height: 50px;
        border-left: 2px solid white;
        bottom: 80%;
        left: 95%;
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
      &::before {
        font-size: 35px;
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
