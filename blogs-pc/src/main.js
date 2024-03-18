import { createApp } from 'vue'
import './style.css'
import mitt from 'mitt'
import App from './App.vue'
import router from './router'

import plugins from './plugins/fetch/index.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '/src/assets/css/style.scss'

const emitter = mitt()

const app = createApp(App)

app.config.globalProperties.$fetch = plugins
// app.config.globalProperties.$bus = app
app.use(router)
app.provide('emitter', emitter)
app.mount('#app')
