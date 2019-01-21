<template>
  <div class="create-order-page scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <form-group ref="$form" class="form" :rules="rules">
        <div v-if="step === 1" key="1">
          <div class="form-section">
            <form-item
              v-model="companyInfo.name"
              prop="name"
              label="公司全称"
              clearable
              maxlength="25"/>
            <form-item
              v-model="companyInfo.shortName"
              label="公司简称"
              clearable
              maxlength="6" />
          </div>
          <div class="form-section">
            <form-item
              v-model="companyInfo.contact"
              prop="contact"
              label="公司联系人"
              clearable
              maxlength="10"/>
            <form-item
              v-model="companyInfo.contactPhone"
              prop="contactPhone"
              label="联系方式"
              required
              clearable
              @input="busPhoneInputHandler"/>
            <div v-if="!(contact1 && contact2 && contact3)" class="cardInfo-content edit">
              <p class="addContact"><span @click="addContact">+添加更多联系人</span></p>
            </div>
          </div>
          <!-- 业务联系 -->
          <div v-if="contact1" class="form-section">
            <form-item
              v-model="companyInfo.busiContactName1"
              prop="busiContactName1"
              label="业务联系人"
              clearable
              maxlength="10"
              required/>
            <form-item
              v-model="companyInfo.busiContactPhone1"
              prop="busiContactPhone1"
              label="联系方式"
              clearable
              required
              @input="contactPhoneInputHandler1"/>
            <div class="cardInfo-content edit">
              <p class="removeContact"><span @click="removeContact('contact1', 1)">删除该联系人</span></p>
            </div>
          </div>
          <div v-if="contact2" class="form-section">
            <form-item
              v-model="companyInfo.busiContactName2"
              prop="busiContactName2"
              label="业务联系人"
              clearable
              maxlength="10"
              required/>
            <form-item
              v-model="companyInfo.busiContactPhone2"
              prop="busiContactPhone2"
              label="联系方式"
              clearable
              required
              @input="contactPhoneInputHandler2"/>
            <div class="cardInfo-content edit">
              <p class="removeContact"><span @click="removeContact('contact2', 2)">删除该联系人</span></p>
            </div>
          </div>
          <div v-if="contact3" class="form-section">
            <form-item
              v-model="companyInfo.busiContactName3"
              prop="busiContactName3"
              label="业务联系人"
              clearable
              maxlength="10"
              required/>
            <form-item
              v-model="companyInfo.busiContactPhone3"
              prop="busiContactPhone3"
              label="联系方式"
              clearable
              required
              @input="contactPhoneInputHandler3"/>
            <div class="cardInfo-content edit">
              <p class="removeContact"><span @click="removeContact('contact3', 3)">删除该联系人</span></p>
            </div>
          </div>
          <!-- 业务联系 -->
          <div class="form-section" style="margin-bottom: 30px">
            <form-item
              v-model="companyInfo.address"
              prop="address"
              label="公司地址"
              clearable
              maxlength="50"
              required/>
            <bmap-address-list
              v-show="showAddressList"
              :city="limitCityGeo"
              :search="companyInfo.address"
              @select="onSelectAddress" />
            <form-item
              v-model="companyInfo.userAddress"
              label="补充地址"
              clearable
              maxlength="50" />
          </div>
        </div>
        <div v-if="step === 2" key="2">
          <div class="form-section">
            <div class="cardInfo">
              <div class="cardInfo-content edit">
                <span class="cardTitle">公司LOGO</span>
                <span v-if="!companyInfo.logoUrl" class="cardContent noneInfo" @click="addImg">点击上传
                  <icon-font
                    style="position:relative;top:-1px;"
                    name="icon-ico_right"
                    color="#CECECE"
                    :size="15"/>
                </span>
                <span v-else class="cardContent" @click="addImg">
                  <div
                    v-imgFormat="companyInfo.logoUrl"
                    :style="'backgroundImage:url(' + companyInfo.logoUrl + ');background-repeat: no-repeat;background-position-x: center;background-position-y: center;background-size: 100%;'"
                    class="avatarDiv"
                    @click="previewPic([companyInfo.logoUrl], index)"/>
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
          <div class="form-section textarea last-card">
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
        </div>
        <div v-if="step === 3" key="3">
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
          <div class="form-section last-card">
            <div class="cardInfo-content edit">
              <span class="cardTitle">公司首页形象图</span>
              <Upload :upload-photos="homeBannerList" :max-count="1" :input-show="false"/>
            </div>
          </div>
        </div>
      </form-group>
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
import { mapActions, mapGetters } from 'vuex'
import Upload from '@/components/Upload'
import { FormGroup, FormItem } from '@/components/Form'
import { uploadOSS } from '@/components/Upload/ossUtil'
import bridge from '@/libs/dsbridge'
import { validatePhone, CHECK_NAME } from './validator'
// import { setAppTitleBtn } from '@/libs/bridgeUtil'
import BmapAddressList from '@/views/contacts/components/BmapAddressList'

