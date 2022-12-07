<template>
  <div class="top">
    <p>用户信息</p>
  </div>
  <div class="userinfo">
    <div class="portrait">
      <div class="userimg">
        <img :src="'http://127.0.0.1:8080/api/img/user-portrait/' + user.user_pic" v-if="user.user_pic" alt="" />
        <img src="http://127.0.0.1:8080/api/img/inituser-portrait/userimg.jpg" alt="" v-else />
      </div>
      <div class="btn" v-if="user.Id == myuser.Id">
        <input type="file" id="file" accept="image/jpeg,.png" @change="getinfo($event)" />
        <p>更改头像</p>
      </div>
      <!-- 退出按钮 -->
      <button @click="logout" v-if="user.Id == myuser.Id" class="Logout-btn">退出登录</button>
    </div>
    <div class="info">
      <p>名称：{{ user.username }}</p>
      <p>邮箱：{{ user.email }}</p>
      <!-- 最近观看列表 -->
      <p>最近观看</p>
      <div class="uservideolist">
        <el-scrollbar v-if="videoList.length > 0" always>
          <div class="scrollbar-flex-content">
            <div class="video-box" v-for="item in videoList" :key="item.vid" @click="goVideo(item.vid)">
              <a class="mask"></a>
              <img :src="'http://127.0.0.1:8080/api/img/image/' + item.vimg" alt="" />
              <p>{{ item.vname }}</p>
            </div>
          </div>
        </el-scrollbar>
        <div class="novideolis" v-else>
          <p>暂无观看</p>
        </div>
      </div>
      <p>收藏</p>
      <FilmCollection v-if="filmcollectionList.length>0" :filmcollectionList="filmcollectionList"></FilmCollection>
    </div>
  </div>
</template>

<script>
import { computed, reactive, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Vuex from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import getuserinfo from '../modular/userinfo.js'
import FilmCollection from './FilmCollection.vue'

export default {
  name: 'Userinfo',
  components: { FilmCollection },
  setup() {
    const { proxy } = getCurrentInstance()
    const store = Vuex.useStore()
    const router = useRouter()
    const route = useRoute()
    const myuser = computed(() => store.state.userInfo)
    const uid = route.params.uid
    let user = ref({})
    let videoList = ref([])
    let filmcollectionList = ref([])

    let userinfo = reactive({
      id: myuser.value.Id,
      imgname: '',
      imgdata: ''
    })

    const getinfo = event => {
      const fl = event.target.files[0]

      const flsize = fl.size / 1024 / 1024

      // 判断是否大于10m
      if (flsize < 10) {
        // console.log(fl)
        userinfo.imgname = fl.name

        const fr = new FileReader()
        fr.readAsDataURL(fl)

        // 监听读取成功
        fr.onload = function (e) {
          userinfo.imgdata = e.target.result
        }
        // 发起post请求
        fr.onloadend = async function () {
          await proxy.$api.postdata.postAddImg(userinfo).then(res => {
            if (res.data.code == 200) {
              ElMessage({
                message: '更换头像成功',
                type: 'success'
              })
            }
          })
          // 获取新的用户信息
          const newUserinfo = await proxy.$api.getdata.getUserInfo(userinfo.id)
          // 更新用户信息
          store.commit('setUser', newUserinfo.data.userinfo[0])
          // 刷新页面
          location.reload()
        }
      } else {
        ElMessage.error('请上传10M以内的图片')
      }
    }

    watch(
      () => route.params.uid,
      () => {
        location.reload() //刷新网页
      }
    )

    // 退出登录
    function logout() {
      ElMessageBox.confirm('是否确定退出该账号？', '退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          store.commit('removeUserinfo')
          // 调用完成后直接刷新页面
          router.push('/login')
        })
        .catch(() => {})
    }

    // 跳转到视频页面
    function goVideo(vid) {
      router.push('/video/' + vid)
    }

    onMounted(async () => {
      // 获取用户信息
      const data = await getuserinfo(uid)
      user.value = data.data.userinfo[0]

      // 获取此用户的近期观看列表
      if (JSON.parse(user.value.videolist) || JSON.parse(user.value.filmcollection) != null) {
        const list = {
          videolist: JSON.parse(user.value.videolist),
          filmcollection: JSON.parse(user.value.filmcollection)
        }
        const oldlist = await proxy.$api.postdata.postUserVideoList(list)
        videoList.value = oldlist.data.data
        filmcollectionList.value = oldlist.data.filmcollectionList
      }
    })

    return {
      myuser,
      user,
      videoList,
      filmcollectionList,
      getinfo,
      logout,
      goVideo
    }
  }
}
</script>

