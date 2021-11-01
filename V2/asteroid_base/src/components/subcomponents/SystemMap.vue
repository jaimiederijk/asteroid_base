<template>
  <div class="system-map">
    <h3>{{ system.name }}</h3>

    <ul>
      <li v-for="object in system.systemObjects"
      :key="object.name" class="system-object">
        <button
          v-on:click="$emit('changeActiveObject',object, system.id)"
          name="button"
          v-bind:class="[object.color, object.type]"
        >
          <div class="cel-obj-name">
            <span>{{ object.name }}

              <div class="cel-obj-info">
                <p v-for="resource in object.resources"
                  :key="resource.name">
                  {{ resource.name }}
                </p>
              </div>
            </span>

          </div>

        </button>
      </li>
    </ul>
    <div id="system-map-canvas" ref="animatedmap"></div>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js';

export default {
  name: 'SystemMap',
  props: {
    system: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    pixiMap() {
      const { animatedmap } = this.$refs;
      const app = new PIXI.Application({
        width: animatedmap.clientWidth, height: animatedmap.clientHeight,
      });
      animatedmap.appendChild(app.view);
      app.renderer.backgroundColor = 0x061639;
    },
  },
  mounted() {
    this.pixiMap();
  },
};

</script>

<style lang="scss" scoped>
  #system-map-canvas {
    width: 100%;
    height: 50vh;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    li {
      height: 164px;
      width: 164px;
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

</style>
