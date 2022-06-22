<template>
  <!-- 导航栏 -->
  <div class="yemei clearfix">
    <div class="logo" @click="$router.push('/')">
      <img src="./imgs/logo-0.png" alt="" class="logo-img">
    </div>
    <ul>
      <li class="user">
        <div class="username">
          <p v-if="user.username" @click="gouserinfo">{{user.username}}</p>
          <p v-else @click="$router.push('/login')">请登录</p>
        </div>
        <div class="userimg">
          <img :src="'../../../public/user-portrait/'+user.user_pic" alt="" v-if="user.user_pic" @click="gouserinfo">
          <img src="../../../public/user-portrait/userimg.jpg" alt="" @click="$router.push('/login')" v-else>
        </div>
      </li>
      <li class="search" @mouseleave="searchshow=0">
        <a href="javascript:;" @click="searchshow = !searchshow"></a>
        <div class="search-input" v-if="searchshow">
          <input type="text" placeholder="请输入搜索内容" v-model.trim="inputval" ref="inputret">
          <button @click="goscreen(inputval)">搜索</button>
        </div>
      </li>
      <li><a href="#">其它</a>
      </li>
      <li class="type" @mouseenter="expandshow=1" @mouseleave="expandshow=0">
        <a href="javascript:;">类型</a>
        <ul class="expand" v-if="expandshow">
          <li><a href="javascript:;" @click="goscreen('动画')">动画</a></li>
          <li><a href="javascript:;" @click="goscreen('动作')">动作</a></li>
          <li><a href="javascript:;" @click="goscreen('科幻')">科幻</a></li>
          <li><a href="javascript:;" @click="goscreen('奇幻')">奇幻</a></li>
          <li><a href="javascript:;" @click="goscreen('恐怖')">恐怖</a></li>
          <li><a href="javascript:;" @click="goscreen('犯罪')">犯罪</a></li>
          <li><a href="javascript:;" @click="goscreen('纪录片')">纪录片</a></li>
          <li><a href="javascript:;" @click="goscreen('爱情')">爱情</a></li>
          <li><a href="javascript:;" @click="goscreen('喜剧')">喜剧</a></li>
          <li><a href="javascript:;" @click="goscreen('悬疑')">悬疑</a></li>
          <li><a href="javascript:;" @click="goscreen('冒险')">冒险</a></li>
        </ul>
      </li>
      <li><a href="javascript:;" @click="goclass('电影')">电影</a></li>
      <li><a href="javascript:;" @click="goclass('剧集')">剧集</a></li>
      <li><a href="#">热门</a></li>
      <li><a href="#">最新</a></li>
    </ul>
  </div>
</template>

<script>
import { reactive, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import Vuex from 'vuex'
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
      router.push('/screen?val=' + val)
    }

    function gouserinfo() {
      router.push('/userinfo')
    }

    function goclass(val) {
      router.push('/class?val=' + val)
    }

    return {
      searchshow,
      expandshow,
      user,
      inputval,
      goscreen,
      gouserinfo,
      goclass
    }
  }
}
</script>

<style  scoped>
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

.yemei ul li a {
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

.yemei ul li a:hover {
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
  /* display: none; */
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
  border-radius: 30px;
  cursor: pointer;
  border: 3px solid rgb(0, 130, 182);
}

.userimg img {
  width: 100%;
  height: 100%;
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
  position: absolute;
  /* display: none; */

  z-index: -1;
}

.yemei .expand li {
  /* display: none; */
  margin: 0 -20px;
  padding-left: 20px;
  width: 100px;
  height: 40px;
  background-color: #fff;
  text-align: left;
}

.yemei .expand li:hover {
  background-color: cornflowerblue;
}

.yemei .expand li a {
  font-size: 16px !important;
  line-height: 40px !important;
  color: black !important;
}
</style>