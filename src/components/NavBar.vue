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

<style lang="scss">
@import "../styles/_variables.scss";

.desktop-nav {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 100px;
}
.menu-icon {
  display: none;
}
.logo {
  color: $main-font-color;
  font-weight: bold;
  font-size: 40px;
  padding: 30px 30px 40px 70px;
}
.desktop-nav-ul {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
}
a {
  text-decoration: none;
  color: $main-font-color;
  font-weight: bold;
  font-size: 25px;
  padding: 5px;
}
li {
  list-style-type: none;
  padding: 10px 20px;
}

.mobile-nav-ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(199, 197, 195);
  position: absolute;
  transition: 300ms ease all;

  left: -300px;
  top: 60px;
  height: 270px;
  width: 260px;
}

@media (max-width: 800px) {
  .menu-icon {
    display: block;
    padding: 35px 0px 0px 40px;
  }
  .active {
    left: -30px;
    top: 60px;
  }
  .desktop-nav-ul {
    display: none;
  }
  .logo {
    padding: 30px 50px 0px 0px;
  }
  .title {
    font-size: 70px;
    width: 400px;
    height: 250px;
  }
  .page-container {
    padding-top: 170px;
  }
}

@media (max-width: 550) {
  .title {
    font-size: 40px;
    width: 280px;
    height: 200px;
  }
  .page-container {
    padding-top: 150px;
  }
}
</style>
