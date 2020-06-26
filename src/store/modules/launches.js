import launchesApi from "@/services/spacex/launchesApi";

export const mutations = {
  addLaunches(state, launches) {
    state.all.push(...launches);
  },
  setError(state, error) {
    state.error = error;
  },
  setLoading(state, bool) {
    state.loading = bool;
  }
};

export const actions = {
  getLaunches({ commit }) {
    return new Promise((resolve, reject) => {
      commit("setError", null);
      commit("setLoading", true);
      launchesApi
        .getAll()
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
  }
};

export default {
  namespaced: true,
  state: {
    all: [],
    error: null,
    loading: false
  },
  actions,
  getters,
  mutations
};
