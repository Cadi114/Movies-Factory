import { createRouter, createWebHashHistory } from 'vue-router'
import { computed } from 'vue'
import Home from '../components/home/Home.vue'
import Vuex from 'vuex'

const router = createRouter({
  // 指定路由工作模式
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/login', component: () => import('../components/login/Login.vue') },
    { path: '/video', component: () => import('../components/video/Video.vue') },
    { path: '/screen', component: () => import('../components/screen/Screen.vue') },
    { path: '/class', component: () => import('../components/class/VideoClass.vue') },
    { path: '/userinfo', component: () => import('../components/userinfo/Userinfo.vue') }
  ]
})

// 从vuex中获取用户id
const store = Vuex.useStore()
const user = computed(() => store)

// 声明全局的导航首位
// router.beforeEach((to, from, next) => {
//   if (to.path === '/userinfo') {
//     if (!user.value.id) {
//       next('/login')
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
