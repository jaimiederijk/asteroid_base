<template>
  <div class="object_card">
    <div class="object_card_info" v-if="activeObject.hasOwnProperty('name')">
      <h3>{{ activeObject.type }} : {{ activeObject.name }}</h3>
      <div v-if="activeObject.objectClass === 'CelestialObject'">
        <p v-if="activeObject.type === 'star'">
          Mass: {{ activeObject.characteristics.mass }} M<sub>&#8857;</sub>
        </p>
        <p v-else>
          Mass: {{ activeObject.characteristics.mass.toPrecision(2) }} kg
        </p>
        <p>resources:</p>
        <ul>
          <li v-for="resource in activeObject.resources" :key="resource.name">
            <span>{{ resource.name }}</span>: {{ resource.mass.toPrecision(2) }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <h3>nothing selected</h3>
    </div>
    <div class="object_card_menu">
      <button>Start mining operation </button>
      <button @click='chname(activeObject)'>name</button>
    </div>
    <!-- <p>{{ activeObject.type }}</p> -->
    <!-- <p>integrity: {{ object.characteristics.integrity }} %</p> -->
    <!-- <p v-if="object.type === 'star'">
      Mass: {{ object.characteristics.mass }} M<sub>&#8857;</sub>
    </p>
    <p v-else>
      Mass: {{ object.characteristics.mass.toPrecision(2) }} kg
    </p>
    <p>
      resources:
      <ul>
        <li v-for="resource in object.resources" :key="resource.name">
          {{ resource.name + resource.mass.toPrecision(2) }}
        </li>
      </ul>
    </p> -->
  </div>
</template>
<script>
export default {
  name: 'ObjectCard',
  props: {
    activeObject: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    chname(target) {
      this.$store.dispatch('changeName', target);
    },
  },
  computed: {
  },
};
</script>
<style lang="scss" scoped>
  .object_card {
    display: flex;
    .object_card_info {
      text-align: left;
    }
  }
</style>
