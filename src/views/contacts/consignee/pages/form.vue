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
          v-model="form.address"
          type="click"
          label="收货地址"
          :show-arrow="false"
          placeholder="请选择省/市/区"
          @on-click="showPickCity = true"
        />
        <form-item
          v-model="form.detailAddress"
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
import { mapGetters, mapActions } from 'vuex'
import { validatePhone, formatPhone, ConsigneeDetail } from '../modules/model'
const moudleName = 'contacts/consignee'
export default {
  name: 'ConsigneeAdd',
  metaInfo () {
    return {
      title: this.isEdit ? '编辑收货方' : '新增收货方'
    }
  },
  components: { CityPicker, FormItem, FormGroup },
  data() {
    return {
      formatPhone,
      form: new ConsigneeDetail(),
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
    ...mapGetters(moudleName, ['saveConsigner', 'formList', 'consigneeDetail']),
    isEdit () {
      return this.$route.params.type === 'edit'
    }
    // consigner () {
    //   const type = this.$route.params.type
    //   if (type === 'add') {
    //     return this.saveConsigner.name
    //   } else if (this.saveConsigner.name && type === 'edit') {
    //     return this.saveConsigner.name
    //   } else {
    //     return this.consigneeDetail.contact || ''
    //   }
    // }
  },
  methods: {
    ...mapActions(moudleName, ['saveConsignerInfo', 'clearFormList', 'addConsignee']),
    onPageRefresh () {
      if (this.isEdit) {
        this.form = ConsigneeDetail.parse(this.consigneeDetail)
      } else {
        this.form = new ConsigneeDetail()
      }
      console.log(this.form)
    },
    selectSender () {
      this.$router.push({
        name: 'select-shipper'
      })
    },
    citySelect (picker) {
      console.log(picker)
      if (picker[0].name === picker[1].name) {
        this.form.address = picker[1].name + picker[2].name
      } else {
        this.form.address = picker[0].name + picker[1].name + picker[2].name
      }
    },
    formatTel (value) {
      this.viewPhone = this.formatPhone()
      this.form.phone = this.viewPhone.replace(/\s/g, '')
    },
    async submit () {
      // const data = {
      //   contact: this.formList.contact,
      //   phone: this.formList.phone,
      //   address: this.formList.address + this.formList.detailAddress,
      //   consignerId: this.saveConsigner.id,
      //   consigneeCompanyName: this.formList.consigneeCompanyName
      // }
      // await this.addConsignee(data)
      // this.clearFormList()
      // this.viewPhone = ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.clearFormList()
    })
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
