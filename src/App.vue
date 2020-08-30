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

#app {
  display: grid;
  grid-template-rows: 150px 700px 300px 400px 400px;
}

.title-container {
  display: flex;
  justify-content: center;
}

.page-container {
  padding-top: 110px;
}

@media (max-width: 800px) {
  #app {
    grid-template-rows: 100px 500px 100%;
  }
}

@media (max-width: 550px) {
  #app {
    grid-template-rows: 80px 400px 100%;
  }
}
</style>
