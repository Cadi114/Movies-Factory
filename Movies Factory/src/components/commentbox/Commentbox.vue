<template>
  <div class="comment-publish" v-if="CommentType">
    <div class="user-img">
      <img :src="'http://127.0.0.1:8080/api/img/user-portrait/' + user.user_pic" alt="" v-if="user.user_pic" />
      <img src="http://127.0.0.1:8080/api/img/inituser-portrait/userimg.jpg" alt="" @click="$router.push('/login')" v-else />
    </div>
    <div class="content">
      <el-input v-model="inputvalue" @input="changeCommentInput" :autosize="{ minRows: 3, maxRows: 4 }" type="textarea" style="resize: none" placeholder="请输入评论" />
      <el-button class="emoji-btn" type="primary" style="height: 25px">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-biaoqing"></use>
        </svg>
        表情
      </el-button>
    </div>
    <div class="btn">
      <el-button type="primary" style="width: 75px; height: 75px" @click="publish">发表评论</el-button>
    </div>
  </div>
  <div class="comment-publish-reply" v-else>
    <div class="user-img">
      <img :src="'http://127.0.0.1:8080/api/img/user-portrait/' + user.user_pic" alt="" v-if="user.user_pic" />
      <img src="http://127.0.0.1:8080/api/img/inituser-portrait/userimg.jpg" alt="" @click="$router.push('/login')" v-else />
    </div>
    <div class="content">
      <el-input v-model="replyTextarea" :autosize="{ minRows: 3, maxRows: 4 }" type="textarea" style="resize: none" :placeholder="'回复 @' + targetinfo.targetName + '：'" />
      <el-button class="emoji-btn" type="primary" style="height: 25px">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-biaoqing"></use>
        </svg>
        表情
      </el-button>
    </div>
    <div class="btn">
      <el-button type="primary" style="width: 75px; height: 75px" @click="reply">回复</el-button>
    </div>
  </div>
</template>

<script>
import { computed, ref, getCurrentInstance, watch } from 'vue'
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
      publish,
      changeCommentInput,
      reply
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
</style>
