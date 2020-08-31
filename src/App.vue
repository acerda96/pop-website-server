<template>
  <div id="app">
    <NavBar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  },
};
</script>

<style lang="scss">
@import "./styles/_variables.scss";

body {
  margin: 0;
  background-image: url("./images/map.jpeg");
  background-attachment: fixed;
  font-family: $main-font;
  background-size: 100%;
  scroll-padding-top: 50px;
  width: 100%;
  height: 100%;
}
html {
  width: 100%;
  height: 100%;
}

#app {
  min-height: 100%;
  display: grid;
  grid-template-areas:
    "nav"
    "main"
    "footer";
  grid-template-rows: $nav-bar-height 1fr auto;
}

@media (max-width: 800px) {
  #app {
    grid-template-rows: $nav-bar-height-mobile 1fr auto;
  }
}
</style>
