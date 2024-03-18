<script setup>
import { onMounted, reactive, getCurrentInstance, ref, inject } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

const { proxy } = getCurrentInstance();

function detail(id) {
  router.push(`/article/${id}`);
}

onMounted(() => {
  getMe();

  getLabels();
});

const my = reactive({
  title: "",
  summary: "",
});

async function getMe() {
  const { data, code } = await proxy.$fetch(`/api/detail`, {
    params: {
      id: 8,
    },
  });

  if (code === 1) {
    my.title = data.title;
    my.summary = data.summary;
  }
}

const labels = ref([]);
async function getLabels() {
  const { data, code } = await proxy.$fetch(`/api/labelslist`);

  if (code === 1) {
    labels.value = data.list;
  }
}

const emitter = inject("emitter");

const curLabel = ref(0);
const selectLabel = (item) => {
  if (curLabel.value === item) {
    curLabel.value = 0;
  } else {
    curLabel.value = item;
  }
  // console.log(curLabel.value, item);
  emitter.emit("search", { label: curLabel.value });
};
</script>
<template>
  <div class="col-lg-4">
    <div class="widget-blocks _labels">
      <div class="row">
        <div class="col-lg-12">
          <div class="widget">
            <div class="widget-body">
              <h2 class="widget-title">标签</h2>
              <div class="labels-container">
                <a
                  class="label-tag"
                  :class="{ cur: curLabel === item.id }"
                  v-for="item in labels"
                  :key="item"
                  @click="selectLabel(item.id)"
                  >{{ item.name }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="widget-blocks">
      <div class="row">
        <div class="col-lg-12">
          <div class="widget">
            <div class="widget-body">
              <h2 class="widget-title">
                {{ decodeURIComponent(my.title) }}
              </h2>
              <p class="mb-3 pb-2">
                {{ decodeURIComponent(my.summary) }}
              </p>
              <a
                href="javascript:;"
                @click="detail(8)"
                class="btn btn-sm btn-outline-primary"
                >阅读详情</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
._labels {
  margin-bottom: 20px;
}

.labels-container {
  display: flex;
  flex-wrap: wrap;
}

.label-tag {
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  padding: 5px 10px;
  // background-color: #eeeeee;
  margin: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  color: #000;
  text-decoration: none;

  &:hover {
    background: #f08a5d;
    color: #fff;
    border-color: #f08a5d;
  }

  &.cur {
    background: #f08a5d;
    color: #fff;
    border-color: #f08a5d;
  }
}

.widget-body {
  box-shadow: none;
  border: 1px solid #ebebeb;
  border-radius: 5px;
}
</style>