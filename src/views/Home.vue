<template>
  <div class="home">
    <div class="page-container">
      <div class="title-container">
        <Title />
        <BrowseButton />
      </div>
    </div>
    <div id="about">
      <div class="sub-heading-text">Discover new styles</div>
    </div>
    <div class="sec">
      <img src="../images/image1.jpg" />
      <div class="text-container">
        <div class="main-text">See what's on sale</div>
        <div class="sub-text">
          Find your next favourite shirt or shoes from nearby stores
        </div>
      </div>
    </div>
    <div class="sec">
      <div class="text-container">
        <div class="main-text">Get directions</div>
        <div class="sub-text">
          When you've found your new fit Pop will show you how to get to the
          store
        </div>
      </div>
      <img src="../images/image2.jpg" />
    </div>
    <div class="sec">
      <img src="../images/image3.jpg" />
      <div class="text-container">
        <div class="main-text">Support local businesses</div>
        <div class="sub-text">
          All items are sold by independent sellers
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../components/Title";
import BrowseButton from "../components/BrowseButton";

export default {
  name: "Home",
  components: {
    Title,
    BrowseButton,
  },
};
</script>

<style lang="scss">
@import "../styles/_variables.scss";
.home {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 350px 500px 500px 500px;
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

#about {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $accent-color;
}

.sub-heading-text {
  text-align: center;
  font-size: 50px;
}

.sec {
  background-color: white;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.text-container {
  padding: 20px;
}

.main-text {
  font-weight: bold;
  font-size: 37px;
  text-align: center;
}

.sub-text {
  font-size: 30px;
  text-align: center;
}

img {
  height: 100%;
}

@media (max-width: 800px) {
  .sub-heading-text {
    font-size: 40px;
  }
  .home {
    grid-template-rows: auto 250px 400px 400px 400px;
  }
  .main-text {
    font-weight: bold;
    font-size: 25px;
    text-align: center;
  }
  .sub-text {
    font-size: 20px;
    text-align: center;
  }
}

@media (max-width: 550px) {
  .home {
    grid-template-rows: auto 150px 300px 300px 300px;
  }
  .sub-heading-text {
    font-size: 28px;
  }
  .main-text {
    font-weight: bold;
    font-size: 20px;
    text-align: center;
  }
  .sub-text {
    font-size: 15px;
    text-align: center;
  }
}
</style>
