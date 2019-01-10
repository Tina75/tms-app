<template>
  <div class="add">
    <form class="form">
      <div class="form_card">
        <form-item
          v-model="formList.consigner"
          required
          label="所属发货方"
          click-icon="icon-ico_sender"
          @on-icon-click="selectSender"
        />
        <form-item
          v-model="formList.contact"
          required
          label="收货人"
          :maxlength="15"
        />
        <form-item
          :value="viewPhone"
          required
          label="联系电话"
          :maxlength="20"
          @on-blur="validatePhone"
          @input="formatPhone"
        />
      </div>
      <div class="form_card">
        <form-item
          v-model="formList.address"
          type="click"
          label="收货地址"
          :show-arrow="false"
          placeholder="请选择省/市/区"
          @on-click="showPickCity = true"
        />
        <form-item
          v-model="formList.detailAddress"
          required
          label="详细地址"
        />
        <form-item
          v-model="formList.consigneeCompanyName"
          label="收货人单位"
          :maxlength="50"
        />
      </div>
      <div class="form_card">
        <form-item
          v-model="formList.remark"
          type="textarea"
          label="备注"
          placeholder="请输入(最多输入200字)"
          :maxlength="200"
        />
      </div>
    </form>
    <div class="add_submit">
      <cube-button
        :primary="true">
        确定
      </cube-button>
    </div>
    <CityPicker
      v-model="showPickCity"
      @confirm="citySelect"/>
  </div>
</template>
<script>
import { FormItem } from '@/components/Form'
import CityPicker from '@/components/CityPicker'
import { mapGetters, mapActions } from 'vuex'
import validator from '@/libs/validate'
export default {
  name: 'ConsigneeAdd',
  metaInfo () {
    return {
      title: '新增收货方'
    }
  },
  components: { CityPicker, FormItem },
  data() {
    return {
      form: {},
      showPickCity: false,
      viewPhone: ''
    }
  },
  computed: {
    ...mapGetters('consignee', ['saveConsigner', 'formList'])
  },
  methods: {
    ...mapActions('consignee', ['saveConsignerInfo', 'clearFormList']),
    validatePhone (value) {
      value = value.replace(/\s/g, '')
      if (value && !(validator.phone(value) || validator.telphone(value))) {
        window.toast('请输入正确的手机号或座机号')
      }
    },
    selectSender () {
      this.$router.push({
        name: 'SelectSender'
      })
    },
    citySelect (picker) {
      console.log(picker)
      if (picker[0].name === picker[1].name) {
        this.formList.address = picker[1].name + picker[2].name
      } else {
        this.formList.address = picker[0].name + picker[1].name + picker[2].name
      }
    },
    formatPhone (value) {
      if (/^1/.test(value)) {
        const length = value.length
        if (length === 4) {
          value = value.slice(0, 3) + ' ' + value[3]
        }
        if (length === 9) {
          value = value.slice(0, 8) + ' ' + value[8]
        }
      }
      this.viewPhone = value.trim()
      this.formList.phone = this.viewPhone.replace(/\s/g, '')
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.saveConsigner.company) {
        vm.formList.consigner = vm.saveConsigner.company
      } else {
        vm.formList.consigner = ''
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    // this.clearFormList()
    this.saveConsignerInfo()
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
