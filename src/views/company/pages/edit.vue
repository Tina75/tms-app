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
              maxlength="25"/>
            <form-item
              v-model="companyInfo.shortName"
              label="公司简称"
              maxlength="6" />
          </div>
          <div class="form-section">
            <form-item
              v-model="companyInfo.contact"
              prop="contact"
              label="公司联系人"
              maxlength="10"/>
            <form-item
              v-model="companyInfo.contactPhone"
              prop="contactPhone"
              label="联系方式"
              required
              @input="busPhoneInputHandler"/>
            <div v-if="addContactBtn" class="cardInfo-content edit">
              <p class="addContact"><span @click="addContact">+添加更多联系人</span></p>
            </div>
          </div>
          <!-- 业务联系 -->
          <div v-if="contact1" class="form-section">
            <form-item
              v-model="companyInfo.busiContactName1"
              prop="busiContactName1"
              label="业务联系人"
              maxlength="10"
              required/>
            <form-item
              v-model="companyInfo.busiContactPhone1"
              prop="busiContactPhone1"
              label="联系方式"
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
              maxlength="10"
              required/>
            <form-item
              v-model="companyInfo.busiContactPhone2"
              prop="busiContactPhone2"
              label="联系方式"
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
              maxlength="10"
              required/>
            <form-item
              v-model="companyInfo.busiContactPhone3"
              prop="busiContactPhone3"
              label="联系方式"
              required
              @input="contactPhoneInputHandler3"/>
            <div class="cardInfo-content edit">
              <p class="removeContact"><span @click="removeContact('contact3', 3)">删除该联系人</span></p>
            </div>
          </div>
          <!-- 业务联系 -->
          <div class="form-section">
            <form-item
              v-model="companyInfo.address"
              prop="address"
              label="公司地址"
              maxlength="50"
              required/>
            <form-item
              v-model="companyInfo.userAddress"
              label="补充地址"
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
                    :style="'backgroundImage:url(' + companyInfo.logoUrl + ');background-repeat: no-repeat;background-position-x: center;background-position-y: center;background-size: 100%;'"
                    class="avatarDiv"
                    @click="previewPic([companyInfo.logoUrl],index)"/>
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
          <div class="form-section">
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
import { mapActions } from 'vuex'
import Upload from '@/components/Upload'
import { FormGroup, FormItem } from '@/components/Form'
import { uploadOSS } from '@/components/Upload/ossUtil'
import bridge from '@/libs/dsbridge'
import { validatePhone, CHECK_NAME } from './validator'
export default {
  name: 'company-edit',
  metaInfo: {
    title: '编辑公司'
  },
  components: { Upload, FormItem, FormGroup },
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
        busiContact: [
          { name: '2222', phone: '12556543255' },
          { name: '1112', phone: '11556535855' }
        ],
        busiContactName1: '',
        busiContactName2: '',
        busiContactName3: '',
        busiContactPhone1: '',
        busiContactPhone2: '',
        busiContactPhone3: '',
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
        companyPhoto:
        [
          { url: 'https://tms5566dev.oss-cn-hangzhou.aliyuncs.com/dolphinfile/order/483f7add-d29b-4602-97b4-9caf157649da/515643095740.77606.jpg', title: '公司风貌' }
        ]
      },
      addContactBtn: true,
      contactList: [],
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
  mounted () {
    this.initDate()
  },
  methods: {
    ...mapActions(['saveCompanyInfo']),
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
    initDate () {
      // 图片相关
      this.busiIntroducePicList = this.initImage(this.companyInfo.busiIntroducePic)
      this.busiAdvantcePicList = this.initImage(this.companyInfo.busiAdvantcePic)
      this.wxQrPicList = this.initImage(this.companyInfo.wxQrPic)
      this.companyPhotoList = this.initImage(this.companyInfo.companyPhoto)
      this.homeBannerList = this.initImage(this.companyInfo.homeBanner)
      // 业务联系人
      if (this.companyInfo.busiContact) {
        for (let index = 0; index < this.companyInfo.busiContact.length; index++) { // JSON.parse
          this.companyInfo['busiContactName' + (index + 1)] = this.companyInfo.busiContact[index].name
          this.companyInfo['busiContactPhone' + (index + 1)] = this.companyInfo.busiContact[index].phone
          this['contact' + (index + 1)] = true
        }
      }
      // 手机号码格式化
      this.busPhoneInputHandler(this.companyInfo.contactPhone)
      if (this.contact1) this.contactPhoneInputHandler1(this.companyInfo.busiContactPhone1)
      if (this.contact2) this.contactPhoneInputHandler2(this.companyInfo.busiContactPhone2)
      if (this.contact3) this.contactPhoneInputHandler3(this.companyInfo.busiContactPhone3)
    },
    initImage (imageList) {
      let imageListInit = []
      if (Array.isArray(imageList)) {
        imageListInit = imageList // JSON.parse(imageList)
      } else {
        imageListInit = [{ url: imageList, title: '' }]
      }
      return imageListInit
    },
    async nextSetp () {
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
      if (this.contact1 && this.contact2 && this.contact3) {
        this.addContactBtn = false
      }
    },
    removeContact (contact, index) {
      this[contact] = false
      this.companyInfo['busiContactName' + index] = ''
      this.companyInfo['busiContactPhone' + index] = ''
      this.addContactBtn = true
    },
    save () {
      this.companyInfo.busiContact = []
      if (this.homeBannerList.length) this.companyInfo.homeBanner = this.homeBannerList[0].url
      else this.companyInfo.homeBanner = ''
      for (let index = 1; index <= 3; index++) {
        if (this.companyInfo['busiContactName' + index]) {
          this.companyInfo.busiContact.push({ name: this.companyInfo['busiContactName' + index], phone: this.companyInfo['busiContactPhone' + index] })
        }
        delete this.companyInfo['busiContactName' + index]
        delete this.companyInfo['busiContactPhone' + index]
      }
      this.saveCompanyInfo(this.companyInfo).then(({ data }) => {
        this.$Message.success('保存成功!')
        // 跳转页面show.vue
        this.$router.push({ name: 'company' })
      })
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
    async uploadOSS (baseData) {
      window.loadingStart()
      const img = await uploadOSS(baseData)
      if (img) {
        this.uploadPhotos.push(img)
      } else {
        window.toast('图片上传失败')
      }
      window.loadingEnd()
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
