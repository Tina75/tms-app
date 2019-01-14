<template>
  <div class="bmap-address-list">
    1
  </div>
</template>

<script>
import { loadBMap, debounce } from '@/libs/util'
export default {
  name: 'BmapAddressList',
  props: {
    search: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchResult: [], // 地址列表
      mapCenter: {},
      mapList: [],
      selectedLocation: '' // 最终得到的地址信息
    }
  },
  async mounted () {
    try {
      window.loading(true)
      await loadBMap()
      this.initLocalSearch()
    } catch (e) {
      console.error(e)
    } finally {
      window.loading(false)
    }
  },
  methods: {
    // 地址列表搜索初始化
    initLocalSearch () {
      const onSearchComplete = LocalResult => {
        console.info('onSearchComplete', LocalResult)
        const list = []
        if (LocalResult) {
          const length = LocalResult.getCurrentNumPois()
          for (let i = 0; i < length; i++) {
            list.push(LocalResult.getPoi(i))
          }
        }
        this.searchResult = list
      }
      const setting = {
        forceLocal: true // 限定搜索在城市内, 例如 城市选南京搜 乌鲁木齐 有结果,会变成 江苏省南京市乌鲁木齐
      }
      const localSearch = new window.BMap.LocalSearch('', {
        onSearchComplete
      })
      localSearch.setPageCapacity(10) // 设置结果数量
      this._doSearch = debounce(() => {
        this.searchResult = []
        localSearch.search(this.search, setting)
      })
      this._localSearch = localSearch
    }
  }
}
</script>
<style lang='stylus'>
.bmap-address-list
  height 100%
  flex 1
</style>
