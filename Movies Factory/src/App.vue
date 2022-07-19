<template>
  <NavHeader></NavHeader>
  <router-view></router-view>
  <el-backtop :right="40" :bottom="100" style="background-color: #666; color: #fff; width: 45px; height: 45px" />
</template>

<script>
import NavHeader from './components/navheader/NavHeader.vue'
import Carousel from './components/carousel/Carousel.vue'
import Home from './components/home/Home.vue'
import Video from './components/video/Video.vue'
export default {
  components: {
    NavHeader,
    Carousel,
    Home,
    Video
  },
  mounted() {
    this.$router.afterEach((to, from, next) => {
      window.scrollTo(0, 0)
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  /* background-color: #4d4d4d; */
  background-color: #3d3d3d;
}

html {
  min-width: 1100px !important;
}

li {
  list-style: none;
}
</style>
