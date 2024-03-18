<script setup>
import Header from "./views/Header.vue";
import Footer from "./views/Footer.vue";

// import { defineAsyncComponent } from "vue";

// const Header = defineAsyncComponent(() => import("./views/Header.vue"));
// const Footer = defineAsyncComponent(() => import("./views/Footer.vue"));
</script>

<template>
  <div class="home">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<style scoped lang="scss">
@import url("./style.css");

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.home {
  // background-color: #efefef;
  background-color: #f6f6f6;
}
</style>
