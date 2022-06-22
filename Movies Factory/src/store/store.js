import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {}
  },
  mutations: {
    // 用户信息
    setUser(state, obj) {
      state.userInfo = obj
    }
  }
})
