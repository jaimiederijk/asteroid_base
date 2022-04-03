<template>
  <section id="starmap">
    <!-- <h2>starmap</h2> -->
    <ul v-bind:style="stylingCalc.grid" :class="{ zoomed: zoomedToSector }">
      <li
        v-for="(sector, index) in map.sectorsList" :key="sector"
        @click="zoomToSector(
          $event, map.sectorsData[sector].coordinates.col, map.sectorsData[sector].coordinates.row
        )">
        <span v-show="index < map.settings.sectorAmountRoot">
          {{ map.sectorsData[sector].coordinates.col }}
        </span>
        <span v-show="graphicalSettings.startOfRow.includes(index)">
          {{ map.sectorsData[sector].coordinates.row }}
        </span>
        <div v-for="system in map.sectorsData[sector].systems" :key="system">
          <PlanetarySystem
            v-bind:system="planetarySystemData[system]"
            :settings="map.settings"
            :graphicalSettings="graphicalSettings"/>
          <div v-if="planetarySystemData[system].linkList.length > 0">
            <Line  v-for="linkId in planetarySystemData[system].linkList" :key="linkId"
            v-bind:target="planetarySystemData[system].linkSystemData[linkId]"
            :origin="planetarySystemData[system]"
            :graphicalSettings="graphicalSettings"/>
          </div>
        </div>
        <div v-for="(link, index) in map.sectorsData[sector].internalSystemLinks" :key="index">
          <InternalLink
            v-bind:target="planetarySystemData[link[0]]"
            :origin="planetarySystemData[link[1]]"
            :graphicalSettings="graphicalSettings"/>
        </div>
      </li>
    </ul>
    <button v-if="zoomedToSector" @click="zoomOut" type="button" name="button">zoom out</button>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { useWindowSize } from 'vue-window-size';
import PlanetarySystem from '@/components/subcomponents/map/PlanetarySystem';
import Line from '@/components/subcomponents/map/Line';
import InternalLink from '@/components/subcomponents/map/InternalLink';

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
    stylingCalc() {
      const grid = {
        gridTemplateColumns: `repeat( ${this.map.settings.sectorAmountRoot}, ${this.graphicalSettings.sectorWidth}px )`,
        gridTemplateRows: `repeat( ${this.map.settings.sectorAmountRoot}, ${this.graphicalSettings.sectorWidth * 2}px )`,
        width: `${this.mapWidth - 25}px`,
      };

      return {
        grid,
      };
    },
    // create one object for Pla.System with calculated styling and linkedsytem info
    planetarySystemData() {
      const planetarySystemData = { ...this.map.systemsData };
      const { settings } = this.map;
      const { graphicalSettings } = this;

      this.map.systemsList.forEach((id) => {
        // add position styling
        planetarySystemData[id].style = {
          top: (planetarySystemData[id].inSectorCoordinates.y / settings.sectorSize.height)
        * (graphicalSettings.sectorWidth * 2),
          left: (planetarySystemData[id].inSectorCoordinates.x / settings.sectorSize.width)
        * graphicalSettings.sectorWidth,
          width: graphicalSettings.sectorWidth * 0.05,
          height: graphicalSettings.sectorWidth * 0.05,
        };
      });
      // loop again to apply style to linksystem
      this.map.systemsList.forEach((id) => {
        planetarySystemData[id].linkList.forEach((linkId) => {
          planetarySystemData[id].linkSystemData[linkId].style = {
            ...planetarySystemData[linkId].style,
          };
        });
      });
      return planetarySystemData;
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
    Line,
    InternalLink,
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
