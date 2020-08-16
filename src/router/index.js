import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Ships from "@/components/Ships.vue";
import Ship from "@/components/Ship.vue";
import Launches from "@/views/spacex/Launches.vue";
import LaunchesItemDetailPreview from "@/views/spacex/LaunchesItemDetailPreview.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/ships",
    name: "Ships",
    component: Ships,
    children: [
      {
        path: ":id",
        name: "Ship",
        component: Ship,
        props: true
      }
    ]
  },
  {
    path: "/launches",
    name: "Launches",
    component: Launches,
    children: [
      {
        path: "preview/:flightNumber",
        name: "LaunchPreview",
        component: LaunchesItemDetailPreview,
        props(route) {
          const flightNumber =
            Number.parseInt(route.params.flightNumber, 10) || 0;
          return { flightNumber };
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
