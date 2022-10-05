<template>
  <!-- 导航栏 -->
  <div class="yemei clearfix">
    <div class="logo" @click="$router.push('/home')">
      <img src="./imgs/logo-0.png" alt="" class="logo-img" />
    </div>
    <ul>
      <li class="user">
        <div class="username">
          <p v-if="user.username" @click="gouserinfo">{{ user.username }}</p>
          <p v-else @click="$router.push('/login')">请登录</p>
        </div>
        <div class="userimg">
          <img :src="'http://127.0.0.1:8080/api/img/user-portrait/' + user.user_pic" alt="" v-if="user.user_pic" @click="gouserinfo" />
          <img src="http://127.0.0.1:8080/api/img/inituser-portrait/userimg.jpg" alt="" @click="$router.push('/login')" v-else />
        </div>
      </li>
      <li class="search">
        <a href="javascript:;" @click.stop="searchshow = !searchshow"></a>
        <transition name="searchShowTransition">
          <div class="search-input" @click.stop="true" v-show="searchshow">
            <input type="text" placeholder="请输入搜索内容" v-model.trim="inputval" ref="inputret" />
            <button @click.stop="goscreen(inputval)">搜索</button>
          </div>
        </transition>
      </li>
      <li><a href="#">其它</a></li>
      <li class="type" @mouseenter="isexpandShow" @mouseleave="expandshow = 0">
        <a href="javascript:;">类型</a>
        <transition name="expandTransition">
          <div class="expand" v-show="expandshow">
            <div><a href="javascript:;" @click="goscreen('动画')">动画</a></div>
            <div><a href="javascript:;" @click="goscreen('动作')">动作</a></div>
            <div><a href="javascript:;" @click="goscreen('科幻')">科幻</a></div>
            <div><a href="javascript:;" @click="goscreen('奇幻')">奇幻</a></div>
            <div><a href="javascript:;" @click="goscreen('恐怖')">恐怖</a></div>
            <div><a href="javascript:;" @click="goscreen('犯罪')">犯罪</a></div>
            <div><a href="javascript:;" @click="goscreen('纪录片')">纪录片</a></div>
            <div><a href="javascript:;" @click="goscreen('爱情')">爱情</a></div>
            <div><a href="javascript:;" @click="goscreen('喜剧')">喜剧</a></div>
            <div><a href="javascript:;" @click="goscreen('悬疑')">悬疑</a></div>
            <div><a href="javascript:;" @click="goscreen('冒险')">冒险</a></div>
          </div>
        </transition>
      </li>
      <li><a href="javascript:;" @click="goclass('电影')">电影</a></li>
      <li><a href="javascript:;" @click="goclass('剧集')">剧集</a></li>
      <li><a href="#">热门</a></li>
      <li><a href="#">最新</a></li>
    </ul>
  </div>
</template>

