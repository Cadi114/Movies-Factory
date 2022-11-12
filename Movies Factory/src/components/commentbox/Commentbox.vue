<template>
  <div class="comment-publish" v-if="CommentType === 1">
    <div class="user-img">
      <img :src="'http://127.0.0.1:8080/api/img/user-portrait/' + user.user_pic" alt="" v-if="user.user_pic" />
      <img src="http://127.0.0.1:8080/api/img/inituser-portrait/userimg.jpg" alt="" @click="$router.push('/login')" v-else />
    </div>
    <div class="content">
      <el-input v-model="inputvalue" @input="changeCommentInput" ref="CommentInput" :autosize="{ minRows: 3, maxRows: 4 }" type="textarea" style="resize: none" placeholder="请输入评论" />
      <el-button class="emoji-btn" type="primary" style="height: 25px" @click.stop="emojiBtn(1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-biaoqing"></use>
        </svg>
        表情
      </el-button>
      <div class="emoji-box" v-show="emojiboxShow">
        <ul class="emoji-list">
          <li class="emoji-item" v-for="(item,index) in emojilist" :key="index" @click="inputEmojiChenge(index)">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" style="width: 75px; height: 75px" @click="publish">发表评论</el-button>
    </div>
  </div>
  <!-- 回复框 -->
  <div class="comment-publish-reply" v-else-if="CommentType === 0">
    <div class="user-img">
      <img :src="'http://127.0.0.1:8080/api/img/user-portrait/' + user.user_pic" alt="" v-if="user.user_pic" />
      <img src="http://127.0.0.1:8080/api/img/inituser-portrait/userimg.jpg" alt="" @click="$router.push('/login')" v-else />
    </div>
    <div class="content">
      <el-input v-model="replyTextarea" ref="replyCommentInput" :autosize="{ minRows: 3, maxRows: 4 }" type="textarea" style="resize: none" :placeholder="'回复 @' + targetinfo.targetName + '：'" />
      <el-button class="emoji-btn" type="primary" style="height: 25px" @click.stop="emojiBtn(3)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-biaoqing"></use>
        </svg>
        表情
      </el-button>
      <div class="emoji-box" v-show="emojiboxReplyShow">
        <ul class="emoji-list">
          <li class="emoji-item" v-for="(item,index) in emojilist" :key="index" @click="replyInputEmojiChenge(index)">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" style="width: 75px; height: 75px" @click="reply">回复</el-button>
    </div>
  </div>
  <!-- 底部框 -->
  <div class="comment-publish" v-else>
    <div class="content">
      <el-input v-model="inputvalue" @input="changeCommentInput" ref="CommentInput" :autosize="{ minRows: 3, maxRows: 4 }" type="textarea" style="resize: none" placeholder="请输入评论" />
      <el-button class="emoji-btn" type="primary" style="height: 25px" @click.stop="emojiBtn(2)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-biaoqing"></use>
        </svg>
        表情
      </el-button>
      <div class="emoji-box-bottom" v-show="emojiboxBottomShow">
        <ul class="emoji-list">
          <li class="emoji-item" v-for="(item,index) in emojilist" :key="index" @click="inputEmojiChenge(index)">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" style="width: 75px; height: 75px" @click="publish">发表评论</el-button>
    </div>
  </div>
</template>

<script>
import { computed, ref, getCurrentInstance, watch, onMounted, onUnmounted, nextTick } from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

