<template>
  <div class="carousel">
    <el-carousel indicator-position="outside" trigger="click" height="500px">
      <el-carousel-item v-for="item in carouselinfo" :itemData="item" :key="item.imgname">
        <a :href="'http://localhost:3000/video/' + item.id"><img :src="'./imgs/guanggao' + item.imgname + '.jpg'" alt="" /></a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'Carousel',
  setup() {
    let carouselinfo = reactive([
      {
        imgname: 1,
        id: 1
      },
      {
        imgname: 2,
        id: 4
      },
      {
        imgname: 3,
        id: 9
      },
      {
        imgname: 4,
        id: 11
      }
    ])

    return {
      carouselinfo
    }
  }
}
</script>

<style>
.carousel {
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
}

img {
  width: 100%;
}
.el-carousel__item {
  cursor: pointer;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