export default {
  name: 'company-edit',
  metaInfo: {
    title: '编辑公司'
  },
  components: { Upload, FormItem, FormGroup, BmapAddressList },
  data () {
    const phoneValidate = validatePhone
    const phoneMessage = { phoneValidate: '手机号格式不正确' }
    const nameMessage = { CHECK_NAME: '姓名不能小于2个字且不能多于20个字' }

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
      contact1: false,
      contact2: false,
      contact3: false,
      companyInfo: {
        name: '',
        shortName: '',
        contact: '',
        contactPhone: '',
        address: '',
        userAddress: '',
        busiContactName1: '',
        busiContactPhone1: '',
        busiContactName2: '',
        busiContactPhone2: '',
        busiContactName3: '',
        busiContactPhone3: ''
      },
      rules: {
        name: { required: true, type: 'string' },
        contact: { required: true, type: 'string', CHECK_NAME, messages: nameMessage },
        contactPhone: { required: true, type: 'string', phoneValidate, messages: phoneMessage },
        address: { required: true, type: 'string' },
        busiContactName1: { required: true, type: 'string', CHECK_NAME, messages: nameMessage },
        busiContactName2: { required: true, type: 'string', CHECK_NAME, messages: nameMessage },
        busiContactName3: { required: true, type: 'string', CHECK_NAME, messages: nameMessage },
        busiContactPhone1: { required: true, type: 'string', phoneValidate, messages: phoneMessage },
        busiContactPhone2: { required: true, type: 'string', phoneValidate, messages: phoneMessage },
        busiContactPhone3: { required: true, type: 'string', phoneValidate, messages: phoneMessage }
      }
    }
  },
  computed: {
    ...mapGetters(['companyInfoInit']),
    showAddressList () { return !!this.companyInfo.address },
    limitCityGeo () {
      const data = ''
      const length = data.length
      if (length) {
        let deeper = data[length - 1]
        return {
          lat: deeper.lat,
          lon: deeper.lon
        }
      }
      return ''
    }
  },
  mounted () {
    this.getCompanyData()
    this.onPageRefresh()
  },
  methods: {
    ...mapActions(['getCompanyInfo', 'saveCompanyInfo']),
    // onPageRefresh() {
    //   setAppTitleBtn({
    //     position: 'left',
    //     text: 'back',
    //     iconType: 'back',
    //     action: () => {
    //       this.$router.push({ name: 'company' })
    //     }
    //   })
    // },
    async getCompanyData () {
      await this.getCompanyInfo()
      await this.initData()
    },
    // 公司联系电话格式化
    busPhoneInputHandler (phone) {
      this.phoneFormatter(phone, 'contactPhone')
    },
    // 联系人电话格式化1
    contactPhoneInputHandler1 (phone) {
      this.phoneFormatter(phone, 'busiContactPhone1')
    },
    // 联系人电话格式化2
    contactPhoneInputHandler2 (phone) {
      this.phoneFormatter(phone, 'busiContactPhone2')
    },
    // 联系人电话格式化3
    contactPhoneInputHandler3 (phone) {
      this.phoneFormatter(phone, 'busiContactPhone3')
    },
    phoneFormatter (phone, field) {
      if (!phone || phone[0] !== '1') return
      phone = phone.trim().split(' ').join('')
      let phoneArr = []
      let phoneTemp = ''
      for (let i in phone) {
        i = Number(i)
        phoneTemp += phone[i]
        if (!phoneArr.length && i === 2) {
          phoneArr.push(phoneTemp)
          phoneTemp = ''
        } else if (phoneTemp.length === 4) {
          phoneArr.push(phoneTemp)
          phoneTemp = ''
        } else if (i === (phone.length - 1)) {
          phoneArr.push(phoneTemp)
          phoneTemp = ''
        }
      }
      this.$nextTick(() => {
        this.companyInfo[field] = phoneArr.join(' ')
      })
    },
    initData () {
      this.companyInfo = Object.assign({}, this.companyInfo, this.companyInfoInit)
      // 图片相关
      this.busiIntroducePicList = this.initImage(this.companyInfo.busiIntroducePic)
      this.busiAdvantcePicList = this.initImage(this.companyInfo.busiAdvantcePic)
      this.wxQrPicList = this.initImage(this.companyInfo.wxQrPic)
      this.companyPhotoList = this.initImage(this.companyInfo.companyPhoto)
      this.homeBannerList = this.initImage(this.companyInfo.homeBanner, 'homeBanner')
      // 业务联系人
      if (this.companyInfo.busiContact) {
        let busiContactList = JSON.parse(this.companyInfo.busiContact)
        for (let index = 0; index < busiContactList.length; index++) { //
          this.companyInfo['busiContactName' + (index + 1)] = busiContactList[index].name
          this.companyInfo['busiContactPhone' + (index + 1)] = busiContactList[index].phone
          this['contact' + (index + 1)] = true
        }
      }
      // 手机号码格式化
      this.busPhoneInputHandler(this.companyInfo.contactPhone)
      if (this.contact1) this.contactPhoneInputHandler1(this.companyInfo.busiContactPhone1)
      if (this.contact2) this.contactPhoneInputHandler2(this.companyInfo.busiContactPhone2)
      if (this.contact3) this.contactPhoneInputHandler3(this.companyInfo.busiContactPhone3)
    },
    initImage (imageList, homeBanner) {
      if (!homeBanner && Array.isArray(JSON.parse(imageList))) {
        return JSON.parse(imageList)
      } else {
        if (imageList) return [{ url: imageList, title: '' }]
        else return []
      }
    },
    async nextSetp () {
      if (this.step === 2 &&
         (!this.isEntryPicTitle(this.busiAdvantcePicList) ||
         !this.isEntryPicTitle(this.busiIntroducePicList))) {
        window.toast('请完善图片标题')
        return
      }
      if (await this.$refs.$form.validate()) {
        this.step++
      }
    },
    addContact () {
      if (!this.contact1) {
        this.contact1 = true
      } else if (!this.contact2) {
        this.contact2 = true
      } else if (!this.contact3) {
        this.contact3 = true
      }
    },
    removeContact (contact, index) {
      this[contact] = false
      this.companyInfo['busiContactName' + index] = ''
      this.companyInfo['busiContactPhone' + index] = ''
    },
    save () {
      let vm = this
      // 图片校验title是否填写
      if (!this.isEntryPicTitle(this.companyPhotoList) || !this.isEntryPicTitle(this.wxQrPicList)) {
        window.toast('请完善图片标题')
        return
      }
      let params = this.saveDataInit()
      this.saveCompanyInfo(params).then(({ data }) => {
        window.toast('保存成功')
        vm.getCompanyInfo()
        // 跳转页面show.vue
        vm.$router.push({ name: 'company' })
      })
    },
    saveDataInit () {
      // banner Pic
      if (this.homeBannerList.length) this.companyInfo.homeBanner = this.homeBannerList[0].url
      else this.companyInfo.homeBanner = ''
      // 手机格式去除
      this.companyInfo.contactPhone = this.phoneTrim(this.companyInfo.contactPhone)
      // 公司联系人
      this.companyInfo.busiContact = []
      for (let index = 1; index <= 3; index++) {
        if (this.companyInfo['busiContactName' + index]) {
          this.companyInfo.busiContact.push({ name: this.companyInfo['busiContactName' + index], phone: this.phoneTrim(this.companyInfo['busiContactPhone' + index]) })
        }
        delete this.companyInfo['busiContactName' + index]
        delete this.companyInfo['busiContactPhone' + index]
      }
      this.companyInfo.busiContact = JSON.stringify(this.companyInfo.busiContact)
      // 公司照片
      this.companyInfo.busiIntroducePic = JSON.stringify(this.busiIntroducePicList)
      this.companyInfo.busiAdvantcePic = JSON.stringify(this.busiAdvantcePicList)
      this.companyInfo.wxQrPic = JSON.stringify(this.wxQrPicList)
      this.companyInfo.companyPhoto = JSON.stringify(this.companyPhotoList)
      return this.companyInfo
    },
    addImg () {
      const vm = this
      bridge.call('ui.selectPictures', { size: 1200, maxBytes: 300 * 1024, num: 1 }, function (result) {
        if (result.data.images.length > 0) {
          result.data.images.forEach((item) => {
            bridge.call('ui.getBase64Picture', { key: item }, function (result) {
              let baseData = 'data:image/jpeg;base64,' + result.data.image
              vm.uploadOSS(baseData)
            })
          })
        }
      })
    },
    onSelectAddress (item) {
      this.companyInfo.address = item.detail + item.name
      this.companyInfo.latitude = item.data.point.lat
      this.companyInfo.longitude = item.data.point.lng
    },
    async uploadOSS (baseData) {
      window.loading()
      const img = await uploadOSS(baseData)
      if (img) {
        this.companyInfo.logoUrl = img
      } else {
        window.toast('图片上传失败')
      }
      window.loading(false)
    },
    phoneTrim (phoneNumber) {
      return phoneNumber.replace(/\s/g, '')
    },
    isEntryPicTitle (picList) {
      let flag = true
      picList.forEach(element => {
        if (!element.title) {
          flag = false
          return flag
        }
      })
      return flag
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
