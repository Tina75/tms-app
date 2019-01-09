<template>
  <div>
    <cube-slide :data="items" class="slider"/>
    <div class="head-div">
      <p class="head-p">完善并分享公司名片，有利于提升品牌影响力哦</p>
    </div>
    <div class="body-div">
      <div class="cardInfo">
        <div class="cardInfo-content">
          <span class="cardTitle">公司全称</span>
          <cube-input v-model="value"/>
          <span class="cardContent">万马奔腾科技有限公司</span>
        </div>
        <div class="hr"/>
        <div class="cardInfo-content">
          <span class="cardTitle">公司简称</span>
          <span class="cardContent">六夺进化</span>
        </div>
      </div>
      <div class="cardInfo">
        <div class="cardInfo-content">
          <span class="cardTitle">公司联系人</span>
          <span class="cardContent">sdf士大夫</span>
        </div>
        <div class="hr"/>
        <div class="cardInfo-content">
          <span class="cardTitle">联系方式</span>
          <span class="cardContent">18550175436</span>
        </div>
      </div>
      <div class="cardInfo">
        <div class="cardInfo-content">
          <span class="cardTitle">公司地址</span>
          <span class="cardContent address">江苏省男籍贯是南京市秦淮区中山南路通服大厦13楼</span>
        </div>
        <div class="hr"/>
        <div class="cardInfo-content">
          <span class="cardTitle">补充地址</span>
          <span class="cardContent">运满满</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ContentLoaderList from '@/components/content-loader-list'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'company',
  // components: { ContentLoaderList },
  metaInfo: {
    title: 'company'
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
    ...mapGetters(['News'])
  },
  methods: {
    ...mapActions(['getNews', 'clearNews']),
    /** 下拉刷新 */
    async onRefresh () {
      try {
        this.clearNews()
        await this.getNews()
        this.refresh = false
      } catch (err) {
        this.refresh = false
      }
    },
    /** 上拉加载 */
    async onLoad () {
      try {
        await this.getNews()
        this.loading = false
      } catch (err) {
        this.refresh = false
      }
    },
    /** 右侧按钮点击 */
    onClickRight () {
      this.$toast('button')
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.first = true
      vm.clearNews()
      vm.getNews().then(() => {
        vm.first = false
      })
    })
  }
}
</script>
<style lang="stylus">
.example-index
  .van-list
    min-height 55Px
.head-div
  width: 100%;
  height: 30pt;
  // background: #EFEFEF
.head-p
  line-height: 18pt;
  color: #999999;
  padding-left: 15pt;
  line-height: 30pt;
.hr
  background: #f2f4f6
  width: calc(100% - 15pt)
  height: 1pt
  margin-left: 15pt
  clear: both;
.cardInfo
  width: 100%;
  // height: 100pt;
  background: #ffff;
  font-size 15pt
  color #333333
  margin-bottom 15pt
  .cardInfo-content
    width: 100%;
    padding: 18pt 15pt;
    .cardContent
      float: right
      width: 150pt;
      text-align: right;
    .cardContent.address
      text-align left
      margin-bottom: 15pt;
</style>
