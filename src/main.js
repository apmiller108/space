import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/main.scss";
import uk from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { formatDate } from "@/lib/formatDate";

uk.use(Icons);

Vue.config.productionTip = false;
Vue.filter("date", formatDate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
