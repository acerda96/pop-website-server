import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Shop from "./views/Shop.vue";
import Vue from "vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/shop",
      name: "shop",
      component: Shop,
    },
  ],
});
