<template>
  <div id="app">
    <NavBar />
    <div class="page-container">
      <div class="title-container">
        <Title />
      </div>
      <BrowseButton />
    </div>

    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Title from "./components/Title";
import BrowseButton from "./components/BrowseButton";

export default {
  name: "App",
  components: {
    NavBar,
    Title,
    BrowseButton,
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
}

.title-container {
  display: flex;
  justify-content: center;
}

.page-container {
  padding-top: 220px;
}
</style>
