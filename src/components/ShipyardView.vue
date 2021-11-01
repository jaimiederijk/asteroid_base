<template>
  <section>
      <nav class="shipyard">
        <UIBar v-bind:uielements="ui" @changeView="changeView"/>
      </nav>
      <Blueprints v-if="view==='Blueprints'"/>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import UIBar from '@/components/subcomponents/UIBar';
import Blueprints from '@/components/subcomponents/shipdesign/Blueprints';

export default {
  name: 'ShipyardView',
  data() {
    return {
      view: 'Shipyard',
      ui: [
        {
          name: 'Yard',
          active: true,
        }, {
          name: 'Blueprints',
          active: false,
        },
      ],
    };
  },
  methods: {
    ...mapActions([
    ]),
    changeView(name) {
      this.view = name;
      this.ui.forEach((item, i) => {
        this.ui[i].active = false;
      });
      this.ui.find((el) => el.name === name).active = true;
    },
  },
  components: {
    Blueprints,
    UIBar,
  },
};
</script>

<style lang="css" scoped>
  section {
    padding-top: 100px;
  }
</style>
