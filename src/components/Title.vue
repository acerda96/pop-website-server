<template>
  <div class="title">Your Local Marketplace</div>
</template>

<script>
export default {
  name: "Title",
};
</script>

<style lang="scss">
@import "../styles/_variables.scss";

.title {
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 100px;
  font-family: $title-font;
  color: $main-font-color;
  background-color: rgb(250, 188, 53);
  width: 700px;
  height: 350px;
}

@media (max-width: 800px) {
  .title {
    font-size: 70px;
    width: 500px !important;
    height: 250px;
  }
}

@media (max-width: 550px) {
  .title {
    font-size: 60px !important;
    width: 400px !important;
    height: 200px !important;
  }
}
</style>
