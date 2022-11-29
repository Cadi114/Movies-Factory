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
        <a class="icon-a" href="javascript:;" @click.stop="searchshow = !searchshow">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuotianchong"></use>
          </svg>
        </a>
        <transition name="searchShowTransition">
          <SearchBox @mousedown.stop="true" v-show="searchshow" @setSearchShow="setSearchShow"></SearchBox>
        </transition>
      </li>
      <li><a href="#">其它</a></li>
      <li class="type" @mouseenter="expandshow=1" @mouseleave="expandshow = 0">
        <a href="javascript:;">类型</a>
        <transition name="expandTransition">
          <div class="expand" v-show="expandshow">
            <div @click="goscreen('动画')"><a href="javascript:;">动画</a></div>
            <div @click="goscreen('动作')"><a href="javascript:;">动作</a></div>
            <div @click="goscreen('科幻')"><a href="javascript:;">科幻</a></div>
            <div @click="goscreen('奇幻')"><a href="javascript:;">奇幻</a></div>
            <div @click="goscreen('恐怖')"><a href="javascript:;">恐怖</a></div>
            <div @click="goscreen('犯罪')"><a href="javascript:;">犯罪</a></div>
            <div @click="goscreen('纪录片')"><a href="javascript:;">纪录片</a></div>
            <div @click="goscreen('爱情')"><a href="javascript:;">爱情</a></div>
            <div @click="goscreen('喜剧')"><a href="javascript:;">喜剧</a></div>
            <div @click="goscreen('悬疑')"><a href="javascript:;">悬疑</a></div>
            <div @click="goscreen('冒险')"><a href="javascript:;">冒险</a></div>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import Vuex from 'vuex'
import SearchBox from '../searchbox/SearchBox.vue'

export default {
  name: 'NavHeader',

  components: { SearchBox },

  setup() {
    const router = useRouter()
    // 控制搜索框显示与隐藏
    let searchshow = ref(0)
    let expandshow = ref(0)

    const store = Vuex.useStore()
    const user = computed(() => store.state.userInfo)

    function gouserinfo() {
      router.push('/userinfo/' + user.value.Id)
    }

    function goclass(val) {
      router.push('/class?val=' + val)
    }

    function goscreen(val) {
      router.push('/screen?val=' + val)
    }

    // 当搜索框组件开始搜索跳转时隐藏搜索框
    function setSearchShow() {
      searchshow.value = 0
    }

    onMounted(() => {
      // 当用户点击搜索框之外的内容时，搜索框隐藏
      window.addEventListener('mousedown', () => {
        searchshow.value = 0
      })
    })

    return {
      searchshow,
      expandshow,
      user,
      gouserinfo,
      goclass,
      goscreen,
      setSearchShow
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
  background-color: #323232;
  /* background-color: #494949; */
  box-shadow: 0px 5px 20px #000000;
  height: 70px;
}

.yemei > ul {
  margin-right: 50px;
}

.yemei > ul > li {
  text-align: center;
  float: right;
  height: 70px;
  width: 80px;
}

.yemei > ul > li > a {
  display: block;
  font-family: 'icomoon';
  font-size: 24px;
  line-height: 70px;
  color: #a8a8a8;
}

.yemei > ul > li:nth-child(1) a {
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

.yemei .expand > div {
  /* display: none; */
  width: 100px;
  height: 40px;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
}

.yemei .expand > div > a {
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

.icon-a {
  position: relative;
}

.icon-a .icon {
  width: 35px;
  height: 35px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 50%);
}
</style>
