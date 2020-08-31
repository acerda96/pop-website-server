<template>
  <div class="contact-us">
    <div class="contact-us-box">
      <div class="contact-title">Contact Us</div>
      <form class="input-container">
        <div class="names">
          <input placeholder="First Name" />
          <input placeholder="Last Name" />
        </div>
        <input placeholder="Email" />
        <textarea
          placeholder="Type your message here..."
          class="input-message"
        />
        <button type="submit" class="submit-btn">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
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
