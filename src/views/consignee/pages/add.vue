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
          v-model="formList.phone"
          required
          label="联系电话"
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
      showPickCity: false
    }
  },
  computed: {
    ...mapGetters('consignee', ['saveConsigner', 'formList'])
  },
  methods: {
    ...mapActions('consignee', ['saveConsignerInfo']),
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
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.formList.consigner = vm.saveConsigner.company
    })
  },
  beforeRouteLeave (to, from, next) {
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
