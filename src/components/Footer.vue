<template>
  <div class="footer">
    <ul class="footer-links">
      <li>
        <router-link to="/contact">
          <div class="footer-link">
            <div class="link-text">Contact Us</div>
            <Email class="icon" /></div
        ></router-link>
      </li>
      <li>
        <router-link to="/"
          ><div class="footer-link">
            <a class="link-text" href="https://twitter.com/Pop_Marketplace">
              Follow Us
            </a>
            <Twitter class="icon" /></div
        ></router-link>
      </li>
      <li>
        <router-link to="/">
          <div class="footer-link">
            <div class="link-text">Privacy Statement</div>
            <Information class="icon" /></div
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
  ul {
    padding-inline-start: 0px;
    margin-block-start: 0px;
    margin-block-end: 0px;
  }
  li {
    text-align: center;
    padding: 0px;
  }
  a {
    color: $main-font-color;
    text-decoration: underline;
  }
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-evenly;
  margin-left: -9px;
}

.footer-link {
  display: flex;
  justify-content: center;
  align-items: center;
}

.link-text {
  padding-right: 5px;
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
  .copyright {
    font-size: 12px;
  }
}
@media (max-width: 550px) {
  .footer-links {
    margin-left: 0px;
  }
  a {
    font-size: 10px;
  }
  .link-text {
    padding-right: 0px;
  }
  .icon {
    display: none;
  }
}
</style>
