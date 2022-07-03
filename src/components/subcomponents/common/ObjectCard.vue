<template>
  <div class="object_card">
    <div class="object_card_info" v-if="object.hasOwnProperty('name')">
      <input
        v-if="object.hasOwnProperty('nameAction')"
        :value="object.name" @input="updateName"
        :style="{ width: object.name.length * 0.7 + 'em' }">
      <h3 v-else>{{ object.name }}</h3>
      <ul>
        <li v-for="subjectInfo in object.infoList" :key="subjectInfo.subject">
          <div v-if="Array.isArray(subjectInfo.info)">
            <h4>{{ subjectInfo.subject }}</h4>
            <ul>
              <li class="infobox" v-for="info in subjectInfo.info" :key="info.name">
                <span>{{ info.name }}:</span> <span>{{ info.data }}</span>
              </li>
            </ul>
          </div>
          <div v-else class="infobox">
            <span>{{ subjectInfo.subject }}:</span> <span>{{ subjectInfo.info }}</span>
          </div>
        </li>
      </ul>
      <!-- <h3>{{ activeObject.type }} : {{ activeObject.name }}</h3>
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
      </div> -->
    </div>
    <div v-else>
      <h3>nothing selected</h3>
    </div>
    <div class="object_card_menu">
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
  methods: {
    updateName(e) {
      const payload = {
        name: e.target.value,
        id: this.object.id,
      };
      this.$store.dispatch(this.object.nameAction, payload);
    },
  },
  computed: {
  },
};
</script>
<style lang="scss" scoped>
  .object_card {
    display: flex;
    position: fixed;
    left: 1rem;
    color: $color_text;
    bottom: 1rem;
    border: solid $color_border 3px;
    padding: 0.5rem 1rem;
    input {
      background-color: black;
      color: $color_text;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      font-size: 1.3em;
      border: none;
      margin: 0;
      padding: 0.2rem 0;
      border-bottom: solid $color_highlight 3px;
    }
    h4 {
      margin: 0.4rem 0;
    }
    ul, li {
      padding: 0;
      margin: 0.2rem 0 0 0;
    }
    .infobox {
      display: flex;
      justify-content: space-between;
      span:first-of-type {
        margin-right: 0.5rem;
      }
    }
    .object_card_info {
      text-align: left;
    }
  }
</style>
