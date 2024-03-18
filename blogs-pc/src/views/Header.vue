<script setup>
import { ref, inject } from "vue";

const search = ref("");

const emitter = inject("emitter");

const searchAction = () => {
  // console.log("search.value:" + search.value);
  // if (search.value === "") return;
  emitter.emit("search", { title: search.value });
};
</script>
<template>
  <header class="navigation">
    <div class="container-fluid">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light navbar-dark">
          <a class="website-title" href="/">
            <img src="../assets/images/logo.png" alt="" />
            <span>全栈日记</span>
          </a>

          <form
            action="javascript:;"
            class="search order-lg-3 order-md-2 order-3 ml-auto search-wrapper"
          >
            <input
              id="search-query"
              name="search"
              type="search"
              placeholder="搜索"
              autocomplete="off"
              v-model="search"
              @change="searchAction"
            />

            <div class="search-button-jiang" @click="searchAction">
              <i class="bi bi-search"></i>
            </div>
          </form>

          <nav class="nav navbar-collapse nav-jiang">
            <a class="nav-link" href="/">首页</a>
            <a class="nav-link" href="/article/8">关于</a>
          </nav>
        </nav>
      </div>
    </div>
  </header>
</template>
<style lang="scss" scoped>
.website-title {
  height: 80px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  img {
    height: 80px;
    display: block;
  }
  span {
    color: #000;
    cursor: pointer;
    font-size: 28px;
    display: block;
  }
}
.nav-jiang {
  margin-left: 100px;
  a {
    color: #000;
    font-weight: 500;
    font-size: 20px;
  }
}

.search-wrapper {
  position: relative;
}
.search-button-jiang {
  position: absolute;
  height: 16px;
  width: 16px;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.container-fluid {
  padding: 0;
  box-shadow: 0px 0px 2px 0px #ccc;
  background-color: #fff;
}

.navbar {
  border: 0;
  padding: 10px;
}
</style>