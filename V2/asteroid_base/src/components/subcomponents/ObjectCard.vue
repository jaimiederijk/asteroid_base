<template>
  <div class="object_view">
    <div v-if="object.hasOwnProperty('name')">
      <h3>{{ object.name }}</h3>
      <p>{{ object.type }}</p>
      <p>integrity: {{ object.characteristics.integrity }} %</p>
      <p v-if="object.type === 'star'">
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
      </p>
      <router-link :to="{
        name: 'objectview',
        params: {systemId: object.systemId, objectId: object.id, objectName: object.name }
      }">
        detail
      </router-link>
    </div>
    <div v-else>
      <h3>nothing selected</h3>
    </div>

  </div>
</template>
<script>


export default {
  name: 'ObjectCard',
  props: {
    object: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
  },
};
</script>
<style lang="scss" scoped>

</style>
