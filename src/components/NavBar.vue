<template>
  <nav @click="toggleNav">
    <ul ref="nav">
      <li v-for="link in navLinks" :key="link.text">
        <router-link :to="link.path">{{ link.text }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    navLinks: String,
  },
  methods: {
    toggleNav() {
      const nav = this.$refs.nav.classList;
      nav.contains("active") ? nav.remove("active") : nav.add("active");
    },
  },
};
</script>

<style scoped lang="scss">
nav {
  height: 60px;
  width: 100%;
  background-color: rgb(73, 72, 72);
  box-shadow: 2px 2px 2px #ccc;
  ul {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 30px;
    height: 100%;
    background-color: rgb(73, 72, 72);
    box-shadow: 2px 2px 2px #ccc;
    a {
      text-decoration: none;
      color: white;
      font-weight: bold;
    }
    li {
      list-style-type: none;
      padding: 10px 20px;
    }
  }
}
@media screen and (max-width: 759px) {
  nav {
    ul {
      position: absolute;
      width: 150px;
      flex-direction: column;
      justify-content: flex-start;
      left: -220px;
      transition: 300ms ease all;
      top: 44px;
      &.active {
        top: 44px;
        left: 0px;
      }
      li {
        width: 100%;
        padding-left: 0;
      }
    }
  }
}
</style>
