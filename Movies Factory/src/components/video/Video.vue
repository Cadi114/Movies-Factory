<template>
  <div class="video">
    <p>{{ videoinfo.vname }}</p>
    <div class="video-play">
      <video controls="controls" :src="'../../../video/' + videoinfo.vurl"></video>
      <div class="video-introduce">
        <div class="img-max">
          <img :src="'../../../image/' + videoinfo.vimg" alt=" " />
        </div>
        <ul class="video-introduce-text">
          <h1>{{ videoinfo.vname }} ({{ videoinfo.vtime }})</h1>
          <h3>评分：{{ videoinfo.vfractionl }}</h3>
          <h4>类型：{{ videoinfo.vclass }}</h4>
          <h4>导演：{{ videoinfo.vdirector }}</h4>
          <h4>编剧：{{ videoinfo.vscreenwriter }}</h4>
          <h4>地区：{{ videoinfo.vcountry }}</h4>
          <p>
            {{ videoinfo.vexplain }}
          </p>
        </ul>
      </div>
    </div>
  </div>
  <div class="comment-area">
    <div class="top">
      <p>评论区</p>
    </div>
    <div class="comment-publish">
      <div class="user-img">
        <img :src="'../../../user-portrait/' + user.user_pic" alt="" v-if="user.user_pic" />
        <img src="../../../inituser-portrait/userimg.jpg" alt="" @click="$router.push('/login')" v-else />
      </div>
      <div class="content">
        <el-input v-model="textarea" :autosize="{ minRows: 3, maxRows: 4 }" type="textarea" style="resize: none" placeholder="请输入评论" />
      </div>
      <div class="btn">
        <el-button type="primary" style="width: 75px; height: 75px" @click="publish">发表评论</el-button>
      </div>
    </div>
  </div>
  <!-- 评论区 -->
  <UserComment></UserComment>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, computed, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import Vuex from 'vuex'
import axios from 'axios'
import UserComment from '../user-comments/user-comments.vue'
import moment from 'moment'

export default {
  name: 'Video',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = Vuex.useStore()
    const user = computed(() => store.state.userInfo)

    let videoinfo = ref({})
    let id = computed(() => route.query.id)

    onMounted(async () => {
      let data = await axios.get('http://127.0.0.1:8080/api/videoinfo?id=' + id.value)
      videoinfo.value = data.data.data
    })

    // 发表评论
    let textarea = ref('')
    // 发表日期
    // let date = moment().format('YYYY-MM-DD HH:mm')

    // 发布评论
    async function publish() {
      if (!user.value.Id) {
        router.push('/login')
      } else {
        // console.log(textarea.value, date, id.value, user.value.Id)
        if (textarea.value.trim()) {
          await axios
            .post('http://127.0.0.1:8080/api/release', {
              uid: user.value.Id,
              vid: id.value,
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
          textarea.value = ''
        } else {
          textarea.value = ''
          return ElMessage.error('请输入评论内容！')
        }
      }
    }

    return {
      user,
      videoinfo,
      textarea,
      publish
    }
  },
  components: {
    UserComment
  }
}
</script>

<style scoped>
.video {
  width: 1200px;
  /* background-color: aqua; */
  margin: 80px auto;
}

.video p {
  font-size: 48px;
  text-align: center;
  color: #fff;
}

.video .video-play {
  /* height: 1800px; */
  /* background-color: blue; */
  margin-top: 20px;
}

.video .video-play h2 {
  margin-top: 10px;
  margin-left: 10px;
}

video {
  width: 1200px;
}

.video-introduce {
  margin-top: 80px;
  position: relative;
  width: 100%;
  height: 400px;
  background-color: #323232;
  border: #a8a8a8 solid 2px;
}
.img-max {
  width: 280px;
  height: 355px;
  margin: 25px 20px;
  overflow: hidden;
}

img {
  width: 280px;
}

.video-introduce-text {
  position: absolute;
  left: 330px;
  top: 30px;
  width: 850px;
}

.video-introduce-text h1 {
  color: #fff;
}

.video-introduce-text h3 {
  margin-top: 5px;
  color: rgb(255, 115, 0);
}

.video-introduce-text h4 {
  margin-top: 5px;
  margin-bottom: 10px;
  color: #fff;
}

.video-introduce-text p {
  text-align: left;
  margin-top: 10px;
  color: #fff;
  font-size: 16px;
}

.top {
  width: 1200px;
  margin: 0 auto;
  margin-top: 60px;
  border-bottom: 3px solid #fff;
  font-size: 36px;
  color: #fff;
}

.top p {
  margin-left: 80px;
}

.comment-publish {
  width: 700px;
  margin: 0 auto;
  margin-top: 50px;
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
</style>
