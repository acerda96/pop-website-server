<template>
  <div id="app">
    <NavBar :nav-links="navLinks" />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar,
  },
  data: () => ({
    navLinks: [
      {
        text: "Home",
        path: "/",
      },
      {
        text: "About",
        path: "/about",
      },
      {
        text: "Shop",
        path: "/shop",
      },
    ],
  }),
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
