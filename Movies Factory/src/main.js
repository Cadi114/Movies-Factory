import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'

import api from './api'
// import Video from 'video.js'
// import 'video.js/dist/video-js.css'

const app = createApp(App)

app.config.globalProperties.$api = api
// app.config.globalProperties.$video = Video

// 挂载路由
app.use(router)
app.use(ElementPlus)
app.use(store)
app.use(api)

app.mount('#app')
