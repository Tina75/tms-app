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
          label="收货地址"
          placeholder="请选额省/市/区"
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
          label="备注"
        />
      </div>
    </form>
    <div class="add_submit">
      <cube-button
        :primary="true">
        确定
      </cube-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ConsigneeAdd',
  metaInfo () {
    return {
      title: '新增收货方'
    }
  },
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
      }
    }
  },
  methods: {
    selectSender () {
      this.$router.push({
        name: 'SelectSender'
      })
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
</style>
