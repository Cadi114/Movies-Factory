<template>
  <div class="Screen-text">
    <span>搜索：{{ val }}</span>
    <span class="screen-result">搜索结果({{ videoNum }})</span>
  </div>
  <div class="zt clearfix" v-if="videoinfo.length">
    <article class="zt-1" v-for="item in videoinfo" :itemData="item" :key="item.vid">
      <div class="dy-wz" @click="govideo(item.vid)">
        <img :src="'http://127.0.0.1:8080/api/img/image/' + item.vimg" alt="" />
        <a class="mask"></a>
        <h4>{{ item.vclass }}</h4>
        <h2>{{ item.vname }}</h2>
      </div>
    </article>
    <!-- 分页组件 -->
    <div class="pagination" v-if="Page != 0">
      <paging :page="Page" :url="'/class?val=' + val"></paging>
    </div>
  </div>
  <div class="Screen-null" v-else>
    <p>什么都没有</p>
  </div>
</template>

<script>
import Carousel from '../carousel/Carousel.vue'
import paging from '../paging/Paging.vue'
import { ref, computed, watch, getCurrentInstance, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'VideoClass',
  setup() {
    let { proxy } = getCurrentInstance()
    let videoinfo = ref([])
    const router = useRouter()
    const route = useRoute()
    // 接收导航栏传过来的参数
    let val = computed(() => route.query.val)
    let p = computed(() => (route.query.p ? route.query.p : 0))
    let Page = ref(0)
    let videoNum = ref(0)

    onMounted(async () => {
      // let data = await axios.get('http://127.0.0.1:8080/api/class?val=' + val.value)
      let data = await proxy.$api.getdata.getClass(val.value, p.value)
      videoinfo.value = data.data.data || []
      videoNum.value = data.data.Page.NUM || 0
      Page.value = Math.ceil(videoNum.value / 20) * 10
    }),
      // 监听val的值是否发生变化
      watch(
        () => val.value,
        async () => {
          // 刷新网页
          location.reload()
        },
        {
          deep: true //是否采用深度监听
        }
      )

    function govideo(vid) {
      router.push('/video/' + vid)
    }

    return {
      videoinfo,
      val,
      Page,
      videoNum,
      govideo
    }
  },
  components: {
    Carousel,
    paging
  }
}
</script>

<style>
h4 {
  color: rgb(243, 156, 26);
}

h2 {
  color: aliceblue;
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

.Screen-text {
  margin: 20px 80px;
  height: 80px;
  border-bottom: 3px solid #fff;
}

.Screen-text span {
  color: #fff;
  font-size: 30px;
  line-height: 80px;
}

.Screen-text .screen-result {
  margin-left: 20px;
  font-size: 18px;
  color: #ccc;
}

.Screen-null {
  margin: 100px auto;
  text-align: center;
  color: rgb(161, 161, 161);
  font-size: 40px;
}

.zt {
  margin-left: auto;
  margin-right: auto;
  width: 1450px;
  /* background-color: #323232; */
  margin-top: 10px;
  /* box-shadow: 0px 4px 30px #000000 inset; */
  margin-bottom: 80px;
  padding-top: 40px;
  padding-bottom: 40px;
}

.zt-1 {
  width: 362.5px;
  height: 480px;
  float: left;
}

.zt-1 > div {
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  width: 280px;
  height: 380px;
  background-color: aliceblue;
  box-shadow: 0px 4px 20px #000000;
}

/* .bjtp {
    width: 280px;
    height: 380px;
    background-color: #00FFB5;
} */

.dy-wz {
  position: relative;
  overflow: hidden;
}

.dy-wz img {
  width: 280px;
  height: 380px;
  transition: all 2s;
  /* position: relative; */
}

.dy-wz img:hover {
  transform: scale(1.1);
}

.dy-wz .mask {
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0), rgba(0, 0, 0, 0.7));
}

.dy-wz h4 {
  position: absolute;
  top: 250px;
  left: 25px;
}

.dy-wz h2 {
  position: absolute;
  top: 280px;
  left: 25px;
}

.pagination {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}
</style>
