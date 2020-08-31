<template>
  <div class="nav">
    <nav class="desktop-nav">
      <MenuIcon class="menu-icon" @click="toggleNav" />
      <router-link class="logo" to="/">POP</router-link>
      <ul class="desktop-nav-ul">
        <li>
          <router-link to="/">Shop</router-link>
        </li>
        <li>
          <router-link to="/">Host</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/contact">Contact Us</router-link>
        </li>
      </ul>
    </nav>
    <ul class="mobile-nav-ul" ref="nav">
      <li>
        <router-link to="/">Shop</router-link>
      </li>
      <hr />
      <li>
        <router-link to="/">Host</router-link>
      </li>
      <hr />
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <hr />
      <li>
        <router-link to="/contact">Contact Us</router-link>
      </li>
      <hr />
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
  height: 90px;
  background-position: right;
  background-color: white;
}
.menu-icon {
  display: none;
}
.logo {
  color: $main-font-color;
  font-size: 40px;
  padding: 30px 30px 20px 70px;
}
.desktop-nav-ul {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
}
.mobile-nav-ul {
  color: white;
}
a {
  text-decoration: none;
  color: $main-font-color;
  font-size: 20px;
  padding: 5px;
}
li {
  list-style-type: none;
  padding: 10px 20px;
}

hr {
  width: 150px;
}
.mobile-nav-ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  background: rgb(76, 73, 73);
  position: fixed;
  transition: 300ms ease all;
  left: -300px;
  top: 90px;
  height: 270px;
  width: 200px;
}

@media (max-width: 800px) {
  .menu-icon {
    display: block;
    padding: 15px 0px 10px 40px;
  }
  .active {
    left: -30px;
  }
  a {
    color: white;
  }
  .desktop-nav-ul {
    display: none;
  }
  .logo {
    padding: 10px 25px 0px 0px;
  }
}
</style>
