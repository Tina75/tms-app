<template>
  <div class="add">
    <form-group ref="$form" class="form" :rules="rules">
      <div class="form_card">
        <form-item
          v-model="form.consigner"
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
          :value="viewPhone"
          :show-required-toast="false"
          prop="viewPhone"
          label="联系电话"
          placeholder="请输入手机号或座机号"
          :maxlength="20"
          @input="formatTel"
        />
      </div>
      <div class="form_card">
        <form-item
          v-model="form.cityName"
          type="click"
          label="收货地址"
          :show-arrow="false"
          placeholder="请选择省/市/区"
          @on-click="showPickCity = true"
        />
        <form-item
          v-model="form.address"
          prop="detailAddress"
          label="详细地址"
          :show-required-toast="false"
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
    <CityPicker
      v-model="showPickCity"
      @confirm="citySelect"/>
  </div>
</template>
<script>
import { FormGroup, FormItem } from '@/components/Form'
import CityPicker from '@/components/CityPicker'
import { mapGetters, mapActions, mapState } from 'vuex'
import { validatePhone, formatPhone, ConsigneeDetail, editPhone } from '../modules/model'
const moudleName = 'contacts/consignee'
export default {
  name: 'ConsigneeAdd',
  metaInfo () {
    return {
      title: this.isEdit ? '新增收货方' : '编辑收货方'
    }
  },
  components: { CityPicker, FormItem, FormGroup },
  data() {
    return {
      formatPhone,
      editPhone,
      form: {},
      showPickCity: false,
      viewPhone: '',
      rules: {
        consigner: { required: true },
        contact: { required: true },
        viewPhone: {
          required: true,
          type: 'string',
          validatePhone: validatePhone,
          messages: {
            validatePhone: '请输入正确的手机号或座机号'
          }
        },
        detailAddress: { required: true }
      }
    }
  },
  computed: {
    ...mapState(moudleName, ['saveConsigner']),
    ...mapGetters(moudleName, ['consigneeDetail']),
    isEdit () {
      return !this.consigneeDetail.id
    }
  },
  methods: {
    ...mapActions(moudleName, ['saveConsignerInfo', 'modifyConsignee']),
    onPageRefresh () {
      if (this.isEdit) {
        this.form = new ConsigneeDetail()
        this.viewPhone = ''
        this.setSender()
      } else {
        try {
          this.form = ConsigneeDetail.toForm(this.consigneeDetail)
          this.editTel(this.consigneeDetail.phone)
          this.setSender()
        } catch (err) {
          console.log(err)
        }
      }
    },
    selectSender () {
      this.$router.push({
        name: 'select-shipper'
      })
    },
    setSender () {
      if (this.saveConsigner.name) {
        this.form.consigner = this.saveConsigner.name
      }
    },
    citySelect (picker) {
      console.log(picker)
      if (picker[0].name === picker[1].name) {
        this.form.cityName = picker[1].name + picker[2].name
      } else {
        this.form.cityName = picker[0].name + picker[1].name + picker[2].name
      }
      this.form.cityCode = picker[2].code
    },
    formatTel (value) {
      this.viewPhone = this.formatPhone(value)
      this.form.phone = this.viewPhone.replace(/\s/g, '')
    },
    editTel (value) {
      this.viewPhone = this.editPhone(value)
      this.form.phone = this.viewPhone.replace(/\s/g, '')
    },
    async submit () {
      const data = ConsigneeDetail.toServer(Object.assign({}, { consignerId: this.saveConsigner.id }, this.form))
      console.log(data)
      await this.modifyConsignee(data)
    }
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
