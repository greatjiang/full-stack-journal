<script setup>
import { ref, reactive, computed } from "vue";

const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
});

let currentPageValue = computed(() => {
  return props.currentPage;
});

let totalPage = computed(() => {
  return Math.ceil(props.total / props.pageSize);
});

const myEmit = defineEmits(["onPageChange"]);
</script>
<template>
  <div class="col-12">
    <div class="row">
      <div class="col-12">
        <nav class="mt-4">
          <div class="total-num">共{{ total }}条</div>
          <!-- pagination -->
          <nav class="mb-md-50">
            <ul class="pagination justify-content-center">
              <!-- 上一页 -->
              <li
                v-if="currentPageValue > 1"
                class="page-item"
                @click="$emit('onPageChange', currentPageValue - 1)"
              >
                <a
                  class="page-link"
                  href="javascript:;"
                  aria-label="Pagination Arrow"
                >
                  上一页
                </a>
              </li>

              <!-- 页码 -->
              <!-- <li
                class="page-item"
                v-for="(item, index) in totalPage"
                :key="index"
                :class="{ active: index === currentPageValue - 1 }"
              >
                <a
                  href="javascript:;"
                  class="page-link"
                  v-if="
                    index < 3 ||
                    index > totalPage - 4 ||
                    index === currentPageValue - 1
                  "
                  @click="$emit('onPageChange', index + 1)"
                  >{{ index + 1 }}</a
                >
                <a href="javascript:;" class="page-link" v-if="index === 3"
                  >...</a
                >
              </li> -->

              <!-- 下一页 -->
              <li
                v-if="currentPageValue < totalPage"
                class="page-item"
                @click="$emit('onPageChange', currentPageValue + 1)"
              >
                <a
                  class="page-link"
                  href="javascript:;"
                  aria-label="Pagination Arrow"
                >
                  下一页
                </a>
              </li>
            </ul>
          </nav>
        </nav>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.page-item .page-link {
  padding: 0 2px;
  width: 80px;
}

.total-num {
  display: inline-block;
}
</style>