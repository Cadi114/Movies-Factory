<template>
  <div class="search-box" @click.stop="true">
    <div class="search-input">
      <input type="text" placeholder="请输入搜索内容" v-model.trim="inputval" ref="inputret" />
      <svg v-show="inputemptybtn" class="input-icon" aria-hidden="true" @click="inputValDelete">
        <use xlink:href="#icon-shanchu1"></use>
      </svg>
      <!-- <button class="search-btn" @click.stop="goscreen(inputval)">搜索</button> -->
      <div class="search-btn" @click.stop="goscreen(inputval)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
    </div>
    <!-- 搜索记录 -->
    <div class="search-SearchRecords" v-show="SearchRecordsShow">
      <div class="search-delete">
        <span>搜索记录</span>
        <div>
          <svg class="icon" aria-hidden="true" @click="SearchRecordsListDelete">
            <use xlink:href="#icon-shanchu-copy"></use>
          </svg>
        </div>
      </div>
      <div class="SearchRecordsList">
        <ul>
          <li v-for="(item,index) in SearchRecordsList" @mouseenter="SearchRecordsMove(index)" @mouseleave="SearchRecordsLeave" :key="index" class="SearchRecordsList-box" @click="SearchRecordsClick(item)">
            {{item}}
            <svg v-show="SearchRecordsaction === index" class="icon" aria-hidden="true" @click.stop="SearchRecordsListindexDelete(index)">
              <use xlink:href="#icon-shanchu1"></use>
            </svg>
          </li>
        </ul>
      </div>
    </div>
    <!-- 相关搜索列表 -->
    <div class="search-RelatedSearch" v-if="!SearchRecordsShow">
      <ul>
        <li v-for="(item,index) in KeywordList" :key="index" @click="RelatedSearchListClick(index)"><span v-for="(item2,index2) in item" :key="index2" :class="item2.checked ? 'keyword' : ''">{{item2.vname}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, watch, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default {
  setup(props, { emit }) {
    const router = useRouter()
    // const searchshow = ref(0)
    const SearchRecordsShow = ref(1)
    let { proxy } = getCurrentInstance()
    let SearchRecordsaction = ref(-1)
    const KeywordList = ref([])
    const RelatedSearchList = ref([])
    const SearchRecordsList = ref(JSON.parse(localStorage.getItem('SearchRecordsList')) || [])

    // 搜索内容
    let inputval = ref('')
    let inputemptybtn = ref(0)

    function goscreen(val) {
      if (val == '') {
        return ElMessage.error('请输入要搜索的内容')
      }
      SearchRecordsList.value.unshift(val)
      // 去重
      SearchRecordsList.value = [...new Set(SearchRecordsList.value)]
      if (SearchRecordsList.value.length > 8) {
        SearchRecordsList.value.pop()
      }
      // 持久化存储
      localStorage.setItem('SearchRecordsList', JSON.stringify(SearchRecordsList.value))
      // 隐藏搜索框
      // searchshow.value = 0
      emit('setSearchShow')
      // 跳转
      router.push('/screen?val=' + val)
    }

    // 点击搜索记录
    function SearchRecordsClick(item) {
      goscreen(item)
    }

    // 点击删除图标
    function SearchRecordsListDelete() {
      SearchRecordsList.value = []
      localStorage.removeItem('SearchRecordsList')
    }

    // 点击某个搜索记录的删除按钮
    function SearchRecordsListindexDelete(index) {
      SearchRecordsList.value.splice(index, 1)
      // 持久化存储
      localStorage.setItem('SearchRecordsList', JSON.stringify(SearchRecordsList.value))
    }

    // 鼠标进入搜索记录盒子
    function SearchRecordsMove(index) {
      SearchRecordsaction.value = index
    }

    // 鼠标移出搜索记录
    function SearchRecordsLeave() {
      SearchRecordsaction.value = -1
    }

    // 清空input框内容
    function inputValDelete() {
      inputval.value = ''
    }

    // 点击相关搜索
    function RelatedSearchListClick(index) {
      goscreen(RelatedSearchList.value[index].vname)
    }

    // 监听input框
    // 防抖
    let request = null
    watch(
      () => inputval.value,
      () => {
        if (request !== null) clearTimeout(request)
        if (inputval.value.length > 0) {
          inputemptybtn.value = 1
          SearchRecordsShow.value = 0
          request = setTimeout(() => {
            proxy.$api.getdata.getSearchRequest(inputval.value).then(res => {
              RelatedSearchList.value = res.data.data
              // 容器
              let list = []
              // 关键字截取
              RelatedSearchList.value.forEach((item, index) => {
                let f = true
                let vname = item.vname
                list[index] = []
                while (f) {
                  // 找到当前位置
                  let position = vname.indexOf(inputval.value)
                  if (position == -1) {
                    // 未匹配到关键字
                    f = false
                    list[index].push({ vname: vname.substring(0, vname.length) })
                  } else {
                    // 匹配位置+关键字的长度
                    let matchend = position + inputval.value.length
                    // 非匹配中的关键字
                    list[index].push({ vname: vname.substring(0, position) })
                    // 匹配中的关键字
                    list[index].push({ vname: vname.substring(position, matchend), checked: true })
                    // 去掉匹配到的文字重新筛选
                    vname = vname.substring(matchend, vname.length)
                    // 匹配到了末尾不再继续匹配
                    if (!vname && vname.length < 1) {
                      f = false
                    }
                  }
                }
              })

              KeywordList.value = list
            })
          }, 300)
        } else {
          inputemptybtn.value = 0
          SearchRecordsShow.value = 1
          KeywordList.value = []
        }
      }
    )

    return {
      inputval,
      SearchRecordsList,
      SearchRecordsaction,
      inputemptybtn,
      SearchRecordsShow,
      KeywordList,
      goscreen,
      SearchRecordsClick,
      SearchRecordsListDelete,
      SearchRecordsMove,
      SearchRecordsLeave,
      SearchRecordsListindexDelete,
      inputValDelete,
      RelatedSearchListClick
    }
  }
}
</script>

<style scoped>
.search-box {
  position: absolute;
  top: 70px;
  right: -50px;
  width: 300px;
  background-color: #323232;
  border: 2px solid rgb(0, 0, 0);
  box-shadow: 0px 4px 8px #000000;
  padding: 15px;
}

.input-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 70px;
  top: 20px;
  cursor: pointer;
}

