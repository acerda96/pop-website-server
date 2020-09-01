<template>
  <div class="contact-us">
    <div class="contact-us-box">
      <div class="contact-title">Contact Us</div>
      <form class="input-container" @submit.prevent="submit">
        <div class="names">
          <input type="text" v-model="firstName" placeholder="First Name" />
          <input type="text" v-model="lastName" placeholder="Last Name" />
        </div>
        <input type="text" v-model="email" placeholder="Email" />
        <textarea
          v-model="message"
          placeholder="Type your message here..."
          class="input-message"
        />
        <button type="submit" class="submit-btn">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ContactUs",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    };
  },
  methods: {
    submit() {
      axios
        .post("api/contact", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          message: this.message,
        })
        .then(() => console.log("Contact request added"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
@import "../styles/_variables.scss";

$box-padding: 10px;

.contact-us {
  display: flex;
  justify-content: center;
  align-items: center;
}
.contact-us-box {
  background-color: white;
  padding: 30px;
  width: 500px;
  height: 400px;
  .contact-title {
    font-weight: bold;
    font-size: 30px;
    padding: $box-padding;
  }
  input,
  textarea {
    border: 2px solid black;
    padding: 20px;
    margin: 1px;
    font-family: $main-font;
  }
  textarea {
    height: 60px;
  }
  .input-container {
    display: flex;
    flex-direction: column;
    padding: $box-padding;
  }
  .names {
    display: flex;
    justify-content: space-evenly;
    input {
      width: 100%;
    }
  }
}

@media (max-width: 800px) {
  .contact-us-box {
    width: 400px;
    height: 300px;
    .contact-title {
      font-weight: bold;
      font-size: 22px;
      padding: $box-padding;
    }
    input,
    textarea {
      padding: 12px;
    }
    textarea {
      height: 50px;
    }
  }
}

@media (max-width: 550px) {
  .contact-us-box {
    width: auto;
    .names {
      flex-direction: column;
      input {
        width: auto;
      }
    }
  }
}
</style>
