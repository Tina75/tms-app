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
            <span class="cardContent"> {{companyInfo.name}}</span>
          </div>
          <div class="hr"/>
          <div class="cardInfo-content">
            <span class="cardTitle">公司简称</span>
            <span class="cardContent">{{companyInfo.shortName}}</span>
          </div>
        </div>
        <div class="cardInfo">
          <div class="cardInfo-content">
            <span class="cardTitle">公司联系人</span>
            <span class="cardContent">{{companyInfo.contact}}</span>
          </div>
          <div class="hr"/>
          <div class="cardInfo-content">
            <span class="cardTitle">联系方式</span>
            <span class="cardContent">{{configPhone(companyInfo.contactPhone)}}</span>
          </div>
        </div>
        <!-- 业务联系人 -->
        <div v-for="(item, index) in busiContactInit" :key="index" class="cardInfo" >
          <div class="cardInfo-content">
            <span class="cardTitle">公司联系人</span>
            <span class="cardContent">{{item.name}}</span>
          </div>
          <div class="hr"/>
          <div class="cardInfo-content">
            <span class="cardTitle">联系方式</span>
            <span class="cardContent">{{configPhone(item.phone)}}</span>
          </div>
        </div>
        <div class="cardInfo">
          <div class="cardInfo-content">
            <span class="cardTitle">公司地址</span>
            <span class="cardContent address">{{companyInfo.address}}</span>
          </div>
          <div class="hr"/>
          <div class="cardInfo-content">
            <span class="cardTitle">补充地址</span>
            <span class="cardContent">{{companyInfo.userAddress}}</span>
          </div>
        </div>
        <div class="cardInfo picInfo">
          <div class="cardInfo-content">
            <span class="cardTitle">公司LOGO</span>
            <span class="cardContent">
              <div
                v-if="companyInfo.logoUrl"
                :style="'backgroundImage:url(' + companyInfo.logoUrl + ');background-repeat: no-repeat;background-position-x: center;background-position-y: center;background-size: 100%;'"
                class="avatarDiv"
                @click="previewPic([companyInfo.logoUrl], 0)"/>
              <svg
                v-else
                class="icon closeImg"
                aria-hidden="true"
                style="font-size: 35px;position:relative;top:-10px;">
                <use xlink:href="#icon-morengongsilogo"/></svg>
              <!-- <icon-font
                style="position:relative;top:-3px;"
                name="icon-morengongsilogo"
                color="#CECECE"
                :size="35"/> -->
            </span>
          </div>
          <div class="hr"/>
          <div class="cardInfo-content">
            <span class="cardTitle">公司简介</span>
            <pre v-if="companyInfo.companyProfile">{{companyInfo.companyProfile}}</pre>
            <span v-else class="cardContent noneInfo">暂未填写</span>
          </div>
        </div>
        <div class="cardInfo">
          <div class="cardInfo-content">
            <span class="cardTitle">业务介绍</span>
            <span v-if="!busiIntroducePicList.length" class="cardContent noneInfo">暂未上传</span>
            <pre v-if="companyInfo.busiIntroduce">{{companyInfo.busiIntroduce}}</pre>
            <image-list v-if="busiIntroducePicList.length" :upload-photos="busiIntroducePicList"/>
          </div>
          <div class="hr"/>
        </div>
        <div class="cardInfo">
          <div class="cardInfo-content">
            <span class="cardTitle">服务优势</span>
            <span v-if="!busiAdvantcePicList.length" class="cardContent noneInfo">暂未上传</span>
            <pre v-if="companyInfo.busiAdvantce">{{companyInfo.busiAdvantce}}</pre>
            <image-list v-if="busiAdvantcePicList.length" :upload-photos="busiAdvantcePicList"/>
          </div>
        </div>
        <div class="cardInfo">
          <div class="cardInfo-content">
            <span class="cardTitle">公司风貌</span>
            <span v-if="!companyPhotoList.length" class="cardContent noneInfo">暂未上传</span>
            <image-list v-if="companyPhotoList.length" :upload-photos="companyPhotoList"/>
          </div>
        </div>
        <div class="cardInfo">
          <div class="cardInfo-content">
            <span class="cardTitle">微信二维码</span>
            <span v-if="!wxQrPicList.length" class="cardContent noneInfo">暂未上传</span>
            <image-list v-else :upload-photos="wxQrPicList"/>
          </div>
        </div>
        <div class="cardInfo last-card">
          <div class="cardInfo-content">
            <span class="cardTitle">公司首页形象图</span>
            <span v-if="!homeBannerList.length" class="cardContent noneInfo">暂未上传</span>
            <image-list v-else :upload-photos="homeBannerList"/>
          </div>
        </div>
      </div>
    </cube-scroll>
    <div class="foot">
      <cube-button
        class="footer-button"
        primary
        @click="sharFoot = true">分享</cube-button>
    </div>
    <div v-show="sharFoot" class="share-foot">
      <div class="share-div">
        <p class="share-title">分享到</p>
        <div>
          <ul>
            <li @click="sharePath('1')">
              <icon-font
                name="icon-weixin"
                :size="44"/>
              <div class="title">微信好友</div>
            </li>
            <li @click="sharePath('2')">
              <svg class="icon closeImg" aria-hidden="true" style="font-size: 44px;">
                <use xlink:href="#icon-pengyouquan"/></svg>
              <div class="title">朋友圈</div>
            </li>
            <li @click="sharePath('4')">
              <icon-font
                name="icon-qq"
                :size="44"/>
              <div class="title">手机QQ</div>
            </li>
            <!-- <li>
              <svg class="icon closeImg" aria-hidden="true" style="font-size: 44px;">
                <use xlink:href="#icon-qqkongjian"/></svg>
              <div class="title">QQ空间</div>
            </li> -->
          </ul>
        </div>
        <cube-button
          class="footer-button"
          light
          @click="sharFoot = false">取消</cube-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import IconFont from '@/components/Iconfont'
