<template>
  <!-- login -->
  <div class="login">
    <div class="login-register">
      <div @click="loginbtnshow" :class="showmode? 'loginBtn select' : 'loginBtn'">登录</div>
      <div @click="registerbtnshow" :class="!showmode ? 'registerBtn select' : 'registerBtn'">注册</div>
    </div>

    <!-- logo -->
    <div id="minlogin">
      <img src="./imgs/logo-0.png" alt="">
    </div>

    <!-- 登录界面 -->
    <div class="login-operation">
      <div class="logininput" v-if="loginshow">
        <form action="" id="form1">
          <p>邮箱 / Email</p>
          <input type="text" name="email" v-model.trim="userlogin.loginemail" />
          <p>密码 / password</p>
          <input type="password" name="password" v-model.trim="userlogin.loginpassword" />
          <button type="submit" id="btn1" @click.prevent="logingo">登录</button>
        </form>
      </div>
      <div class="registerinput" v-else>
        <!-- 注册界面 -->
        <form action="" id="form2">
          <div class="register-operation" style="">
            <p>用户昵称 / Name</p>
            <input type="text" name="username" v-model.trim="userregister.username" />
            <p>邮箱 / Email</p>
            <input type="text" name="email" v-model.trim="userregister.email" />
            <p>密码 / Password</p>
            <input type="password" name="password" v-model.trim="userregister.password" />
            <p>确认密码 / Repeat Password</p>
            <input type="password" name="okpassword" v-model.trim="userregister.okpassword" />
            <button type="submit" id="btn2" @click.prevent="registergo">注册</button>
          </div>
        </form>
      </div>

    </div>

  </div>
</template>

<script>
import { reactive, ref, getCurrentInstance } from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import { ElMessage } from 'element-plus'

export default {
  name: 'Login',
  setup() {
    const store = Vuex.useStore()
    let loginshow = ref(true)
    let showmode = ref(true)
    let userlogin = reactive({
      loginemail: '',
      loginpassword: ''
    })
    const { proxy } = getCurrentInstance()

    let userregister = reactive({
      username: '',
      email: '',
      password: '',
      okpassword: ''
    })

    function loginbtnshow() {
      loginshow.value = true
      showmode.value = true
    }

    function registerbtnshow() {
      loginshow.value = false
      showmode.value = false
    }

    let user = ref({})
    // 登录
    async function logingo() {
      await axios
        .post('http://127.0.0.1:8080/api/login', {
          email: userlogin.loginemail,
          password: userlogin.loginpassword
        })
        .then(res => {
          if (res.data.code === 300) {
            ElMessage.error('请输入邮箱和密码！')
          } else if (res.data.code === 301) {
            ElMessage.error('邮箱不存在！')
          } else if (res.data.code === 302) {
            ElMessage.error('密码错误！')
            // 清空密码输入框
            userlogin.loginpassword = ''
          } else if (res.data.code === 200) {
            // 使用组件库里的提示框
            ElMessage({
              message: '登录成功',
              type: 'success'
            })

            user = res.data.data[0]
            store.commit('setUser', user)
            // 跳转到登录前的页面
            if (proxy.prevRoute) {
              proxy.$router.push(proxy.prevRoute)
            }
          }
        })
    }

    // 注册
    async function registergo() {
      await axios.post('http://127.0.0.1:8080/api/register', userregister).then(res => {
        if (res.data.code === 303) {
          ElMessage.error('账户、邮箱、密码、确认密码 不能为空！')
        } else if (res.data.code === 304) {
          ElMessage.error('密码与确认密码不相同')
        } else if (res.data.code === 305) {
          ElMessage.error('邮箱或用户名已被注册')
        } else if (res.data.code === 307) {
          ElMessage({
            message: '注册失败请稍后再试',
            type: 'warning'
          })
        } else if (res.data.code === 200) {
          ElMessage({
            message: '注册成功',
            type: 'success'
          })

          // 清空输入框
          userregister.username = ''
          userregister.email = ''
          userregister.password = ''
          userregister.okpassword = ''

          // 切换到登录页
          loginbtnshow()
        }
      })
    }

    return {
      loginshow,
      showmode,
      userlogin,
      userregister,
      loginbtnshow,
      registerbtnshow,
      logingo,
      registergo
    }
  },
  beforeRouteEnter(to, from, next) {
    //通过vm 获取上一次跳转的地址
    next(vm => {
      vm.prevRoute = from
    })
  }
}
</script>

<style scoped>
input {
  outline: medium;
  text-indent: 10px;
  /* background-color: #323232;
    border: 1px solid #515147; */
}

.shadow {
  box-shadow: 0px 5px 20px #000000;
  /* text-shadow: 0 0 5px #fff; */
}

.login {
  width: 600px;
  height: auto;
  background-color: #4d4d4d;
  margin: 30px auto;
  border: 3px solid #323232;
  box-shadow: 0px 5px 20px #000000;
}

#index {
  margin: 10px 30px;
}

#index a {
  font-size: 30px;
  color: #fff;
}

#index a:hover {
  text-shadow: 0 0 5px #fff;
}

.login-register {
  width: 100%;
}

.login-register div {
  width: 50%;
  height: 80px;
  background-color: #323232;
  float: left;
  font-size: 30px;
  line-height: 80px;
  text-align: center;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}

.login-register div:hover {
  color: #c8c8c8;
  cursor: pointer;
}

.select {
  background-color: #4d4d4d !important;
  color: #fff !important;
}

.login-operation,
.register-operation {
  width: 500px;
  padding: 30px 0 80px 0;
  margin: 0 auto;
  font-size: 20px;
  color: #fff;
}

.login-operation p,
.register-operation p {
  margin-bottom: 5px;
}

.login-operation input,
.register-operation input {
  width: 100%;
  height: 35px;
  margin-bottom: 40px;
  font-size: 20px;
}

#btn1,
#btn2 {
  display: block;
  width: 50%;
  height: 70px;
  font-size: 24px;
  margin: 0 auto;
  background-color: #323232;
  color: #fff;
  box-shadow: 0px 5px 20px #000000;
  border: 1px solid #515147;
  font-weight: bold;
}

#btn1,
#btn2:hover {
  cursor: pointer;
}

#minlogin {
  width: 200px;
  margin: 0 auto;
  padding-top: 120px;
}

#Remember {
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0 5px 25px 0;
}

span {
  line-height: 10px;
}
</style>