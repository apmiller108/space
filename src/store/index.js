import Vue from "vue";
import Vuex from "vuex";
import ships from "./modules/ships";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ships
  }
});