export default {
  props: ['vid', 'CommentType', 'targetinfo', 'CommentReplyAdd'],
  setup(props, { emit }) {
    const store = Vuex.useStore()
    const router = useRouter()
    let { proxy } = getCurrentInstance()
    const user = computed(() => store.state.userInfo)
    let textarea = computed(() => store.state.textarea)
    let inputvalue = ref(textarea)
    const vid = props.vid
    const CommentType = props.CommentType
    let targetinfo = ref(props.targetinfo)
    let replyTextarea = ref('')
    let emojiboxShow = computed(() => store.state.emojiboxShow)
    let emojiboxBottomShow = computed(() => store.state.emojiboxBottomShow)
    let emojiboxReplyShow = computed(() => store.state.emojiboxReplyShow)
    const CommentInput = ref(null)
    const replyCommentInput = ref(null)
    const emojilist = ref([
      '😀',
      '😁',
      '😂',
      '🤣',
      '😃',
      '😄',
      '😅',
      '😆',
      '😉',
      '😊',
      '😋',
      '😎',
      '😍',
      '😘',
      '🥰',
      '😗',
      '😙',
      '😚',
      '🙂',
      '🤗',
      '🤩',
      '🤔',
      '🤨',
      '😐',
      '😑',
      '😶',
      '🙄',
      '😏',
      '😣',
      '😥',
      '😮',
      '🤐',
      '😯',
      '😪',
      '😫',
      '🥱',
      '😴',
      '😌',
      '😛',
      '😜',
      '😝',
      '🤤',
      '😒',
      '😓',
      '😔',
      '😕',
      '🙃',
      '🤑',
      '😲',
      '🙁',
      '😖',
      '😞',
      '😟',
      '😤',
      '😢',
      '😭',
      '😦',
      '😧',
      '😨',
      '😩',
      '🤯',
      '😬',
      '😰',
      '😱',
      '🥵',
      '🥶',
      '😳',
      '🤪',
      '😵',
      '🥴',
      '😠',
      '😡',
      '🤬',
      '😷',
      '🤒',
      '🤕',
      '🤢',
      '🤮',
      '🤧',
      '😇',
      '🥳',
      '🥺',
      '🤠',
      '🤡',
      '🤥',
      '🤫',
      '🤭',
      '🧐',
      '🤓',
      '😈',
      '👿'
    ])

    // 发布评论
    async function publish() {
      if (!user.value.Id) {
        router.push('/login')
      } else {
        if (textarea.value.trim()) {
          await await proxy.$api.postdata
            .postRelease({
              uid: user.value.Id,
              vid: vid,
              content: textarea.value,
              date: moment().format('YYYY-MM-DD HH:mm')
            })
            .then(res => {
              if (res.data.code == 200) {
                ElMessage({
                  message: '经验+3',
                  type: 'success'
                })
                location.reload() //刷新网页
              }
            })
          store.commit('changeInput', '')
        } else {
          store.commit('changeInput', '')
          return ElMessage.error('请输入评论内容！')
        }
      }
    }

    function changeCommentInput(val) {
      store.commit('changeInput', val)
    }

    // 回复按钮
    async function reply() {
      // 判断回复内容不许为空
      if (!replyTextarea.value.trim()) {
        // 清空回复框
        replyTextarea.value = ''
        return ElMessage.error('请输入回复内容！')
      }

      // 回复的数据
      let replyData = {
        cid: targetinfo.value.targetCid,
        uid: user.value.Id,
        content: replyTextarea.value,
        date: moment().format('YYYY-MM-DD HH:mm'),
        objectname: targetinfo.value.targetName,
        objectuid: targetinfo.value.targetUid
      }

      // 发起请求
      await proxy.$api.postdata.postAddreply(replyData).then(res => {
        if (res.data.code === 200) {
          ElMessage({
            message: '回复成功',
            type: 'success'
          })
        } else {
          return
        }
      })

      // 把回复内容传给父组件
      emit('CommentReplyAdd', replyTextarea.value)

      // 清空回复框
      replyTextarea.value = ''
    }

    //表情按钮
    function emojiBtn(val) {
      store.commit('emojiBtn', val)
    }

    function emojiboxHide() {
      store.commit('emojiBtn', 0)
    }

    // 点击表情图标事件
    function inputEmojiChenge(index) {
      store.commit('changeInput', inputvalue.value + emojilist.value[index])
      CommentInput.value.focus()
    }

    // 点击回复框的表情图标事件
    function replyInputEmojiChenge(index) {
      replyTextarea.value = replyTextarea.value + emojilist.value[index]
      replyCommentInput.value.focus()
    }

    onMounted(() => {
      // 当用户点击表情框之外的内容时，表情框隐藏
      window.addEventListener('click', emojiboxHide)
    })

    // 卸载事件
    onUnmounted(() => {
      window.removeEventListener('click', emojiboxHide)
    })

    // 监听props.targetinfo的值
    watch(
      () => props.targetinfo,
      (newVal, oldVal) => {
        targetinfo.value = newVal
        replyTextarea.value = ''
      },
      {
        deep: true
      }
    )

    return {
      user,
      inputvalue,
      replyTextarea,
      targetinfo,
      emojiboxShow,
      emojiboxBottomShow,
      emojiboxReplyShow,
      emojilist,
      CommentInput,
      replyCommentInput,
      publish,
      changeCommentInput,
      reply,
      emojiBtn,
      inputEmojiChenge,
      replyInputEmojiChenge
    }
  }
}
</script>

<style scoped>
.comment-publish {
  width: 700px;
  margin: 0 auto;
  /* margin-top: 50px; */
  display: flex;
}

.user-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #fff;
  margin-bottom: 30px;
  overflow: hidden;
  margin-right: 20px;
  margin-top: 5px;
}

.user-img img {
  width: 100%;
  height: 100%;
}

.content {
  position: relative;
  width: 500px;
  height: 100px;
  margin-right: 20px;
}

.emoji-btn {
  margin-top: 5px;
}

.icon {
  width: 20px;
}

.comment-publish-reply {
  width: 700px;
  /* margin-top: 50px; */
  display: flex;
  margin: 20px auto;
}

.emoji-box {
  overflow: auto;
  position: absolute;
  left: 0;
  bottom: -270px;
  width: 400px;
  height: 250px;
  background-color: #3d3d3d;
  border: 1px solid rgb(135, 135, 135);
  box-shadow: 0px 5px 15px #232323;
  padding: 5px;
  z-index: 999;
}

/* .emoji-box::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 0;
  width: 0px;
  height: 0px;
  display: inline-block;
  border-bottom: 8px solid rgb(135, 135, 135);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
} */

.emoji-box-bottom {
  position: absolute;
  overflow: auto;
  left: 0;
  top: -275px;
  width: 400px;
  height: 250px;
  background-color: #3d3d3d;
  border: 1px solid rgb(135, 135, 135);
  box-shadow: 0px 5px 15px #232323;
  padding: 5px;
  z-index: 999;
}

.emoji-list {
  width: 100%;
}

.emoji-item {
  float: left;
  width: 40px;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}

.emoji-item:hover {
  background-color: rgb(100, 100, 100);
}
</style>