<style scoped>
input {
  color: #fff;
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

.userinfo {
  display: flex;
  width: 1300px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 50px;
}

.portrait {
  width: 200px;
  margin-left: 40px;
  border-right: 3px solid #fff;
  height: 1000px;
  padding-left: 80px;
}

.userimg {
  width: 100px;
  height: 100px;
  border-radius: 100px;
  border: 3px solid #fff;
  margin-bottom: 30px;
  overflow: hidden;
}

.userimg img {
  width: 100%;
  height: 100%;
}

.info {
  margin-left: 30px;
  font-size: 26px;
  color: #fff;
}

.info p {
  margin-top: 10px;
}

.btn {
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 30px;
  background-color: #323232;
  padding-top: 3px;
}

input {
  position: absolute;
  top: 0;
  opacity: 0;
}

.btn p {
  text-align: center;
  color: #fff;
}

.uservideolist {
  width: 880px;
  height: 300px;
  background: #323232;
  padding: 15px;
  position: relative;
  user-select: none;
}

.video-box {
  position: relative;
  cursor: pointer;
  margin-right: 20px;
}
.video-box img {
  width: 200px;
  height: 280px;
}

.video-box p {
  position: absolute;
  left: 20px;
  bottom: 40px;
  font-weight: 600;
}

.mask {
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 200px;
  height: 280px;
  background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0), rgba(0, 0, 0, 0.7));
}

.scrollbar-flex-content {
  display: flex;
}

.novideolis p {
  text-align: center;
  line-height: 300px;
  color: #686868;
  font-size: 36px;
}

.Logout-btn {
  margin-top: 20px;
  border: none;
  width: 100px;
  height: 35px;
  background-color: #323232;
  color: rgb(255, 255, 255);
  font-size: 15px;
  cursor: pointer;
}

.FilmCollection {
  width: 880px;
  background-color: #323232;
  padding: 15px;
}

.FilmCollection-list {
  width: 100%;
  overflow: hidden;
}

.FilmCollection-list div {
  float: left;
}
.page-box {
  width: 600px;
  margin: 0 auto;
}

/* :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #ff9800 !important;
} */
</style>
<style>
.el-message-box {
  background-color: #323232 !important;
  border: 1px solid #323232;
}
.el-message-box__title {
  color: #fff;
}

.el-message-box__content {
  color: rgb(184, 184, 184);
}

.el-pagination-bg-color {
  background: #323232 !important;
}

.el-pagination.is-background .el-pager li:not(.disabled) {
  background-color: #323232;
  color: #fff;
  font-size: 16px;
}

.el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
  background-color: rgb(130, 130, 130);
}

.el-pagination.is-background .btn-next:disabled,
.el-pagination.is-background .btn-prev:disabled {
  background-color: #323232;
}

.el-pagination.is-background .btn-next.is-first,
.el-pagination.is-background .btn-prev.is-first,
.el-pagination.is-background .el-pager {
  background-color: #323232;
  color: #fff;
  font-size: 16px;
}

.el-pagination.is-background .btn-next.is-last,
.el-pagination.is-background .btn-prev.is-last,
.el-pagination.is-background .btn-next,
.el-pagination.is-background .el-pager {
  background-color: #323232;
  color: #fff;
  font-size: 16px;
}

.el-pagination__editor.el-input .el-input__inner {
  font-size: 16px;
}
</style>
