<template>
  <div class="create-order-page scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <div v-if="step === 1">
        <form class="form">
          <div class="form-section">
            <form-item
              v-model="companyInfo.name" required
              label="公司全称"
              maxlength="25"/>
            <form-item
              v-model="companyInfo.shortName"
              label="公司简称"
              maxlength="6" />
          </div>
          <div class="form-section">
            <form-item
              v-model="companyInfo.contact"
              label="公司联系人"
              maxlength="10"
              required/>
            <form-item
              v-model="companyInfo.contactPhone"
              label="联系方式"
              maxlength="11"
              required/>
            <div v-if="contactList.length < 3" class="cardInfo-content edit">
              <p class="addContact"><span @click="addContact">+添加更多联系人</span></p>
            </div>
          </div>
          <div v-for="item in contactList" :key="item.index" class="form-section" >
            <form-item
              v-model="companyInfo.busiContact.name"
              label="业务联系人"
              maxlength="10"
              required/>
            <form-item
              v-model="companyInfo.busiContact.phone"
              label="联系方式"
              maxlength="11"
              required/>
            <div class="cardInfo-content edit">
              <p class="removeContact"><span @click="removeContact(item.index)">删除该联系人</span></p>
            </div>
          </div>
          <div class="form-section">
            <form-item
              v-model="companyInfo.address"
              label="公司地址"
              maxlength="50"
              required/>
            <form-item
              v-model="companyInfo.userAddress"
              label="补充地址"
              maxlength="50" />
          </div>
        </form>
      </div>
      <div v-if="step === 2">
        <form class="form">
          <div class="form-section">
            <div class="cardInfo">
              <div class="cardInfo-content edit">
                <span class="cardTitle">公司LOGO</span>
                <span class="cardContent noneInfo">点击上传
                  <icon-font
                    style="position:relative;top:-1px;"
                    name="icon-ico_right"
                    color="#CECECE"
                    :size="15"/>
                </span>
              </div>
              <div class="hr"/>
              <form-item
                v-model="companyInfo.companyProfile"
                label="公司简介"
                type="textarea"
                :rows="5"
                placeholder="请输入，不超过500个字"
                maxlength="500"/>
            </div>
          </div>
          <div class="form-section textarea">
            <form-item
              v-model="companyInfo.busiIntroduce"
              label="业务介绍"
              type="textarea"
              :rows="5"
              placeholder="请输入，不超过500个字"
              maxlength="500"/>
            <div class="hr"/>
            <div class="cardInfo-content edit">
              <span class="cardTitle">上传图片（{{busiIntroducePicList.length}}/10）</span>
              <Upload :upload-photos="busiIntroducePicList"/>
            </div>
          </div>
          <div class="form-section textarea">
            <form-item
              v-model="companyInfo.busiAdvantce"
              label="服务优势"
              type="textarea"
              :rows="5"
              placeholder="请输入，不超过500个字"
              maxlength="500"/>
            <div class="hr"/>
            <div class="cardInfo-content edit">
              <span class="cardTitle">上传图片（{{busiAdvantcePicList.length}}/10）</span>
              <Upload :upload-photos="busiAdvantcePicList"/>
            </div>
          </div>
        </form>
      </div>
      <div v-if="step === 3">
        <form class="form">
          <div class="form-section">
            <div class="cardInfo-content edit">
              <span class="cardTitle">公司风貌（{{companyPhotoList.length}}/10）</span>
              <Upload :upload-photos="companyPhotoList"/>
            </div>
          </div>
          <div class="form-section">
            <div class="cardInfo-content edit">
              <span class="cardTitle">微信二维码（{{wxQrPicList.length}}/2）</span>
              <Upload :upload-photos="wxQrPicList" :max-count="2" :maxlength="8"/>
            </div>
          </div>
          <div class="form-section">
            <div class="cardInfo-content edit">
              <span class="cardTitle">公司首页形象图</span>
              <Upload :upload-photos="homeBannerList" :max-count="1" :input-show="false"/>
            </div>
          </div>
        </form>
      </div>
    </cube-scroll>
    <div class="foot">
      <cube-button
        v-if="step < 3"
        type="submit"
        class="footer-button"
        primary
        @click="nextSetp">
        下一步 {{step}}/{{setpCount}}
      </cube-button>
      <cube-button
        v-else
        class="footer-button"
        primary
        @click="save">
        保存
      </cube-button>
    </div>
  </div>