.search-input {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
}

.search-input input {
  width: 100%;
  height: 30px;
  border: 0;
  font-size: 16px;
  outline: none;
  /* text-indent: 10px; */
  padding-left: 10px;
  padding-right: 30px;
  font-weight: 500;
}

.search-btn {
  position: relative;
  width: 70px;
  height: 30px;
  font-size: 18px;
  background-color: #2579ff;
  color: #fff;
  border: 0;
  cursor: pointer;
}

.search-btn .icon {
  width: 70%;
  height: 70%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.search-SearchRecords {
  margin-top: 15px;
}

.search-delete {
  display: flex;
  justify-content: space-between;
  color: #a8a8a8;
}

.search-delete .icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.SearchRecordsList {
  font-size: 14px;
  text-align: left;
}

.SearchRecordsList-box {
  position: relative;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: left;
  display: block;
  padding: 5px 17px 5px 15px;
  background-color: #a8a8a8;
  border-radius: 12px;
  margin: 8px 8px 0 0;
  cursor: pointer;
}

.SearchRecordsList-box:hover {
  background-color: #8f8f8f;
}

.SearchRecordsList-box .icon {
  position: absolute;
  width: 15px;
  height: 15px;
  right: 2px;
  top: 8px;
}

.search-RelatedSearch {
  margin-top: 15px;
}

.search-RelatedSearch ul li {
  height: 40px;
  line-height: 40px;
  color: #ffffff;
  text-align: left;
  cursor: pointer;
  padding-left: 5px;
  font-weight: 300;
}

.search-RelatedSearch ul li:hover {
  background-color: #404040;
}

.keyword {
  color: #1990f1;
}
</style>