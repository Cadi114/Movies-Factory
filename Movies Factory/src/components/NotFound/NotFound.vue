<template>
  <video autoplay muted>
    <source src="./404.mp4" type="video/mp4" />
  </video>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'NotFound',

  setup() {
    const router = useRouter()
    setTimeout(() => {
      router.push('/home')
    }, 5000)
  }
}
</script>

<style less="scss" scoped>
video {
  width: 100%;
  /* overflow: hidden; */
}
</style>