</template>
<script>
import Upload from '@/components/Updalod'
import { FormItem } from '@/components/Form'
export default {
  name: 'company-edit',
  metaInfo: {
    title: '编辑公司'
  },
  components: { Upload, FormItem },
  data () {
    return {
      validity: {},
      valid: undefined,
      setpCount: 3,
      step: 1,
      busiIntroducePicList: [],
      busiAdvantcePicList: [],
      wxQrPicList: [],
      homeBannerList: '',
      companyPhotoList: [],
      companyInfo: {
        id: 237,
        name: 'qwee',
        cityId: 310100,
        cityName: '上海市',
        address: '上海市静安区南京西路1038号梅龙镇广场F3e',
        logoUrl: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/2a5dabb2-5fb6-4a19-83f2-65377fe439d9/128895253164.47852.png',
        contact: '张三',
        contactPhone: '18550175435',
        longitud: '121.4630120',
        latitude: '31.2350950',
        mapType: 1,
        companyProfile: '公司简介公司简介公司简介公司简介',
        shortName: 'asdad',
        userAddress: '运满满9F',
        busiContact: [],
        busiIntroduce: '业务介绍',
        busiIntroducePic:
        [
          { url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/515643095740.77606.jpg', title: '服务优势' },
          { url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/939238940611.8259.jpg', title: '服务优势' }
        ],
        busiAdvantce: '服务优势   服务优势服务优',
        busiAdvantcePic:
        [
          { url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/515643095740.77606.jpg', title: '服务优势' },
          { url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/939238940611.8259.jpg', title: '服务优势' },
          { url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/939238940611.8259.jpg', title: '服务优势' },
          { url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/939238940611.8259.jpg', title: '服务优势' },
          { url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/1204335750366.4255.png', title: '服务优势' }
        ],
        wxQrPic:
        [
          { url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/515643095740.77606.jpg', title: '微信1' },
          { url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/1204335750366.4255.png', title: '微信2' }
        ],
        homeBanner: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/515643095740.77606.jpg',
        // [
        //   { url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/515643095740.77606.jpg', title: '' }
        // ],
        companyPhoto:
        [
          { url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/515643095740.77606.jpg', title: '公司风貌' }
        ]
      },
      addContactBtn: true,
      contactList: []
    }
  },
  mounted () {
    this.initDate()
  },
  methods: {
    nextSetp () {
      this.step++
    },
    addContact () {
      this.contactList.push({ name: '', phone: '' })
      this.addContactBtn = this.contactList.length < 3
    },
    removeContact (item) {
      this.contactList.splice(item, 1)
      this.addContactBtn = true
    },
    save () {
      this.$router.push({ name: 'company' })
    },
    initDate () {
      this.busiIntroducePicList = this.initImage(this.companyInfo.busiIntroducePic)
      this.busiAdvantcePicList = this.initImage(this.companyInfo.busiAdvantcePic)
      this.wxQrPicList = this.initImage(this.companyInfo.wxQrPic)
      this.companyPhotoList = this.initImage(this.companyInfo.companyPhoto)
      this.homeBannerList = this.initImage(this.companyInfo.homeBanner)
    },
    initImage (imageList) {
      let imageListInit = []
      if (Array.isArray(imageList)) {
        imageListInit = imageList // JSON.parse(imageList)
      } else {
        imageListInit = [{ url: imageList, title: '' }]
      }
      return imageListInit
    }
  }

}
</script>
<style scoped lang="stylus">
@import "company.styl"
>>>.form-item-input-box .form-item-counter
  margin-top: -13px;
>>>.form-item-box
  overflow: -webkit-paged-x;
>>>.textarea .border-bottom-1px:after
  border none
.scroll-box
  height calc(100vh - 45px)
.form
  margin-bottom 15px
  &-section
    margin-top 15px
</style>
<style lang="stylus">
  .create-order-page .form-section .form-item-box:last-child .form-item:after
    border-style none
</style>