<script>
import { reactive, ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Vuex from 'vuex'
import { ElMessage } from 'element-plus'

export default {
  name: 'NavHeader',

  setup() {
    const router = useRouter()
    // 控制搜索框显示与隐藏
    let searchshow = ref(0)
    let expandshow = ref(0)
    const store = Vuex.useStore()
    const user = computed(() => store.state.userInfo)

    // 搜索内容
    let inputval = ref('')

    function goscreen(val) {
      if (val == '') {
        return ElMessage.error('请输入要搜索的内容')
      }
      router.push('/screen?val=' + val)
    }

    function gouserinfo() {
      router.push('/userinfo?uid=' + user.value.Id)
    }

    function goclass(val) {
      router.push('/class?val=' + val)
    }

    // 下拉菜单
    function isexpandShow() {
      expandshow.value = 1
      searchshow.value = 0
    }

    onMounted(() => {
      // 当用户点击搜索框之外的内容时，搜索框隐藏
      window.addEventListener('click', () => {
        searchshow.value = 0
      })
    })

    return {
      searchshow,
      expandshow,
      user,
      inputval,
      goscreen,
      gouserinfo,
      goclass,
      isexpandShow
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-weight: 600;
}

li {
  list-style: none;
}

@font-face {
  font-family: 'icomoon';
  src: url('../fonts/icomoon.eot?ym7pw');
  src: url('../fonts/icomoon.eot?ym7pw#iefix') format('embedded-opentype'), url('../fonts/icomoon.ttf?ym7pw') format('truetype'), url('fonts/icomoon.woff?ym7pw') format('woff'), url('../fonts/icomoon.svg?ym7pw#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

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

.yemei {
  position: relative;
  z-index: 999;
  background-size: 100% 100%;
  background-color: #323232;
  /* background-color: #494949; */
  box-shadow: 0px 5px 20px #000000;
  height: 70px;
}

.yemei ul {
  margin-right: 50px;
}

.yemei ul li {
  text-align: center;
  float: right;
  height: 70px;
  width: 80px;
}

.yemei ul > li > a {
  display: block;
  font-family: 'icomoon';
  font-size: 24px;
  line-height: 70px;
  color: #a8a8a8;
}

.yemei ul li:nth-child(1) a {
  line-height: 72px;
  font-size: 22px;
}

.yemei ul > li > a:hover {
  color: #4d4d4d;
  cursor: pointer;
}

a {
  text-decoration: none;
}

.yemei .type {
  position: relative;
  text-align: left;
  width: 80px;
  margin-left: 20px;
  /* background-color: cornflowerblue; */
}

.type::after {
  content: '';
  position: absolute;
  top: 28px;
  left: 55px;
  width: 10px;
  height: 10px;
  border-left: 3px solid #a8a8a8;
  border-bottom: 3px solid #a8a8a8;
  transform: rotate(-45deg);
}

.type::after:hover {
  border-left: 3px solid #4d4d4d;
  border-bottom: 3px solid #4d4d4d;
}

.yemei .search {
  position: relative;
}

.yemei .search-input {
  position: absolute;
  top: 70px;
  right: 25px;
  width: 300px;
  height: 100px;
  background-color: #323232;
  border: 2px solid rgb(0, 0, 0);
  box-shadow: 0px 4px 8px #000000;
}

.yemei .search-input input {
  width: 100%;
  height: 30px;
  border: 0;
  margin-top: 15px;
  font-size: 16px;
  outline: none;
  text-indent: 10px;
}

.yemei .search-input button {
  width: 100%;
  height: 30px;
  border: 0;
  background-color: #4d4d4d;
  margin-top: 10px;
  color: #a8a8a8;
  font-size: 18px;
}

.yemei .search-input button:hover {
  cursor: pointer;
}

.yemei .user {
  width: 170px;
  display: flex;
}

.username {
  max-width: 100px;
  height: 70px;
  line-height: 70px;
  margin-right: 10px;
  cursor: pointer;
  text-align: right;
}

.username p {
  color: #a8a8a8;
  font-weight: 400 !important;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 70px;
}

.userimg {
  width: 50px;
  height: 50px;
  background-color: #fff;
  margin-top: 8px;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid rgb(0, 130, 182);
}

.userimg img {
  width: 101%;
  height: 101%;
}

.logo {
  float: left;
  width: 200px;
  height: 70px;
  /* background-color: aliceblue; */
  margin-left: 20px;
  cursor: pointer;
}

.yemei .expand {
  width: 100px;
  margin-left: -20px;
  position: absolute;
  /* display: none; */
  z-index: -1;
}

.yemei .expand div {
  /* display: none; */
  width: 100px;
  height: 40px;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
}

.yemei .expand div a {
  font-size: 20px;
  color: #000000;
  line-height: 40px;
}

.yemei .expand div:hover {
  background-color: cornflowerblue;
}

.yemei .expand li a {
  font-size: 16px !important;
  line-height: 40px !important;
  color: black !important;
}

/* 搜索框的过渡动画 */
.searchShowTransition-enter-from {
  opacity: 0;
}

.searchShowTransition-enter-active {
  transition: opacity 0.5s;
}

.searchShowTransition-enter-to {
  opacity: 1;
}

.searchShowTransition-leave-from {
  opacity: 1;
}

.searchShowTransition-leave-active {
  transition: opacity 0.5s;
}

.searchShowTransition-leave-to {
  opacity: 0;
}

/* 类型下拉菜单的过渡动画 */
.expandTransition-enter-from {
  height: 0px;
  overflow: hidden;
}

.expandTransition-enter-active {
  transition: all 0.3s linear;
  overflow: hidden;
}

.expandTransition-enter-to {
  height: 440px;
  overflow: hidden;
}

.expandTransition-leave-from {
  height: 440px;
}

.expandTransition-leave-active {
  transition: all 0.3s linear;
  overflow: hidden;
}

.expandTransition-leave-to {
  height: 0;
}
</style>
