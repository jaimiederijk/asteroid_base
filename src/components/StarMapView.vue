<template>
  <section id="starmap">
    <!-- <h2>starmap</h2> -->
    <ul v-bind:style="{
        gridTemplateColumns: 'repeat(' + map.settings.sectorAmountRoot + ','
        + graphicalSettings.sectorWidth + 'px )',
        gridTemplateRows: 'repeat(' + map.settings.sectorAmountRoot + ','
        + graphicalSettings.sectorWidth * 2 + 'px )',
        width: mapWidth - 25  + 'px'
      }" :class="{ zoomed: zoomedToSector }">
      <li
        v-for="(sector, index) in map.sectors" :key="sector.id"
        @click="zoomToSector($event, sector.coordinates.col, sector.coordinates.row)">
        <span v-show="index < map.settings.sectorAmountRoot">
          {{ sector.coordinates.col }}
        </span>
        <span v-show="graphicalSettings.startOfRow.includes(index)">
          {{ sector.coordinates.row }}
        </span>
        <PlanetarySystem v-for="system in sector.systems" :key="system"
        v-bind:system="getPlanetarySystemById(system)"
          :settings="map.settings" :graphicalSettings="graphicalSettings"/>
      </li>
    </ul>
    <button v-if="zoomedToSector" @click="zoomOut" type="button" name="button">zoom out</button>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { useWindowSize } from 'vue-window-size';
import PlanetarySystem from '@/components/subcomponents/map/PlanetarySystem';

export default {
  name: 'StarMapView.vue',
  data() {
    return {
      mapWidth: 1000,
      zoomedToSector: false,
    };
  },
  setup() {
    const { width, height } = useWindowSize();
    return {
      windowWidth: width,
      windowHeight: height,
    };
  },
  computed: {
    ...mapState({
      map: (state) => state.map,
    }),
    ...mapGetters([
      'getPlanetarySystemById',
    ]),
    graphicalSettings() {
      const startOfRow = [];
      for (let i = 0; i < this.map.settings.sectorAmountRoot; i += 1) {
        startOfRow.push(i * this.map.settings.sectorAmountRoot);
      }

      const width = this.mapWidth;// document.documentElement.clientWidth;
      const offset = width < 1200 ? 2 : 4;
      // console.log(offset);
      const sectorWidth = Math.floor(width / this.map.settings.sectorAmountRoot) - offset;

      return {
        startOfRow,
        sectorWidth,
      };
    },
  },
  methods: {
    zoomToSector(event, x, y) {
      console.log('zoom');
      console.log(x);
      console.log(y);
      this.zoomedToSector = true;
      this.mapWidth = this.windowWidth * 3;
      this.$nextTick(() => {
        event.currentTarget.scrollIntoView({ block: 'center', inline: 'center' });
      });
    },
    zoomOut() {
      this.mapWidth = this.windowWidth;
      this.zoomedToSector = false;
    },
  },
  watch: {
    windowWidth() {
      this.mapWidth = this.windowWidth;
    },
  },
  mounted() {
    this.mapWidth = this.windowWidth;
  },
  components: {
    PlanetarySystem,
  },
};
</script>

<style lang="scss" scoped>
  section {
    padding-top: 110px;
    width: 100%;
    height: 100%;
    button {
      position: fixed;
      bottom: 0;
      right: 50%;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    padding-left: 5px;
    display: grid;
    background-color: black;
  }
  li {
    position: relative;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-right: solid $line_color 1px;
    border-bottom: solid $line_color 1px;

    &:nth-of-type(10n + 1) {
      border-left: solid $line_color 1px;
    }
    &:nth-of-type(-n + 10) {
      border-top: solid $line_color 1px;
    }
    &:hover {
      outline: solid white 1px;
    }
    span {
      background-color: black;
      position: absolute;
      &:first-of-type {
        top: 0px;
      }
      &:nth-of-type(2) {
        left: 0%;
        top: 45%;
      }
    }
  }
</style>
