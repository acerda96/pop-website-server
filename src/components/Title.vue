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
  font-weight: bold;
  color: $main-font-color;
  background-color: rgb(250, 188, 53);
  width: 550px;
  height: 320px;
}

@media (max-width: 800px) {
  .title {
    font-size: 70px;
    width: 400px;
    height: 250px;
  }
}

@media (max-width: 550px) {
  .title {
    font-size: 40px;
    width: 300px;
    height: 150px;
  }
}
</style>
