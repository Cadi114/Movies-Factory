import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userinfo')) || {},
    textarea: ''
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
    },

    // 评论框内容
    changeInput(state, val) {
      state.textarea = val
    }
  }
})
