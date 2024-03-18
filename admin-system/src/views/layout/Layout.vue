<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { computedRoutes } from '@router/index.js'
import Header from '@components/Header.vue'

const props = defineProps({
  icon: String,
})

const currentRoute = ref('')

const route = useRoute()

onMounted(async () => {
  currentRoute.value = route.path

  watch(
    () => route.path,
    val => {
      currentRoute.value = val
    }
  )

  return {
    currentRoute,
    computedRoutes,
  }
})
</script>

<template>
  <div class="common-layout">
    <el-container direction="vertical">
      <Header></Header>

      <el-container>
        <el-aside style="width: 260px">
          <el-menu
            active-text-color="#fff"
            background-color="#11999e"
            class="el-menu-vertical-demo"
            text-color="#fff"
            :router="true"
            :default-active="currentRoute"
          >
            <template v-for="(item, index) in computedRoutes" :key="index">
              <el-sub-menu
                v-if="item.children && item.children.length > 0"
                :index="item.path"
              >
                <template #title>
                  <el-icon>
                    <component :is="item.meta.icon"></component>
                  </el-icon>
                  <span class="submenu-title">{{ item.meta.title }}</span>
                </template>

                <template
                  v-for="(itemChildren, indexChildren) in item.children"
                  :key="indexChildren"
                >
                  <el-menu-item
                    :index="item.path + '/' + itemChildren.path"
                    v-if="!itemChildren.hidden"
                  >
                    <template #title>
                      <el-icon></el-icon>
                      <span>{{ itemChildren.meta.title }}</span>
                    </template>
                  </el-menu-item>
                </template>
              </el-sub-menu>

              <el-menu-item
                v-if="!item.children && !item.hidden"
                :index="item.path"
              >
                <template #title>
                  <el-icon>
                    <component :is="item.meta.icon"></component>
                  </el-icon>
                  <span style="font-size: 20px">{{ item.meta.title }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style scoped>
.el-menu-vertical-demo {
  width: 100%;
  height: 100%;
  border: none;
}

.el-aside {
  height: calc(100vh - 60px);
}

.el-menu-item {
  font-size: 18px;
}
.el-menu-item.is-active {
  font-size: 18px;
  background-color: #ff5722;
}

.submenu-title {
  font-size: 20px;
}
</style>
