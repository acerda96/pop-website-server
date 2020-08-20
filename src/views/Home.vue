<template>
  <div class="home">
    This is a home page
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="scss">
@import "../styles/_variables.scss";
.home {
  width: 100%;
  height: 700px;
  margin-top: 100px;
  background-color: $accent-color;
}
</style>
