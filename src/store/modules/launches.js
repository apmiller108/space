import launchesApi from "@/services/spacex/launchesApi";

export const state = {
  all: [],
  activeLaunch: null,
  error: null,
  loading: false
};

export const mutations = {
  addLaunches(state, launches) {
    state.all.push(...launches);
  },
  setError(state, error) {
    state.error = error;
  },
  setLoading(state, bool) {
    state.loading = bool;
  },
  setActiveLaunch(state, launch) {
    state.activeLaunch = launch;
  },
  clearActiveLaunch(state) {
    state.activeLaunch = null;
  }
};

export const actions = {
  getLaunches({ commit, getters }) {
    return new Promise((resolve, reject) => {
      commit("setError", null);
      commit("setLoading", true);
      launchesApi
        .getAll({ offset: getters.all.length })
        .then(launches => {
          commit("addLaunches", launches);
          resolve(launches);
        })
        .catch(error => {
          commit("setError", error);
          reject(error);
        })
        .finally(() => commit("setLoading", false));
    });
  }
};

export const getters = {
  all(state) {
    return state.all;
  },
  isLoading(state) {
    return state.loading;
  },
  findByFlightNumber: (_state, getters) => flightNumber => {
    const castedFN = Number.parseInt(flightNumber, 10) || 0;
    return getters.all.find(launch => launch.flight_number === castedFN);
  },
  activeLaunch(state) {
    return state.activeLaunch;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
