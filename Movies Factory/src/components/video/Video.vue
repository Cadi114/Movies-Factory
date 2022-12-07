<template>
  <div class="video-box" v-if="videoinfo.vname ? true : false">
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
          <div class="Collection">
            <el-button type="primary" style="width:100px;height: 40px;font-size: 18px;background-color:#a0cfff ; " @click="deleteCollection()" v-if="CollectionList">已收藏</el-button>
            <el-button type="primary" style="width:100px;height: 40px;font-size: 18px; " @click="addCollection()" v-else>收藏</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-area">
      <div class="top">
        <p>评论区</p>
      </div>
      <Commentbox :vid="id" :CommentType="1"></Commentbox>
    </div>
    <!-- 评论区 -->
    <UserComment></UserComment>
    <!-- 底部评论框 -->
    <transition name="ButtomContentTransition">
      <div class="buttom-content" v-show="ButtomContentShow">
        <Commentbox :vid="id" :CommentType="2"></Commentbox>
      </div>
    </transition>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, computed, ref, getCurrentInstance, watch, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import Vuex from 'vuex'
import UserComment from '../user-comments/user-comments.vue'
import Commentbox from '../commentbox/Commentbox.vue'
import getuserinfo from '../modular/userinfo.js'

export default {
  name: 'Video',
  components: { UserComment, Commentbox },

  setup(props) {
    let { proxy } = getCurrentInstance()
    const route = useRoute()
    const router = useRouter()
    const store = Vuex.useStore()
    const user = computed(() => store.state.userInfo)
    let videoinfo = ref({})
    let id = route.params.vid
    let filmnum = computed(() => route.query.filmnum - 1)
    let active = ref(filmnum.value || 0)
    let ButtomContentShow = ref(false)
    let CollectionList = ref(false)

    const srollFun = () => {
      if (document.documentElement.scrollTop > 1750) {
        ButtomContentShow.value = true
      } else {
        ButtomContentShow.value = false
      }
    }

    // 监听滚动条高度，如果大于1750就让底部评论框显示
    window.addEventListener('scroll', srollFun)

    onMounted(async () => {
      let data = await proxy.$api.getdata.getVideoInfoID(id)
      videoinfo.value = data.data.data
      // 选集
      if (filmnum.value) {
        videoinfo.value.vurl = videoinfo.value.film[filmnum.value].filmdata
      }
      // 判断是否有登陆账号
      if (user.value.Id) {
        proxy.$api.postdata.postAddVideoList({ userId: user.value.Id, videoId: id }).then(res => console.log(res))
        // 判断收藏列表是否有收藏这部电影
        let userdata = await getuserinfo(user.value.Id)
        CollectionList.value = JSON.parse(userdata.data.userinfo[0].filmcollection).includes(id)
      }
    })

    onUnmounted(() => {
      // 销毁组件
      window.removeEventListener('scroll', srollFun)
      store.commit('changeInput', '')
    })

    //选集点击事件
    function filmClick(index) {
      videoinfo.value.vurl = videoinfo.value.film[index].filmdata
      active.value = index
      if (videoinfo.value.film[index].filmnum === 1) {
        router.push('/video/' + id)
      } else {
        router.push('/video/' + id + '?filmnum=' + videoinfo.value.film[index].filmnum)
      }
    }

    // 收藏按钮
    function addCollection() {
      if (user.value.Id) {
        proxy.$api.postdata.postaddCollection({ userId: user.value.Id, videoId: id })
        CollectionList.value = true
        ElMessage({
          message: '收藏成功',
          type: 'success'
        })
      } else {
        return ElMessage.error('请先登录')
      }
    }

    // 取消收藏
    function deleteCollection() {
      if (user.value.Id) {
        proxy.$api.postdata.postdeleteCollection({ userId: user.value.Id, videoId: id })
        CollectionList.value = false
        ElMessage({
          message: '已取消收藏',
          type: 'success'
        })
      } else {
        return ElMessage.error('请先登录')
      }
    }

    return {
      user,
      videoinfo,
      id,
      active,
      ButtomContentShow,
      CollectionList,
      filmClick,
      addCollection,
      deleteCollection
    }
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

.Collection {
  position: absolute;
  top: 30px;
  right: 50px;
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
  margin-bottom: 50px;
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
  padding-bottom: 10px;
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

.emoji-btn {
  margin-top: 5px;
}

.icon {
  width: 20px;
}
</style>
