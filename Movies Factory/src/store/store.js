import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userinfo')) || {}
  },
  mutations: {
    // 用户信息
    setUser(state, obj) {
      state.userInfo = obj
      localStorage.setItem('userinfo', JSON.stringify(obj))
    },

    // 退出登录
    removeUserinfo(state) {
      localStorage.removeItem('userinfo')
      state.userInfo = {}
    }
  }
})
