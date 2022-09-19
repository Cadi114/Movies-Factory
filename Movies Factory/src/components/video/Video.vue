<template>
  <div class="video-box">
    <div class="video">
      <p class="title">{{ videoinfo.vname }}</p>
      <div class="video-play">
        <video preload="metadata" controls="controls" :src="'http://127.0.0.1:8080/api/video/' + videoinfo.vurl" v-if="videoinfo.vurl"></video>
        <!-- <video preload="metadata" controls="controls" :src="'http://127.0.0.1:8080/api/video/video-1.mp4'"></video> -->
        <!-- 选集列表 -->
        <div class="video-film" v-if="videoinfo.film != ''">
          <p class="video-film-text">选集</p>
          <ul>
            <li v-for="(item, index) in videoinfo.film" :key="item.filmnum" @click="filmClick(index)" :class="active == index ? 'current' : ''">{{ item.filmnum }}</li>
          </ul>
        </div>
        <div class="video-introduce">
          <div class="img-max">
            <img :src="'http://127.0.0.1:8080/api/img/image/' + videoinfo.vimg" alt=" " />
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
          <img :src="'http://127.0.0.1:8080/api/img/user-portrait/' + user.user_pic" alt="" v-if="user.user_pic" />
          <img src="http://127.0.0.1:8080/api/img/inituser-portrait/userimg.jpg" alt="" @click="$router.push('/login')" v-else />
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
    <!-- 底部评论框 -->
    <transition name="ButtomContentTransition">
      <div class="buttom-content" v-show="ButtomContentShow">
        <div class="content">
          <el-input v-model="textarea" :autosize="{ minRows: 3, maxRows: 4 }" type="textarea" style="resize: none" placeholder="请输入评论" />
        </div>
        <div class="btn">
          <el-button type="primary" style="width: 75px; height: 75px" @click="publish">发表评论</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, computed, ref, getCurrentInstance, watch } from 'vue'
import { ElMessage } from 'element-plus'
import Vuex from 'vuex'
import UserComment from '../user-comments/user-comments.vue'
import moment from 'moment'

export default {
  name: 'Video',
  setup() {
    let { proxy } = getCurrentInstance()
    const route = useRoute()
    const router = useRouter()
    const store = Vuex.useStore()
    const user = computed(() => store.state.userInfo)
    let videoinfo = ref({})
    let id = computed(() => route.query.id)
    let filmnum = computed(() => route.query.filmnum - 1)
    let active = ref(filmnum.value || 0)
    let ButtomContentShow = ref(false)

    onMounted(async () => {
      // let data = await axios.get('http://127.0.0.1:8080/api/videoinfo?id=' + id.value)
      let data = await proxy.$api.getdata.getVideoInfoID(id.value)
      videoinfo.value = data.data.data
      // 选集
      if (filmnum.value) {
        videoinfo.value.vurl = videoinfo.value.film[filmnum.value].filmdata
      }

      // 监听滚动条高度，如果大于1750就让底部评论框显示
      window.addEventListener('scroll', () => {
        // console.log(document.documentElement.offsetHeight, document.documentElement.scrollTop, document.documentElement.clientHeight)
        if (document.documentElement.scrollTop > 1750) {
          ButtomContentShow.value = true
        } else {
          ButtomContentShow.value = false
        }
      })
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
          await await proxy.$api.postdata
            .postRelease({
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

    //选集点击事件
    function filmClick(index) {
      videoinfo.value.vurl = videoinfo.value.film[index].filmdata
      active.value = index
      if (videoinfo.value.film[index].filmnum === 1) {
        router.push('/video?id=' + id.value)
      } else {
        router.push('/video?id=' + id.value + '&filmnum=' + videoinfo.value.film[index].filmnum)
      }
    }

    return {
      user,
      videoinfo,
      textarea,
      active,
      ButtomContentShow,
      publish,
      filmClick
    }
  },
  components: {
    UserComment
  }
}
</script>

<style scoped>
.video-box {
  padding-bottom: 100px;
}
.video {
  width: 1200px;
  /* background-color: aqua; */
  margin: 80px auto;
}

.video .title {
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

/* 选集 */

.video-film {
  margin-top: 40px;
}

.video-film-text {
  margin: 0 0 10px 10px;
  font-size: 24px;
  color: #fff;
}

.video-film ul {
  display: flex;
  flex-wrap: wrap;
}

.video-film ul li {
  width: 80px;
  height: 40px;
  background-color: #323232;
  border: #a8a8a8 solid 1px;
  color: #a8a8a8;
  font-size: 20px;
  margin: 10px 10px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}

.current {
  background-color: burlywood !important;
  color: #fff !important;
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

.buttom-content {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  height: 100px;
  width: 900px;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  background-color: #3d3d3d;
}

/* 底部评论框过渡动画 */
.ButtomContentTransition-enter-from {
  opacity: 0;
}

.ButtomContentTransition-enter-active {
  transition: opacity 0.8s;
}

.ButtomContentTransition-enter-to {
  opacity: 1;
}

.ButtomContentTransition-leave-from {
  opacity: 1;
}

.ButtomContentTransition-leave-active {
  transition: opacity 0.5s;
}

.ButtomContentTransition-leave-to {
  opacity: 0;
}
</style>
