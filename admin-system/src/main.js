import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './style.css'

import 'element-plus/dist/index.css'

import plugins from './plugins/fetch/index.js';


import App from './App.vue'
import router from './router'

const app = createApp(App)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$fetch = plugins

app.use(router)
// app.use(plugins)
app.use(ElementPlus)

app.mount('#app')
