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
              <div class="avatarDiv"/>
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
export default {
  name: 'company',
  metaInfo: {
    title: '我的公司'
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
    ...mapGetters(['companyInfo'])
  },
  created () {
    this.getCompanyData()
  },
  methods: {
    ...mapActions(['getCompanyInfo']),
    async getCompanyData () {
      await this.getCompanyInfo()
      await this.initData()
    },
    initData () {
      debugger
    }
  }
}
</script>
<style lang="stylus">
.scroll-box
  height calc(100vh - 45px)
.example-index
  .van-list
    min-height 55Px
.head-div
  width: 100%;
  height: 30px;
  // background: #EFEFEF
.head-p
  line-height: 18px;
  color: #999999;
  padding-left: 15px;
  line-height: 30px;
.hr
  background: #f2f4f6
  width: calc(100% - 15px)
  height: 1px
  margin-left: 15px
  clear: both;
.cardInfo.picInfo
  margin-bottom 30px
.cardInfo
  width: 100%;
  background: #ffff;
  font-size 15px
  color #333333
  margin-bottom 15px
  .cardInfo-content
    width: 100%;
    padding: 18px 15px 17px 15px;
    .cardContent
      float: right
      width: 195px;
      text-align: right;
      line-height: 18px;
    .cardContent.address
      text-align left
      margin-bottom: 15px;
.footer-button
  position: absolute
  bottom: 0px
  height: 45px
.noneInfo
 color: #C5C8CE
.avatarDiv
  width 30px
  height 30px
  border-radius 30px
  background-image url('../assets/logo.png')
  background-repeat: no-repeat;
  background-position: center;
  float right
  position: relative
  top: -7px
</style>
