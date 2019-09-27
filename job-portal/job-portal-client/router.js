import Vue from "vue";
import Router from "vue-router";
import NavBar from "./src/components/NavBar.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "navbar",
      component: NavBar
    }
  ]
});
