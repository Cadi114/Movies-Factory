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
      <div class="btn">
        <input type="file" id="file" accept="image/jpeg,.png" @change="getinfo($event)" />
        <p>更改头像</p>
      </div>
      <!-- <button @click="postimg">发送</button> -->
    </div>
    <div class="info">
      <p>名称：{{ user.username }}</p>
      <p>邮箱：{{ user.email }}</p>
      <!-- 退出按钮 -->
      <button @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
import { computed, reactive, watch, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import getuserinfo from '../modular/userinfo.js'

export default {
  name: 'Userinfo',
  setup() {
    const { proxy } = getCurrentInstance()
    const store = Vuex.useStore()
    const router = useRouter()
    const user = computed(() => store.state.userInfo)
    if (!user.value.Id) {
      router.push('/login')
    }

    let userinfo = reactive({
      id: user.value.Id,
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
        }
      } else {
        ElMessage.error('请上传10M以内的图片')
      }
    }

    // 退出登录
    function logout() {
      console.log('退出登录')
      store.commit('removeUserinfo')
      // 调用完成后直接刷新页面
      location.reload()
    }

    return {
      user,
      getinfo,
      logout
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
  width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
}

.portrait {
  width: 200px;
  margin-left: 40px;
  border-right: 3px solid #fff;
  height: 400px;
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
</style>
