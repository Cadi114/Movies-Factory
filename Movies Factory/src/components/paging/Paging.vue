<template>
  <el-pagination v-model:currentPage="currentPage" hide-on-single-page background layout="prev, pager, next" :total="page" />
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Paging',
  props: ['page', 'url'],
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    let page = props.page
    let p = computed(() => route.query.p)
    let currentPage = ref(Number(p.value > 1 ? p.value : 1))
    console.log(props.url)

    watch(
      // 监听当前页码有没有改变
      () => currentPage.value,
      () => {
        if (currentPage.value < 2) {
          router.push(props.url)
        } else {
          router.push(props.url + '?p=' + currentPage.value)
        }
      }
    )

    return {
      page,
      currentPage
    }
  }
}
</script>

<style>
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
