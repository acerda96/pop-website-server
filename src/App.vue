<template>
  <div id="app">
    <NavBar />
    <div class="page-container">
      <div class="title-container">
        <Title />
        <BrowseButton />
      </div>

      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Title from "./components/Title";
import BrowseButton from "./components/BrowseButton";

export default {
  name: "App",
  components: {
    NavBar,
    Title,
    BrowseButton,
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
}

#app {
  display: grid;
  grid-template-areas:
    "nav"
    "main"
    "footer";
  grid-template-rows: 150px auto 130px;
}

.title-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
}

.page-container {
  padding-top: 110px;
}

@media (max-width: 800px) {
  #app {
    grid-template-rows: 100px auto 120px;
  }
}
</style>
