<template>
  <div class="usercom">
    <div class="top">
      <p>评论 ({{ comments.length }})</p>
    </div>
    <div v-if="comments.length">
      <div class="usercom-text" v-for="(item, index) in comments" :itemData="item" :key="item.cid">
        <div class="userimg">
          <img :src="'http://127.0.0.1:8080/api/img/user-portrait/' + item.user_pic" alt="" v-if="item.user_pic" />
          <img src="../../../inituser-portrait/userimg.jpg" alt="" v-else />
        </div>
        <div class="user-com-text-rigth">
          <div class="text">
            <div class="text-content">
              <p class="p-username">{{ item.username }}</p>
              <p>{{ item.content }}</p>
              <h5>{{ item.date }}</h5>
              <h5 class="reply" @click="replyshow(index, item.username, item.uid, item.cid)">回复</h5>
              <h5 class="delete" v-if="user.Id == item.uid" @click="deletecom(item.cid)">删除</h5>
            </div>
            <!-- 回复列表 -->
            <div class="text-user-reply">
              <div class="text-reply" v-for="(item2, index2) in item.userreply" :key="index2">
                <div class="userimg-reply">
                  <img :src="'http://127.0.0.1:8080/api/img/user-portrait/' + item2.user_pic" alt="" v-if="item2.user_pic" />
                  <img src="../../../inituser-portrait/userimg.jpg" alt="" v-else />
                </div>
                <div class="user-content-reply">
                  <span>{{ item2.username }}</span> 回复 <span class="objname">@{{ item2.objectname }}</span> : <span>{{ item2.content }}</span>
                  <div class="text-reply-bottom">
                    <p>{{ item2.date }}</p>
                    <p @click="replyshow(index, item2.username, item2.uid, item.cid)" class="bottom-reply">回复</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 回复框 -->
          <div :class="active == index ? 'show' : 'reply-text'">
            <div class="comment-publish">
              <div class="user-img">
                <img :src="'http://127.0.0.1:8080/api/img/user-portrait/' + user.user_pic" alt="" v-if="user.user_pic" />
                <img src="../../../inituser-portrait/userimg.jpg" alt="" @click="$router.push('/login')" v-else />
              </div>
              <div class="content">
                <el-input v-model="replyTextarea" :autosize="{ minRows: 3, maxRows: 4 }" type="textarea" style="resize: none" :placeholder="'回复 @' + targetName + '：'" />
              </div>
              <div class="btn">
                <el-button type="primary" style="width: 75px; height: 75px" @click="reply">回复</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 暂无评论 -->
    <div class="nocomments" v-else>
      <p>还没有评论</p>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import moment from 'moment'
import request from '../../utils/request.js'

