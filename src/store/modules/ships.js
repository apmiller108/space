import shipsApi from "@/services/shipsApi";

export default {
  namespaced: true,
  state: {
    all: [],
    selected: null,
    error: null,
    loading: false
  },
  mutations: {
    setAll(state, ships) {
      state.all = ships;
    },
    setSelected(state, ship) {
      state.selected = ship;
    },
    setLoading(state, bool) {
      state.loading = bool;
    },
    setError(state, error) {
      state.error = error;
    }
  },
  actions: {
    getShips({ commit }) {
      commit("setError", null);
      commit("setLoading", false);
      shipsApi
        .getAll()
        .then(ships => commit("setAll", ships))
        .catch(error => commit("setError", error))
        .finally(() => commit("setLoading", false));
    },
    getShip({ state, commit }, id) {
      const ship = state.all.find(ship => ship.ship_id === id);
      commit("setSelected", ship);
    }
  }
};
