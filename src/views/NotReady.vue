<template>
  <div class="not-ready">
    <div class="container">
      <div class="container-title">We're not quite ready yet!</div>
      <div class="container-info">
        We appreciate your enthusiasm! If you enter your email below, we'll keep
        you updated with our progress on Pop (and give you first access when
        it's ready).
      </div>
      <input placeholder="Email address" />
    </div>
  </div>
</template>

<script>
export default {
  name: "NotReady",
};
</script>

<style lang="scss">
.not-ready {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background-color: rgb(193, 224, 189);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 40px;
  max-height: 500px;
  max-width: 1000px;
  &-title {
    font-size: 50px;
    text-align: center;
  }
  &-info {
    font-size: 30px;
    padding: 20px;
    text-align: center;
    width: 60%;
  }
  input {
    background-color: rgb(193, 224, 189);
    border: none;
    border-bottom: 1px solid black;
    padding: 10px;
    max-width: 500px;
  }
}

@media (max-width: 800px) {
  .container {
    &-title {
      font-size: 40px;
    }
    &-info {
      font-size: 20px;
      width: 80%;
    }
  }
}

@media (max-width: 550px) {
  .container {
    &-title {
      font-size: 30px;
    }
    &-info {
      font-size: 15px;
      padding: 10px;
    }
  }
}
</style>
