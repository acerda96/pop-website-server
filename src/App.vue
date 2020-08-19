<template>
  <div id="app">
    <NavBar />
    <div class="page-container">
      <div class="title-container">
        <Title />
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Title from "./components/Title";

export default {
  name: "App",
  components: {
    NavBar,
    Title,
  },
};
</script>

<style>
@import "./styles.scss";
@import "./styles/_variables.scss";

body {
  margin: 0;
  background-image: url("./images/map.jpeg");
  font-family: "Indie Flower";
  background-size: 100%;
}

.title-container {
  display: flex;
  justify-content: center;
}
.page-container {
  padding-top: 220px;
}
</style>
