<template>
  <div class="nav">
    <nav class="desktop-nav">
      <MenuIcon class="menu-icon" @click="toggleNav" />
      <router-link class="logo" to="/">Pop</router-link>
      <ul class="desktop-nav-ul">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/contact">Contact Us</router-link>
        </li>
        <li>
          <router-link to="shop">Get The App</router-link>
        </li>
      </ul>
    </nav>
    <ul class="mobile-nav-ul" ref="nav">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/contact">Contact Us</router-link>
      </li>
      <li>
        <router-link to="shop">Get The App</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import MenuIcon from "vue-material-design-icons/Menu.vue";

export default {
  name: "NavBar",
  components: {
    MenuIcon,
  },
  methods: {
    toggleNav() {
      const nav = this.$refs.nav.classList;
      nav.contains("active") ? nav.remove("active") : nav.add("active");
    },
  },
};
</script>

<style></style>
