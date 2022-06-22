import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'

const app = createApp(App)

// 挂载路由
app.use(router)
app.use(ElementPlus)
app.use(store)

app.mount('#app')
