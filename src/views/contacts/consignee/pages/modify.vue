<template>
  <div class="consignee-modify">
    <form-group ref="$form" class="form" :rules="rules">
      <div class="consignee-modify_form__card">
        <form-item
          v-model="formList.consignerName"
          :show-required-toast="false"
          type="click"
          :show-arrow="false"
          prop="consigner"
          label="所属发货方"
          placeholder="请选择所属发货方"
          click-icon="icon-ico_sender"
          @on-icon-click="selectSender"
        />
        <form-item
          v-model="formList.contact"
          :show-required-toast="false"
          prop="contact"
          label="收货人"
          placeholder="请输入收货人姓名"
          :maxlength="15"
        />
        <form-item
          v-model="formList.phone"
          :show-required-toast="false"
          prop="phone"
          label="联系电话"
          placeholder="请输入手机号或座机号"
          :maxlength="maxlength"
          type="phone"
        />
      </div>
      <div class="consignee-modify_form__card">
        <form-item
          v-model="formList.address"
          type="click"
          prop="address"
          :show-required-toast="false"
          label="详细地址"
          :show-arrow="false"
          @on-click="selectAddress"
        />
        <form-item
          v-model="formList.consigneeCompanyName"
          label="收货人单位"
          :maxlength="50"
        />
      </div>
      <div class="consignee-modify_form__card">
        <form-item
          v-model="formList.remark"
          type="textarea"
          label="备注"
          placeholder="请输入(最多输入100字)"
          :maxlength="100"
        />
      </div>
    </form-group>
    <LoadingButton class="cube-bottom-button" :loading="submiting" action="保存" @click="submit"/>
  </div>
</template>
<script>
import LoadingButton from '@/components/LoadingButton'
import { FormGroup, FormItem } from '@/components/Form'
import { mapActions, mapState, mapGetters } from 'vuex'
import { validatePhone, ConsigneeDetail } from '../modules/model'
const moudleName = 'contacts/consignee'
export default {
  name: 'ConsigneeAdd',
  metaInfo () {
    return {
      title: this.isEdit ? '新增收货方' : '编辑收货方'
    }
  },
  components: { FormItem, FormGroup, LoadingButton },
  data() {
    return {
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
      submiting: false,
      confirmed: false
    }
  },
  computed: {
    ...mapState(moudleName, ['saveConsigner', 'consigneeDetail']),
    ...mapGetters(moudleName, ['formList', 'saveAddress']),
    isEdit () {
      return !this.$route.query.consigneeId
    },
    maxlength () {
      if (this.formList.phone && +this.formList.phone[0] === 1) {
        return 15
      }
      return 20
    }
  },
  methods: {
    ...mapActions({
      saveConsignerInfo: moudleName + '/saveConsignerInfo',
      saveAddressInfo: moudleName + '/saveAddressInfo',
      modifyConsignee: moudleName + '/modifyConsignee',
      loadFormInfo: moudleName + '/loadFormInfo',
      loadConsigneeDetail: moudleName + '/loadConsigneeDetail',
      clearForm: moudleName + '/clearForm',
      resetAddressPage: 'contacts/resetAddressPage'
    }),
    async initForm(to, from) {
      // 进入页面时刷新列表数据
      this.$refs.$form.reset()
      this.setSender()
      this.setAddress()
      if (!this.isEdit) {
        const urlId = +this.$route.query.consigneeId
        if (urlId !== +this.consigneeDetail.id) {
          await this.loadConsigneeDetail()
          this.$refreshPage('contacts-consignee-detail')
        }
        if (from.name !== 'select-shipper' && from.name !== 'contacts-address') {
          this.setFormList()
        }
      }
    },
    // 选择发货人信息
    selectSender () {
      this.$formWillLeave()
      this.$router.push({ name: 'select-shipper' })
    },
    // 将选择的发货人信息渲染到表单上
    setSender () {
      if (this.saveConsigner.name) {
        this.formList.consignerName = this.saveConsigner.name
        this.formList.consignerId = this.saveConsigner.id
      }
    },
    // 将选择的地址渲染到表单上
    setAddress () {
      if (this.saveAddress && this.saveAddress.address) {
        this.formList.address = this.saveAddress.cityName + this.saveAddress.address + this.saveAddress.consignerHourseNumber
      }
    },
    // 提交
    async submit () {
      // 如果是修改且收货地址没有变更 取详情的地址，变更了取新设置的地址
      const address = Object.assign({}, this.formList, { address: this.consigneeDetail.address })
      const data = this.saveAddress.address
        ? ConsigneeDetail.toServer(Object.assign({}, address, this.saveAddress))
        : ConsigneeDetail.toServer(Object.assign({}, address))
      console.log('data', data)
      // 表单验证
      const valid = await this.$refs.$form.validate()
      if (valid) {
        try {
          this.submiting = true
          await this.modifyConsignee(data)
          this.$refreshPage('contacts-consignee', 'contacts-consignee-detail')
          this.$formWillLeave()
          window.toast('保存成功')
          this.clearForm()
          this.$router.back()
        } catch (e) {
          console.log(e)
        } finally {
          this.submiting = false
        }
      } else {
        window.toast('请填写必填信息')
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
      this.$formWillLeave()
      this.$router.push({ name: 'contacts-address' })
    },
    setFormList () {
      this.loadFormInfo(this.consigneeDetail)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.initForm(to, from)
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'select-shipper' && to.name !== 'contacts-address') {
      this.saveConsignerInfo()
      this.saveAddressInfo()
      this.clearForm()
    }
    next()
  }
}
</script>
<style lang="stylus">
.consignee-modify
  height 100%
  padding-top 10px
  &_form__card
    margin-bottom 15px
</style>
