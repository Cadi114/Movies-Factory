<template>
  <div class="FilmCollection">
    <div class="FilmCollection-list" v-if="(videoList.length>0)">
      <div class="video-box" v-for="item in videoList" :key="item.vid" @click="govideo(item.vid)">
        <a class="mask"></a>
        <img :src="'http://127.0.0.1:8080/api/img/image/' + item.vimg" alt="" />
        <p>{{ item.vname }}</p>
      </div>
    </div>
    <div class="page-box" v-if="(videoList.length>0)">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pagesize" :small="false" :disabled="false" background layout="prev, pager, next, jumper" :total="filmcollectionList.length" @current-change="handleCurrentChange" />
    </div>
    <div class="novideolis" v-else>
      <p>暂无收藏</p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
export default {
  props: ['filmcollectionList'],
  setup(props) {
    const router = useRouter()
    let currentPage = ref(1)
    let pagesize = ref(8)
    let videoList = ref(props.filmcollectionList.slice(0, 8))

    const govideo = vid => {
      router.push(`/video/${vid}`)
    }

    onMounted(() => {
      videoList.value = props.filmcollectionList.slice(0, 8)
      console.log(props.filmcollectionList)
    })

    // 当前页发生改变时
    const handleCurrentChange = val => {
      if (val === 1) {
        videoList.value = props.filmcollectionList.slice(0, 8)
      } else {
        videoList.value = props.filmcollectionList.slice(val * 8 - 8, val * 8)
      }
    }

    return {
      currentPage,
      pagesize,
      videoList,
      govideo,
      handleCurrentChange
    }
  }
}
</script>

<style scoped>
.FilmCollection {
  width: 880px;
  background-color: #323232;
  padding: 15px;
}

.FilmCollection-list {
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.FilmCollection-list div {
  float: left;
}
.video-box {
  position: relative;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 15px;
}
.video-box img {
  width: 200px;
  height: 280px;
}

.mask {
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 200px;
  height: 280px;
  background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0), rgba(0, 0, 0, 0.7));
}

.video-box p {
  position: absolute;
  left: 20px;
  bottom: 40px;
  font-weight: 600;
}
.page-box {
  width: fit-content;
  width: -moz-fit-content;
  width: -webket-fit-content;
  margin: auto;
}

.novideolis p {
  text-align: center;
  line-height: 300px;
  color: #686868;
  font-size: 36px;
}
</style>