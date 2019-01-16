<template>
  <div class="add">
    <form-group ref="$form" class="form" :rules="rules">
      <div class="form_card">
        <form-item
          v-model="form.consignerName"
          :show-required-toast="false"
          readonly
          prop="consigner"
          label="所属发货方"
          placeholder="请选择所属发货方"
          click-icon="icon-ico_sender"
          @on-icon-click="selectSender"
        />
        <form-item
          v-model="form.contact"
          :show-required-toast="false"
          prop="contact"
          label="收货人"
          placeholder="请输入收货人姓名"
          :maxlength="15"
        />
        <form-item
          v-model="form.phone"
          :show-required-toast="false"
          prop="phone"
          label="联系电话"
          placeholder="请输入手机号或座机号"
          :maxlength="20"
          @input="formatTel"
        />
      </div>
      <div class="form_card">
        <form-item
          v-model="form.address"
          type="click"
          prop="address"
          :show-required-toast="false"
          label="详细地址"
          :show-arrow="false"
          @on-click="selectAddress"
        />
        <form-item
          v-model="form.consigneeCompanyName"
          label="收货人单位"
          :maxlength="50"
        />
      </div>
      <div class="form_card">
        <form-item
          v-model="form.remark"
          type="textarea"
          label="备注"
          placeholder="请输入(最多输入200字)"
          :maxlength="200"
        />
      </div>
    </form-group>
    <div class="add_submit">
      <cube-button
        :primary="true"
        @click="submit">
        确定
      </cube-button>
    </div>
  </div>
</template>
<script>
import { FormGroup, FormItem } from '@/components/Form'
import { mapActions, mapState, mapGetters } from 'vuex'
import { validatePhone, formatPhone, ConsigneeDetail, editPhone } from '../modules/model'
const moudleName = 'contacts/consignee'
export default {
  name: 'ConsigneeAdd',
  metaInfo () {
    return {
      title: this.isEdit ? '新增收货方' : '编辑收货方'
    }
  },
  components: { FormItem, FormGroup },
  data() {
    return {
      formatPhone,
      editPhone,
      form: new ConsigneeDetail(),
      showPickCity: false,
      rules: {
        consigner: { required: true },
        contact: { required: true },
        phone: {
          required: true,
          type: 'string',
          validatePhone: validatePhone,
          messages: {
            validatePhone: '请输入正确的手机号或座机号'
          }
        },
        address: { required: true }
      },
      submiting: false
    }
  },
  computed: {
    ...mapState(moudleName, ['saveConsigner', 'consigneeDetail']),
    ...mapGetters(moudleName, ['formList', 'saveAddress']),
    isEdit () {
      return !this.$route.query.consigneeId
    }
  },
  methods: {
    ...mapActions({
      saveConsignerInfo: moudleName + '/saveConsignerInfo',
      saveAddressInfo: moudleName + '/saveAddressInfo',
      modifyConsignee: moudleName + '/modifyConsignee',
      loadConsigneeDetail: moudleName + '/loadConsigneeDetail',
      clearForm: moudleName + '/clearForm',
      resetAddressPage: 'contacts/resetAddressPage'
    }),
    async onPageRefresh() {
      // 进入页面时刷新列表数据
      this.form = this.formList
      this.setSender()
      this.setAddress()
      console.log(!this.isEdit)
      if (!this.isEdit) {
        const urlId = +this.$route.query.consigneeId
        if (urlId !== +this.consigneeDetail.id) {
          await this.loadConsigneeDetail()
        }
        this.form = ConsigneeDetail.toForm(this.consigneeDetail)
        this.editTel(this.consigneeDetail.phone)
        this.setSender()
        this.setAddress()
      }
    },
    // 选择发货人信息
    selectSender () {
      this.$router.push({
        name: 'select-shipper'
      })
    },
    // 将选择的发货人信息渲染到表单上
    setSender () {
      if (this.saveConsigner.name) {
        this.form.consignerName = this.saveConsigner.name
        this.form.consignerId = this.saveConsigner.id
      }
    },
    // 将选择的地址渲染到表单上
    setAddress () {
      if (this.saveAddress && this.saveAddress.address) {
        this.form.address = this.saveAddress.cityName + this.saveAddress.address + this.saveAddress.consignerHourseNumber
      }
    },
    // 新增的时候格式化手机号码
    formatTel (value) {
      this.form.phone = this.formatPhone(value)
    },
    // 编辑的时候格式化手机号码
    editTel (value) {
      this.form.phone = this.editPhone(value)
    },
    // 提交
    async submit () {
      this.submiting = false
      // 如果是修改且收货地址没有变更 取详情的地址，变更了取新设置的地址
      const address = Object.assign({}, this.form, { address: this.consigneeDetail.address })
      const data = ConsigneeDetail.toServer(Object.assign({}, address, this.saveAddress))
      console.log('data', data)
      try {
        // 表单验证
        await this.$refs.$form.validate()
        await this.modifyConsignee(data)
      } catch (e) {
        console.log(e)
      } finally {
        this.$refreshPage('contacts-consignee', 'contacts-consignee-detail')
        // 清除表单数据
        this.clearForm()
        this.submiting = false
        this.$router.back()
      }
    },
    // 设置详细地址
    selectAddress() {
      const data = {}
      // 如果是编辑取详情的地址 新增取空
      const item = !this.isEdit ? this.consigneeDetail : data
      const config = {
        title: '详细地址',
        namespace: moudleName,
        dispatch: 'addressAction',
        data
      }
      if (item) {
        data.code = item.cityCode
        data.address = item.address
        data.additional = item.consignerHourseNumber
      } else {
        data.consigneeId = this.$route.query.consigneeId
      }

      this.resetAddressPage(config)
      this.$router.push({ name: 'contacts-address' })
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log(to)
    // 当从页面离开不进入选择地址和选择发货方时  清空选择的数据
    if (to.name !== 'select-shipper' && to.name !== 'contacts-address') {
      this.saveConsignerInfo()
      this.saveAddressInfo()
    }
    next()
  }
}
</script>
<style lang="stylus" scoped>
.add
  height 100%
  padding-top 10px
  .form_card
    margin-bottom 15px
  &_submit
    width 100%
    position fixed
    bottom 0px
    .cube-btn
      font-weight 500
      font-size 17px
      border-radius 0
      height 44px
      line-height 17px
      padding 0
>>>textarea
  outline none
</style>
