<template>
  <div class="not-ready">
    <div class="container">
      <div class="container-title">We're not quite ready yet!</div>
      <hr />
      <div class="container-info">
        We appreciate your enthusiasm! If you enter your email below, we'll keep
        you updated with our progress on Pop (and give you first access when
        it's ready).
      </div>
      <form @submit.prevent="submit">
        <input type="text" v-model="email" placeholder="Email address" />
        <button class="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NotReady",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    submit() {
      axios
        .post("api/email-signup", { email: this.email })
        .then(() => console.log("Email added"))
        .catch((err) => console.log(err));

      this.email = "";
    },
  },
};
</script>

<style lang="scss">
@import "../styles/_variables.scss";
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
    border-bottom: 2px solid black;
    padding: 10px;
    max-width: 500px;
    font-family: $main-font;
  }
  hr {
    width: 60%;
    border-color: black;
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
