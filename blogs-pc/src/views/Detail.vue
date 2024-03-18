<script setup>
import { reactive, ref, onMounted, getCurrentInstance, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const id = route.params.id;

const _id = ref(0);
watchEffect(() => {
  _id.value = route.params.id;
});

const { proxy } = getCurrentInstance();

onMounted(() => {
  getDetail(id);
});

const articleDetail = reactive({
  title: "",
  content: "",
});

async function getDetail(id) {
  const { data, code } = await proxy.$fetch(`/api/detail`, {
    params: {
      id,
    },
  });

  if (code === 1) {
    articleDetail.title = data.title;
    articleDetail.content = data.content;
    // JSON.parse
    const labelIdList = JSON.parse(data.label_id);
    if (labelIdList && labelIdList.length > 0) {
      await getList(labelIdList[0].id);
    }
  }
}

const correlationList = ref([]);
async function getList(label) {
  const { data, code } = await proxy.$fetch(`/api/list`, {
    params: {
      label,
    },
  });

  if (code === 1) {
    correlationList.value = data.list;
  }
}

function detail(id) {
  router.push(`/article/${id}`);
  getDetail(id);
}
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-8 content-center">
        <div class="detail-title">
          {{ decodeURIComponent(articleDetail.title) }}
        </div>
        <div
          class="content"
          v-html="decodeURIComponent(articleDetail.content)"
        ></div>
      </div>
      <div class="col-4" v-if="correlationList.length > 1">
        <div class="widget-body correlation">
          <h2 class="widget-title">相关文章</h2>
          <template v-for="item in correlationList" :key="item">
            <a
              class="correlation-title"
              @click="detail(item.id)"
              v-if="item.id != _id"
            >
              {{ decodeURIComponent(item.title) }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.detail-title {
  display: flex;
  align-items: center;
  min-height: 50px;
  line-height: 30px;
  font-size: 20px;
  font-weight: 700;
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 30px 0px;
}
.content {
  min-height: 80vh;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.correlation {
  border: 1px solid #ebebeb;
  border-radius: 5px;
  margin-top: 20px;
  background-color: #fff;
  a {
    // height: 20px;
    background-color: #fff;
    padding: 10px 5px;
    color: #1d1d1d;
    font-size: 16px;
    // font-weight: 500;
    margin: 10px 0;
  }
}

.correlation-title {
  width: 100%;
  display: block;
  text-decoration: none;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 10px 0;
}

.widget-body {
  box-shadow: none;
}

.content-center {
  margin: 0 auto;
}
</style>