<template>
  <div class="footer">
    <ul class="footer-links">
      <li>
        <router-link to="/contact">
          <div class="footer-link">
            <div>Contact Us</div>
            <Email /></div
        ></router-link>
      </li>
      <li>
        <router-link to="/"
          ><div class="footer-link">
            <div>Follow Us</div>
            <Twitter /></div
        ></router-link>
      </li>
      <li>
        <router-link to="/">
          <div class="footer-link">
            <div>Privacy Statement</div>
            <Information /></div
        ></router-link>
      </li>
    </ul>
    <div class="copyright"><Copyright />Pop Marketplace</div>
  </div>
</template>

<script>
import Twitter from "vue-material-design-icons/Twitter.vue";
import Email from "vue-material-design-icons/Email.vue";
import Copyright from "vue-material-design-icons/Copyright.vue";
import Information from "vue-material-design-icons/Information.vue";

export default {
  name: "Footer",
  components: { Twitter, Email, Copyright, Information },
};
</script>

<style lang="scss">
@import "../styles/_variables.scss";

.footer {
  background: $accent-color;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
}

.footer-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

a {
  color: $main-font-color;
}

.copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

@media (max-width: 800px) {
  a {
    font-size: 15px;
  }
}
</style>
