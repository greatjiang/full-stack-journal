<script setup>
import { reactive, ref, onMounted, getCurrentInstance, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

onMounted(() => {
  getCategories();
});

const categorieslist = ref([]);
async function getCategories() {
  const { data, code } = await proxy.$fetch(`/api/categorieslist`);

  if (code === 1) {
    categorieslist.value = data.list;
    // categorieslist.value = [
    //   {
    //     name: "1",
    //     id: 2,
    //     cover: "http://www.greatjiang.com/images/1683450545576-What-is.png",
    //   },
    //   {
    //     name: "2",
    //     id: 2,
    //     cover: "http://www.greatjiang.com/images/1683450587432-javascript.jpg",
    //   },
    // ];
  }
}

function category(id) {
  // router.push(`/categories/${id}`);
  router.push({
    path: `/categories/${id}`,
    meta: {
      img: "123",
    },
  });
}

const onSwiper = (swiper) => {};
const onSlideChange = () => {};

const modules = ref([]);
modules.value = [Pagination, Autoplay];
</script>
<template>
  <!-- banner -->
  <swiper
    :slides-per-view="1"
    :loop="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide
      v-for="item in categorieslist"
      :key="item"
      @click="category(item.id)"
    >
      <img :src="item.cover" class="banner" :alt="item.name" />

      <div class="banner-name">{{ item.name }}专题</div>
    </swiper-slide>
  </swiper>
</template>
<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 300px;
}
.swiper-slide {
  height: 300px;
  margin-bottom: 30px;
}

.banner-name {
  position: absolute;
  top: 5px;
  left: 5px;
  text-align: center;
  line-height: 22px;
  font-size: 22px;
  background: #c4ae0a;
  color: #fff;
  padding: 5px;
  font-weight: 700;
}
</style>