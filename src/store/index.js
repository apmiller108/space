import Vue from "vue";
import Vuex from "vuex";
import ships from "./modules/ships";
import launches from "./modules/launches";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ships,
    launches
  }
});
