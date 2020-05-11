<template>
  <div>
    <button v-on:click="populateNewSystem()">start</button>
    <ul>
      <li
        v-for="character in characters"
        :key="character.id">
        <h2>{{character.firstName}} {{character.lastName}}</h2>
        <button
          type="button" name="button"
          v-on:click="changeLastName(character)"
        >
          change last name
        </button>
      </li>
    </ul>
    <ul>
      <li
        v-for="system in systems"
        :key="system.id">
        <h2>{{ system.systemName }}</h2>
        <ul>
          <li v-for="object in system.systemObjects"
          :key="object.name">
            <button
              v-on:click="changeActiveObject(object)"
              name="button"
              v-bind:class="object.color"
            >
              {{ object.name }}
            </button>
          </li>
        </ul>
      </li>
    </ul>
    <ObjectView
      v-bind:object="objectActive"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ObjectView from '@/components/ObjectView';


export default {
  name: 'SystemView',
  data() {
    return {
      objectActive: {},
    };
  },
  props: {
  },
  computed: mapState({
    systems: (state) => state.systems,
    characters: (state) => state.characters,
  }),
  methods: {
    ...mapActions([
      'populateNewSystem',
      'changeLastName',
    ]),
    changeActiveObject(obj) {
      this.objectActive = obj;
    },
  },
  components: {
    ObjectView,
  },
};
</script>

<style lang="scss" scoped>
  @each $colorname, $color in $sys_obj_colors {
    .#{$colorname} {
      background-color: $color;
    }
  }

</style>
