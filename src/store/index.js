import Vue from "vue";
import Vuex from "vuex";
import launches from "./modules/launches";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    youtubeApiLibraryLoaded: false
  },
  getters: {
    isYoutubeReady(state) {
      return state.youtubeApiLibraryLoaded;
    }
  },
  mutations: {
    setYoutubeApiLibraryLoaded(state, boolean) {
      state.youtubeApiLibraryLoaded = boolean;
    }
  },
  modules: {
    launches
  }
});
