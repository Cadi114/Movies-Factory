import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userinfo')) || {},
    textarea: '',
    emojiboxShow: false,
    emojiboxBottomShow: false,
    emojiboxReplyShow: false
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
    },

    // 表情按钮
    emojiBtn(state, type) {
      if (type === 1) {
        state.emojiboxShow = true
        state.emojiboxBottomShow = false
        state.emojiboxReplyShow = false
      } else if (type === 2) {
        state.emojiboxShow = false
        state.emojiboxBottomShow = true
        state.emojiboxReplyShow = false
      } else if (type === 3) {
        state.emojiboxShow = false
        state.emojiboxBottomShow = false
        state.emojiboxReplyShow = true
      } else {
        state.emojiboxShow = false
        state.emojiboxBottomShow = false
        state.emojiboxReplyShow = false
      }
    }
  }
})
