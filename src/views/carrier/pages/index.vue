<template>
  <div class="carrier_index">
    <cell-group>
      <cell-item label="顺丰速运">
        123
      </cell-item>
    </cell-group>
  </div>
</template>

<script>
// import ContentLoaderList from '@/components/content-loader-list'
// import { mapGetters, mapActions } from 'vuex'
import CellGroup from '@/components/CellGroup'
import CellItem from '@/components/CellItem'

export default {
  name: 'CarrierIndex',
  components: { CellGroup, CellItem },
  metaInfo: {
    title: '承运商'
  },
  data () {
    return {
      first: true,
      refresh: false,
      loading: false,
      finished: false
    }
  },
  computed: {
    // ...mapGetters(['News'])
  },
  methods: {
    // ...mapActions(['getNews', 'clearNews']),
    /** 下拉刷新 */
    async onRefresh () {
      try {
        // this.clearNews()
        // await this.getNews()
        this.refresh = false
      } catch (err) {
        this.refresh = false
      }
    },
    /** 上拉加载 */
    async onLoad () {
      try {
        // await this.getNews()
        // this.loading = false
      } catch (err) {
        this.refresh = false
      }
    },
    /** 右侧按钮点击 */
    onClickRight () {
      // this.$toast('button')
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // vm.first = true
      // vm.clearNews()
      // vm.getNews().then(() => {
      //   vm.first = false
      // })
    })
  }
}
</script>
<style lang="stylus">
.example-index
  .van-list
    min-height 55Px
</style>