import imageList from './image-list'
import bridge from '@/libs/dsbridge'
export default {
  name: 'company',
  metaInfo: {
    title: '我的公司'
  },
  components: { IconFont, imageList },
  data () {
    return {
      busiIntroducePicList: [],
      busiAdvantcePicList: [],
      wxQrPicList: [],
      homeBannerList: [],
      companyPhotoList: [],
      busiContactInit: [],
      sharFoot: false
    }
  },
  computed: {
    ...mapGetters(['companyInfo'])
  },
  mounted () {
    bridge.call('ui.setRightButtonAction', { text: '编辑', action: 'action', color: '#666666' },
      // text:按钮标题 action:按钮方法名 color：按钮标题颜色，不传默认白色
      function(result) {
        this.$router.push({ name: 'company-edit' })
      }
    )
    this.getCompanyData()
  },
  methods: {
    ...mapActions(['getCompanyInfo', 'shareCompanyInfo']),
    async getCompanyData () {
      await this.getCompanyInfo()
      await this.initData()
    },
    configPhone (phoneNumber) {
      if (!phoneNumber) return
      if (phoneNumber.length === 11) {
        let phone = phoneNumber.toString()
        return [phone.substr(0, 3), phone.substr(3, 4), phone.substr(7, 4)].join(' ')
      }
    },
    initData () {
      this.busiIntroducePicList = this.initImage(this.companyInfo.busiIntroducePic)
      this.busiAdvantcePicList = this.initImage(this.companyInfo.busiAdvantcePic)
      this.wxQrPicList = this.initImage(this.companyInfo.wxQrPic)
      this.homeBannerList = this.initImage(this.companyInfo.homeBanner, 'homeBanner')
      this.companyPhotoList = this.initImage(this.companyInfo.companyPhoto)
      // 业务联系人
      if (this.companyInfo.busiContact) this.busiContactInit = JSON.parse(this.companyInfo.busiContact)
    },
    initImage (imageList, homeBanner) {
      if (!homeBanner && Array.isArray(JSON.parse(imageList))) {
        return JSON.parse(imageList)
      } else {
        if (imageList) return [{ url: imageList, title: '' }]
        else return []
      }
    },
    previewPic (imgs, index = 0) {
      this.$router.push({ name: 'image-preview', params: { imgs: [this.companyInfo.logoUrl], index } })
    },
    // 分享
    sharePath (type) {
      let param = {}
      param.title = '运掌柜'
      param.desc = '运掌柜详情巴拉巴拉'
      param.url = 'https://yzg.tms5566.com'
      param.thumburl = ''
      param.platformType = type
      param.log = {}
      bridge.call('navigation.share', { param }, function(result) {
      })
    }
  }
}
</script>
<style scoped lang="stylus">
@import "company.styl"
</style>
