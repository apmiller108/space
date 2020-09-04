import launchesApi from "@/services/spacex/launchesApi";
import store from "@/store/index";

export default {
  computed: {
    launch() {
      return this.$store.getters["launches/activeLaunch"];
    }
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
        .catch(error => console.log(error));
    }
    store.commit("launches/setActiveLaunch", launch);
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("launches/clearActiveLaunch");
    next();
  }
};
