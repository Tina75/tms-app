<template>
  <div class="bmap-address-list">
    <ListItem
      v-for="item in searchResult"
      :key="item.uid"
      :item="item"
      icon="icon-ico_location"
      :right-icon="false"
      @click="$emit('select', item)"
    />
    <cube-loading v-if="loading"  class="cube-flex-center cube-mt-20" :size="25"/>
  </div>
</template>

<script>
import { loadBMap, debounce } from '@/libs/util'
import ListItem from '../components/ListItem'
export default {
  name: 'BmapAddressList',
  components: { ListItem },
  props: {
    search: {
      type: String,
      default: ''
    },
    city: {
      type: [String, Object],
      default: ''
    },
    pageSize: {
      type: [String, Number],
      default: 10
    }
  },
  data() {
    return {
      searchResult: [], // 地址列表
      loading: false
    }
  },
  computed: {
    limitCity() {
      if (typeof this.city === 'object') {
        return new window.BMap.Point(+this.city.lon, +this.city.lat)
      }
      return this.city || '中国'
    }
  },
  watch: {
    search: 'doSearch',
    city: 'changeCity'
  },
  async mounted() {
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
    initLocalSearch() {
      const onSearchComplete = LocalResult => {
        console.info('onSearchComplete', LocalResult)
        const list = []
        if (LocalResult) {
          const length = LocalResult.getCurrentNumPois()
          for (let i = 0; i < length; i++) {
            list.push(this.translateResult(LocalResult.getPoi(i)))
          }
        }
        this.loading = false
        this.searchResult = list
      }
      const localSearch = new window.BMap.LocalSearch(this.limitCity, {
        onSearchComplete
      })
      localSearch.setPageCapacity(+this.pageSize) // 设置结果数量
      this._doSearch = debounce(() => {
        this.loading = true
        const setting = {
          // 限定搜索在城市内
          forceLocal: this.limitCity !== '中国'
        }
        this.searchResult = []
        localSearch.search(this.search, setting)
      })
      this._localSearch = localSearch
    },
    doSearch() {
      if (this._doSearch) {
        this._doSearch()
      }
    },
    async changeCity(v) {
      await loadBMap()
      this._localSearch.setLocation(this.limitCity)
      this.doSearch()
    },
    translateResult(data) {
      return {
        uid: data.uid,
        name: data.title,
        detail: data.address,
        data
      }
    }
  }
}
</script>
<style lang='stylus'>
.bmap-address-list
  height 100%
  flex 1
  overflow-y auto
</style>