export default {
  name: 'UserComments',
  setup() {
    const route = useRoute()
    const store = Vuex.useStore()
    const user = computed(() => store.state.userInfo)
    let id = computed(() => route.query.id)
    let comments = ref([])
    let active = ref(-1)
    let targetName = ref('')
    let targetUid = ref()
    let targetCid = ref()
    let replyTextarea = ref('')

    onMounted(async () => {
      // let data = await axios.get('http://127.0.0.1:8080/api/comment?id=' + id.value)
      let data = await request({
        method: 'GET',
        url: '/api/comment?id=' + id.value
      })
      comments.value = data.data.data || []
    })

    // 删除评论
    async function deletecom(cid) {
      comments.value.forEach((item, index) => {
        if (item.cid === cid) {
          comments.value.splice(index, 1)
        }
      })
      await axios
        .post('http://127.0.0.1:8080/api/comment?cid=', {
          cid
        })
        .then(res => {
          if (res.data.code === 200) {
            ElMessage({
              message: '此评论已删除',
              type: 'success'
            })
          }
        })
    }

    // 回复按钮
    function replyshow(index, name, uid, cid) {
      if (!user.value.Id) {
        return ElMessage.error('请先登录')
      }
      active.value = index
      targetName.value = name
      targetUid.value = uid
      targetCid.value = cid
    }

    //发起回复
    async function reply() {
      // 判断回复内容不许为空
      if (!replyTextarea.value.trim()) {
        // 清空回复框
        replyTextarea.value = ''
        return ElMessage.error('请输入回复内容！')
      }

      // 回复的数据
      let replyData = {
        cid: targetCid.value,
        uid: user.value.Id,
        content: replyTextarea.value,
        date: moment().format('YYYY-MM-DD HH:mm'),
        objectname: targetName.value,
        objectuid: targetUid.value
      }

      // 发起请求
      await axios.post('http://127.0.0.1:8080/api/addreply', replyData).then(res => {
        if (res.data.code === 200) {
          ElMessage({
            message: '回复成功',
            type: 'success'
          })
        } else {
          return
        }
      })

      // 为当前回复列表添加新数据
      comments.value[active.value].userreply.push({
        cid: targetCid.value,
        uid: user.value.Id,
        content: replyTextarea.value,
        date: moment().format('YYYY-MM-DD HH:mm'),
        objectname: targetName.value,
        objectuid: targetUid.value,
        uid: user.value.Id,
        user_pic: user.value.user_pic,
        username: user.value.username
      })
      // 清空回复框
      replyTextarea.value = ''

      // 让回复框隐藏
      active.value = -1
    }

    // watch(
    //   // () => comments.value,
    //   // async () => {
    //   //   let data = await axios.get('http://127.0.0.1:8080/api/comment?id=' + id.value)
    //   //   comments.value = data.data.data || []
    //   // },
    //   {
    //     deep: false //是否采用深度监听
    //   }
    // )

    return {
      comments,
      user,
      active,
      targetName,
      replyTextarea,
      deletecom,
      replyshow,
      reply
    }
  }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  content: '';
  display: table;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  *zoom: 1;
}

.usercom {
  width: 800px;
  margin: 0 auto;
  margin-bottom: 100px;
  margin-top: 50px;
}

.top {
  width: 100%;
  border-bottom: 1px solid #fff;
  color: #a8a8a8;
  font-size: 20px;
  margin-bottom: 20px;
}

.usercom-text {
  display: flex;
  margin-bottom: 30px;
}

.userimg {
  width: 50px;
  height: 50px;
  border-radius: 100px;
  overflow: hidden;
  border: 3px solid #fff;
  margin: 0 20px 20px 20px;
}

img {
  width: 100%;
  height: 100%;
}

.text {
  border-bottom: 3px solid rgb(102, 102, 102);
  padding-bottom: 5px;
}

.text-content {
  position: relative;
  width: 680px;
  /* background-color: aqua; */
  min-height: 80px;
  padding-bottom: 35px;
  color: #fff;
  /* border-bottom: 3px solid rgb(102, 102, 102); */
}
.text p {
  position: relative;
  word-break: break-word;
}
.text h5 {
  position: absolute;
  bottom: 5px;
}

.reply {
  position: absolute;
  left: 120px;
  color: #a8a8a8;
  cursor: pointer;
}

.delete {
  position: absolute;
  bottom: 5px;
  right: 0;
  color: #a8a8a8;
  cursor: pointer;
}

.p-username {
  margin-bottom: 10px;
}

.nocomments {
  font-size: 26px;
  color: #a8a8a8;
  text-align: center;
}

.comment-publish {
  width: 700px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
}

.reply-text {
  display: none;
}

.show {
  display: block;
}

.user-img {
  width: 60px;
  height: 60px;
  border-radius: 100px;
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

/* 回复栏 */

.text-reply {
  margin-top: 20px;
  display: flex;
  min-height: 50px;
}
.userimg-reply {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #fff;
  margin-right: 10px;
}
.user-content-reply {
  padding-top: 8px;
  color: #fff;
  width: 640px;
}

.objname {
  color: rgb(114, 180, 238);
  cursor: pointer;
}

.user-content-reply p {
  margin-top: 5px;
  font-size: 12px;
  font-weight: bold;
}
.text-reply-bottom {
  margin-top: 20px;
  display: flex;
}

.text-reply-bottom .bottom-reply {
  margin-left: 5px;
  color: #a8a8a8;
  cursor: pointer;
}
</style>
