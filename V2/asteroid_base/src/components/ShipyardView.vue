<template>
  <section>
      <nav class="shipyard">
        <UIBar v-bind:uielements="ui" @changeView="changeView"/>
      </nav>
      <ShipDesigner v-if="view==='ShipDesigner'"/>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import ShipDesigner from '@/components/subcomponents/ShipDesigner';
import UIBar from '@/components/subcomponents/UIBar';

export default {
  name: 'ShipyardView',
  data() {
    return {
      view: 'Shipyard',
      ui: [
        {
          name: 'Ship Designs',
          active: true,
        }, {
          name: 'ShipDesigner',
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
    ShipDesigner,
    UIBar,
  },
};
</script>

<style lang="css" scoped>
</style>
