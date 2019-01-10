<template>
  <div>
    <cube-scroll class="scroll-box">
      <div class="head-div">
        <p class="head-p">完善并分享公司名片，有利于提升品牌影响力哦</p>
      </div>
      <div class="body-div">
        <div class="cardInfo">
          <div class="cardInfo-content">
            <span class="cardTitle">公司全称</span>
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
        <div class="cardInfo picInfo">
          <div class="cardInfo-content">
            <span class="cardTitle">公司LOGO</span>
            <span class="cardContent">
              <icon-font
                name="icon-morengongsilogo"
                color="#CECECE"
                :size="50"/>
            <!-- <div class="avatarDiv"/> -->
            </span>
          </div>
          <div class="hr"/>
          <div class="cardInfo-content">
            <span class="cardTitle">公司简介</span>
            <span class="cardContent noneInfo">暂未上传</span>
          </div>
          <div class="hr"/>
          <div class="cardInfo-content">
            <span class="cardTitle">业务介绍</span>
            <span class="cardContent noneInfo">暂未上传</span>
          </div>
          <div class="hr"/>
          <div class="cardInfo-content">
            <span class="cardTitle">服务优势</span>
            <span class="cardContent noneInfo">暂未上传</span>
          </div>
          <div class="hr"/>
          <div class="cardInfo-content">
            <span class="cardTitle">公司风貌</span>
            <span class="cardContent noneInfo">暂未上传</span>
          </div>
          <div class="hr"/>
          <div class="cardInfo-content">
            <span class="cardTitle">微信二维码</span>
            <span class="cardContent noneInfo">暂未上传</span>
          </div>
          <div class="hr"/>
          <div class="cardInfo-content">
            <span class="cardTitle">公司首页形象图</span>
            <span class="cardContent noneInfo">暂未上传</span>
          </div>
        </div>
      </div>
    </cube-scroll>
    <div class="foot">
      <cube-button
        class="footer-button"
        primary>分享</cube-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import IconFont from '@/components/Iconfont'
export default {
  name: 'company',
  metaInfo: {
    title: '我的公司'
  },
  components: { IconFont },
  data () {
    return {
      first: true,
      refresh: false,
      loading: false,
      finished: false
    }
  },
  computed: {
    ...mapGetters(['companyInfo'])
  },
  created () {
    // this.getCompanyData()
  },
  methods: {
    ...mapActions(['getCompanyInfo']),
    async getCompanyData () {
      await this.getCompanyInfo()
      await this.initData()
    },
    initData () {
    }
  }
}
</script>
<style scoped lang="stylus">
@import "company.styl"
</style>
