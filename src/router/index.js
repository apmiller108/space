import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Launches from "@/views/spacex/Launches";
import LaunchesItemDetail from "@/views/spacex/LaunchesItemDetail";
import NearEarthObjects from "@/views/NearEarthObjects";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/launches",
    name: "Launches",
    component: Launches,
    children: [
      {
        path: ":flightNumber",
        name: "Launch",
        component: LaunchesItemDetail,
        props(route) {
          const flightNumber =
            Number.parseInt(route.params.flightNumber, 10) || 0;
          return { flightNumber };
        }
      }
    ]
  },
  {
    path: "/near_earth_objects",
    name: "NearEarthObjects",
    component: NearEarthObjects
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
