<template>
  <Carousel v-if="!p"></Carousel>
  <div class="zt clearfix">
    <article class="zt-1" v-for="item in videoinfo" :key="item.vid">
      <div class="dy-wz" @click="govideo(item.vid)">
        <img :src="'http://127.0.0.1:8080/api/img/image/' + item.vimg" alt="" />
        <a class="mask"></a>
        <h4>{{ item.vclass }}</h4>
        <h2>{{ item.vname }}</h2>
      </div>
    </article>
    <!-- 分页组件 -->
    <div class="pagination" v-if="Page != 0">
      <paging :page="Page" :url="'/home?'"></paging>
    </div>
  </div>
  <bottom></bottom>
</template>

<script>
import Carousel from '../carousel/Carousel.vue'
import bottom from '../bottom/bottom.vue'
import paging from '../paging/Paging.vue'
import { getCurrentInstance, onMounted, ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    let { proxy } = getCurrentInstance()
    let videoinfo = ref([])
    let num = ref(0)
    let Page = ref(0)
    const router = useRouter()
    const route = useRoute()
    let p = computed(() => route.query.p)
    let currentPage = ref(1)

    onMounted(async () => {
      let newNum = 20
      if (p.value > 1) {
        newNum = p.value * 20
      }
      let oldNum = newNum - 20
      let data = await proxy.$api.getdata.getVideoInfoPage(oldNum, newNum)
      videoinfo.value = data.data.data || []
      num.value = data.data.Page.NUM
      Page.value = Math.ceil(num.value / 20) * 10
      //       // let data = await axios.get('http://127.0.0.1:8080/api/videoinfo')
      // let data = await proxy.$api.getdata.getVideoInfo()
      // videoinfo.value = data.data.data || []
      // num.value = data.data.Page.NUM
      // Page.value = Math.ceil(num.value / 20) * 10
    })

    function govideo(vid) {
      let id = vid
      router.push('/video?id=' + id)
    }

    watch(
      // 监听当前页码有没有改变
      () => p.value,
      async () => {
        if (p.value) {
          let newNum = p.value * 20
          let oldNum = newNum - 20
          let data = await proxy.$api.getdata.getVideoInfoPage(oldNum, newNum)
          videoinfo.value = data.data.data || []
        } else {
          let data = await proxy.$api.getdata.getVideoInfoPage(0, 20)
          videoinfo.value = data.data.data || []
        }
      }
    )

    return {
      videoinfo,
      currentPage,
      Page,
      p,
      govideo
    }
  },

  components: {
    Carousel,
    bottom,
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
  position: relative;
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
