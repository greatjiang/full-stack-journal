<script setup>
import { getCurrentInstance, onMounted, ref, inject } from "vue";
import Pagination from "../components/Pagination.vue";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
const router = useRouter();

const { proxy } = getCurrentInstance();

const list = ref([]);
const total = ref(0);
// 搜索内容
const searchValue = ref("");
const currentPage = ref(1);
// 标签
const label = ref(0);

const emitter = inject("emitter");

onMounted(() => {
  getList();
  // getMe();

  emitter.on("search", (item) => {
    if (item.title || item.title === "") {
      searchValue.value = item.title;
    }

    // console.log(item.label);
    if (item.label || item.label === 0) {
      label.value = item.label;
    }
    // console.log(label.value);
    getList();
  });
});

async function getList(pageSize, currentPage) {
  let params = {};
  if (searchValue.value !== "") {
    params.title = encodeURIComponent(searchValue.value);
  }
  if (label.value !== 0) {
    params.label = encodeURIComponent(label.value);
  }

  params.currentPage = currentPage || 1;
  params.pageSize = pageSize || 10;

  const { data, code } = await proxy.$fetch("/api/list", {
    params,
  });

  if (code === 1) {
    // console.log(data);
    list.value = data.list;
    total.value = data.total;
  }
}

function pageChange(currentPageValue) {
  // console.log("currentPageValue" + currentPageValue);
  // if (currentPageValue === 1) return;
  currentPage.value = currentPageValue;
  getList(10, currentPageValue);
}

function detail(id) {
  router.push(`/article/${id}`);
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
</script>
<template>
  <div class="blog-list col-lg-8 mb-5 mb-lg-0">
    <div class="row">
      <div class="col-12 mb-4" v-for="item in list" :key="item">
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
            <!-- <p class="card-text">
              {{ decodeURIComponent(item.summary) }}
            </p> -->
            <div class="content">
              <a class="read-more-btn" @click="detail(item.id)">阅读详情</a>
            </div>

            <div class="content">
              更新时间:{{ formatDate(item.updated_at) }} 访问量:{{
                item.visitnum
              }}
            </div>

            <div class="recommand-corner" v-if="item.level === 9999">置顶</div>
          </div>
        </article>
      </div>

      <!-- 分页 -->
      <Pagination
        :total="total"
        :currentPage="currentPage"
        @onPageChange="pageChange"
      ></Pagination>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.article-card {
  position: relative;
  padding: 20px 30px;
  // border: 1px solid #ccc;
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
</style>