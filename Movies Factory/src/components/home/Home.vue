<template>
  <Carousel></Carousel>
  <div class="zt clearfix">
    <article class="zt-1" v-for="item in videoinfo" :key="item.vid" @click="govideo(item.vid)">
      <div class="dy-wz">
        <img :src="'http://127.0.0.1:8080/api/img/image/' + item.vimg" alt="" />
        <a class="mask"></a>
        <h4>{{ item.vclass }}</h4>
        <h2>{{ item.vname }}</h2>
      </div>
    </article>
  </div>
  <bottom></bottom>
</template>

<script>
import Carousel from '../carousel/Carousel.vue'
import bottom from '../bottom/bottom.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'Home',
  setup() {
    let videoinfo = ref([])
    const router = useRouter()
    onMounted(async () => {
      let data = await axios.get('http://127.0.0.1:8080/api/videoinfo')

      videoinfo.value = data.data.data || []
      console.log(videoinfo.value)
    })

    function govideo(vid) {
      let id = vid
      router.push('/video?id=' + id)
    }

    return {
      videoinfo,
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
</style>
