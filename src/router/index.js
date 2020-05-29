import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Ships from "@/components/Ships.vue";

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
    component: Ships
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
