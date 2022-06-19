<template>
  <section id="shipyard">
      <!-- <nav class="shipyard"> -->
        <SubNavBar v-bind:uielements="ui" @changeView="changeView"/>
      <!-- </nav> -->
      <Yard v-if="view==='Yard'"/>
      <Blueprints v-if="view==='Blueprints'"/>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import SubNavBar from '@/components/subcomponents/common/SubNavBar';
import Yard from '@/components/subcomponents/shipdesign/Yard';
import Blueprints from '@/components/subcomponents/shipdesign/Blueprints';

export default {
  name: 'ShipyardView',
  data() {
    return {
      view: 'Yard',
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
    Yard,
    Blueprints,
    SubNavBar,
  },
};
</script>

<style lang="css" scoped>
  #shipyard {
    padding-top: 100px;
    width: 100%;
    min-height: calc(100vh - 100px);
  }
</style>
