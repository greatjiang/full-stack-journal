<script setup>
import About from "./About.vue";
import Banner from "./Banner.vue";
import BlogList from "./BlogList.vue";
</script>
<template>
  <main>
    <section class="section section-min-height">
      <div class="container">
        <!-- banner -->
        <Banner></Banner>

        <div class="row no-gutters-lg">
          <!-- 文章列表 -->
          <BlogList></BlogList>
          <!-- 关于 -->
          <About></About>
        </div>
      </div>
    </section>
  </main>
</template>
<style lang="scss" scoped>
.section-min-height {
  min-height: 90vh;
}
</style>