<template>
  <div class="usercom">
    <div class="top">
      <p>评论 ({{ comments.length }})</p>
    </div>
    <div v-if="comments.length">
      <div class="usercom-text" v-for="(item, index) in comments" :itemData="item" :key="item.cid">
        <div class="userimg">
          <img :src="'../../../user-portrait/' + item.user_pic" alt="" v-if="item.user_pic" />
          <img src="../../../inituser-portrait/userimg.jpg" alt="" v-else />
        </div>
        <div class="user-com-text-rigth">
          <div class="text">
            <p class="p-username">{{ item.username }}</p>
            <p>{{ item.content }}</p>
            <h5>{{ item.date }}</h5>
            <h5 class="reply" @click="replyshow(index)">回复</h5>
            <h5 class="delete" v-if="user.Id == item.uid" @click="deletecom(item.cid)">删除</h5>
          </div>
          <!-- 回复框 -->
          <div class="reply-text" :class="{ show: active == index }">
            <div class="comment-publish">
              <div class="user-img">
                <img :src="'../../../user-portrait/' + user.user_pic" alt="" v-if="user.user_pic" />
                <img src="../../../inituser-portrait/userimg.jpg" alt="" @click="$router.push('/login')" v-else />
              </div>
              <div class="content">
                <el-input :autosize="{ minRows: 3, maxRows: 4 }" type="textarea" style="resize: none" placeholder="请输入评论" />
              </div>
              <div class="btn">
                <el-button type="primary" style="width: 75px; height: 75px">回复</el-button>
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
import { reactive, onMounted, computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
  name: 'UserComments',
  setup() {
    const route = useRoute()
    const store = Vuex.useStore()
    const user = computed(() => store.state.userInfo)
    let id = computed(() => route.query.id)
    let comments = ref([])
    let active = -1

    onMounted(async () => {
      let data = await axios.get('http://127.0.0.1:8080/api/comment?id=' + id.value)
      comments.value = data.data.data || []
    })

    async function deletecom(cid) {
      // console.log(cid)
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
    function replyshow(index) {
      console.log(123)
      console.log(index)
      this.active = index
      console.log(active)
    }

    watch(
      () => comments.value,
      async () => {
        let data = await axios.get('http://127.0.0.1:8080/api/comment?id=' + id.value)
        comments.value = data.data.data || []
      },
      {
        deep: false //是否采用深度监听
      }
    )

    return {
      comments,
      user,
      active,
      deletecom,
      replyshow
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
  position: relative;
  width: 680px;
  /* background-color: aqua; */
  min-height: 80px;
  padding-bottom: 35px;
  color: #fff;
  border-bottom: 3px solid rgb(102, 102, 102);
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
</style>
