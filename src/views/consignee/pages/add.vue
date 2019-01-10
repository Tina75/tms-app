<template>
  <div class="add">
    <form class="form">
      <div class="form_card">
        <form-item
          v-model="form.consigner"
          required
          label="所属发货方"
          click-icon="icon-ico_sender"
          @on-icon-click="selectSender"
        />
        <form-item
          v-model="form.contact"
          required
          label="收货人"
          :maxlength="15"
        />
        <form-item
          v-model="form.phone"
          required
          label="联系电话"
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
          required
          label="详细地址"
        />
        <form-item
          v-model="form.consigneeCompanyName"
          label="收货人单位"
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
      form: {
        consigner: '',
        contact: '',
        phone: '',
        address: '',
        detailAddress: '',
        consigneeCompanyName: '',
        remark: ''
      },
      showPickCity: false
    }
  },
  methods: {
    selectSender () {
      this.$router.push({
        name: 'SelectSender'
      })
    },
    citySelect (picker) {
      console.log(picker)
      if (picker[0].name === picker[1].name) {
        this.form.address = picker[1].name + picker[2].name
      } else {
        this.form.address = picker[0].name + picker[1].name + picker[2].name
      }
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
