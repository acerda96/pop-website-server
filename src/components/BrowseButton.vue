<template>
  <div class="browse-btn-container">
    <div class="browse-btn-inner">
      <div class="browse-btn">Browse For Free</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BrowseButton",
};
</script>

<style lang="scss">
@import "../styles/_variables.scss";

.browse-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  cursor: pointer;
}

.browse-btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1050px;
  height: 40px;
  background-color: $accent-color;
  width: 200px;
  height: 45px;
  border-radius: 15px;
}

.browse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-family: "Coming Soon";
  color: white;
  padding-top: 2px;
  background-color: rgb(110, 177, 84);
  border-radius: 10px;
  width: 180px;
  height: 33px;
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
    width: 280px;
    height: 150px;
  }
}
</style>
