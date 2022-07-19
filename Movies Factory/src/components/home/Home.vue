<template>
  <Carousel></Carousel>
  <div class="zt clearfix">
    <article class="zt-1" v-for="item in videoinfo" :key="item.vid">
      <div class="dy-wz" @click="govideo(item.vid)">
        <img :src="'http://127.0.0.1:8080/api/img/image/' + item.vimg" alt="" />
        <a class="mask"></a>
        <h4>{{ item.vclass }}</h4>
        <h2>{{ item.vname }}</h2>
      </div>
    </article>
    <div class="pagination">
      <el-pagination v-model:currentPage="currentPage" hide-on-single-page background layout="prev, pager, next" :total="Page" />
    </div>
  </div>
  <bottom></bottom>
</template>

<script>
import Carousel from '../carousel/Carousel.vue'
import bottom from '../bottom/bottom.vue'
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    let { proxy } = getCurrentInstance()
    let videoinfo = ref([])
    let currentPage = ref(1)
    let num = ref(0)
    let Page = ref(0)
    const router = useRouter()
    onMounted(async () => {
      // let data = await axios.get('http://127.0.0.1:8080/api/videoinfo')
      let data = await proxy.$api.getdata.getVideoInfo()

      videoinfo.value = data.data.data || []
      num.value = data.data.Page.NUM
      Page.value = Math.ceil(num.value / 20) * 10
      console.log(num.value)
    })

    function govideo(vid) {
      let id = vid
      router.push('/video?id=' + id)
    }

    watch(
      // 监听当前页码有没有改变
      () => currentPage.value,
      async () => {
        let newNum = currentPage.value * 20
        let oldNum = newNum - 20
        let data = await proxy.$api.getdata.getVideoInfoPage(oldNum, newNum)
        videoinfo.value = data.data.data || []
        window.scroll({
          top: 650,
          left: 0,
          behavior: 'smooth'
        })
      }
    )

    return {
      videoinfo,
      currentPage,
      Page,
      govideo
    }
  },

  components: {
    Carousel,
    bottom
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

.el-pagination.is-background .el-pager li:not(.disabled) {
  background-color: #3d3d3d;
  color: #fff;
  font-size: 16px;
}

.el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
  background-color: rgb(130, 130, 130);
}

.el-pagination.is-background .btn-next:disabled,
.el-pagination.is-background .btn-prev:disabled {
  background-color: #3d3d3d;
}

.el-pagination.is-background .btn-next.is-first,
.el-pagination.is-background .btn-prev.is-first,
.el-pagination.is-background .el-pager {
  background-color: #3d3d3d;
  color: #fff;
  font-size: 16px;
}

.el-pagination.is-background .btn-next.is-last,
.el-pagination.is-background .btn-prev.is-last,
.el-pagination.is-background .el-pager {
  background-color: #3d3d3d;
  color: #fff;
  font-size: 16px;
}
</style>
