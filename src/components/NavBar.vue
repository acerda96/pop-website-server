<template>
  <nav>
    <ul>
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
