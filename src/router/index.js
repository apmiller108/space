import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Ships from "@/components/Ships.vue";
import Ship from "@/components/Ship.vue";
import Launches from "@/components/launches/Launches.vue";

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
    component: Launches
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
