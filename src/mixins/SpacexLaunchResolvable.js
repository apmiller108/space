import launchesApi from "@/services/spacex/launchesApi";
import store from "@/store/index";

export default {
  data() {
    return {
      launch: null
    };
  },
  async beforeRouteEnter(to, _from, next) {
    const { flightNumber } = to.params;
    let launch = store.getters["launches/findByFlightNumber"](flightNumber);
    if (!launch) {
      await launchesApi
        .get(flightNumber)
        .then(data => {
          launch = data;
        })
        .catch(() => next({ name: "Launches" }));
    }
    next(vm => {
      vm.launch = launch;
      vm.$store.commit("launches/setActiveLaunch", launch);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("launches/clearActiveLaunch");
    next();
  }
};
