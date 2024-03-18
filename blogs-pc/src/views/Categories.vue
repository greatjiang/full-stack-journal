<script setup>
import { reactive, ref, onMounted, getCurrentInstance, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import moment from "moment-timezone";

const { proxy } = getCurrentInstance();

const route = useRoute();
const router = useRouter();

const categoryId = route.params.category;

onMounted(() => {
  getCategoryBlog(categoryId);
});

const categoryBlogList = ref([]);
async function getCategoryBlog(id) {
  const { data, code } = await proxy.$fetch(`/api/getCategoryBlog`, {
    params: {
      id,
    },
  });

  if (code === 1) {
    categoryBlogList.value = data.list;
  }
}

const formatDate = (dateString) => {
  const utcMoment = moment.utc(dateString);

  // 将 Moment 对象转换为中国标准时间的 Moment 对象
  const chinaMoment = utcMoment.tz("Asia/Shanghai");

  // 将中国标准时间的 Moment 对象转换为字符串
  const chinaTimeString = chinaMoment.format("YYYY-MM-DD HH:mm:ss");
  // console.log(chinaTimeString); // 输出：2022-05-17 16:30:00
  return chinaTimeString;
};

function detail(id) {
  router.push(`/article/${id}`);
}
</script>
<template>
  <div class="blog-list col-lg-8">
    <div class="row">
      <div class="col-12 mb-4" v-for="item in categoryBlogList" :key="item">
        <article class="article-card">
          <a href="javascript:;">
            <div class="card-image"></div>
          </a>
          <div class="card-body px-0 pb-1">
            <h2 class="h3">
              <a class="post-title" @click="detail(item.id)">{{
                decodeURIComponent(item.title)
              }}</a>
            </h2>
            <div class="content">
              <a class="read-more-btn" @click="detail(item.id)">阅读详情</a>
            </div>

            <div class="content">
              更新时间:{{ formatDate(item.updated_at) }} 访问量:{{
                item.visitnum
              }}
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.article-card {
  position: relative;
  padding: 20px 30px;
  box-shadow: none;
  border-radius: 5px;
  background: #fff;
}

.post-title {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recommand-corner {
  width: 50px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  background-color: #f08a5d;
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 16px;
  font-weight: 700;
}

.blog-list {
  margin: 0 auto;
  margin-top: 20px;
  min-height: 85vh;
}
</style>