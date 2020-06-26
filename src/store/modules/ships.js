import shipsApi from "@/services/spacex/shipsApi";

export const mutations = {
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
};

export const actions = {
  getShips({ commit, getters }) {
    if (getters.all.length) return;
    commit("setError", null);
    commit("setLoading", false);
    shipsApi
      .getAll()
      .then(ships => commit("setAll", ships))
      .catch(error => commit("setError", error))
      .finally(() => commit("setLoading", false));
  },
  selectShip({ state, commit }, id) {
    const ship = state.all.find(ship => ship.ship_id === id);
    commit("setSelected", ship);
  }
};

export const getters = {
  all(state) {
    return state.all;
  },
  selected(state) {
    return state.selected;
  }
};

export default {
  namespaced: true,
  state: {
    all: [],
    selected: null,
    error: null,
    loading: false
  },
  mutations,
  actions,
  getters
};
