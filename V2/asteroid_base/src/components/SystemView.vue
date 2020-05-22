<template>
  <div>
    <button v-on:click="populateNewSystem()">start</button>
    <ul>
      <li
        v-for="system in systems"
        :key="system.id">
        <h2>{{ system.name }}</h2>
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
    <ObjectCard
      v-bind:object="objectActive"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import ObjectCard from '@/components/ObjectCard';


export default {
  name: 'SystemView',
  data() {
    return {
      objectActive: {},
    };
  },
  props: {
  },
  computed: {
    ...mapState({
      systems: (state) => state.systems,
      characters: (state) => state.characters,
    }),
    ...mapGetters([
    ]),
  },
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
    ObjectCard,
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
