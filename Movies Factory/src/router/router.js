import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { computed } from 'vue'
import Home from '../components/home/Home.vue'
import Vuex from 'vuex'

const router = createRouter({
  // 指定路由工作模式
  // history: createWebHashHistory(import.meta.env.VITE_APP_BASE_API),
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/:pathMatch(.*)', redirect: '/404' },
    { path: '/home', component: Home },
    { path: '/404', component: () => import('../components/NotFound/NotFound.vue') },
    { path: '/login', component: () => import('../components/login/Login.vue') },
    { path: '/video/:vid', component: () => import('../components/video/Video.vue') },
    { path: '/screen', component: () => import('../components/screen/Screen.vue') },
    { path: '/class', component: () => import('../components/class/VideoClass.vue') },
    { path: '/userinfo/:uid', component: () => import('../components/userinfo/Userinfo.vue') }
  ]
})

// 从vuex中获取用户id
const store = Vuex.useStore()
const user = computed(() => store)

export default router
