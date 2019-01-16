<template>
  <cube-scroll class="scroll-box">
    <div class="edit-address-box">
      <form class="border-bottom-1px">
        <form-item
          v-model="form.address"
          clearable
          align="left"
          maxlength="100"
          placeholder="请输入详细地址" />
        <form-item
          v-model="form.extra"
          clearable
          align="left"
          maxlength="50"
          placeholder="补充地址(楼号-门牌号等)" />
      </form>

      <p class="address-list-title">常用地址</p>

      <ul class="list">
        <li class="list-item">
          <div class="item-icon">
            <icon-font name="icon-ico_location" size="20" color="#ffffff" />
          </div>

          <div class="item-info border-bottom-1px">
            <p class="item-info-title">江苏省南京市秦淮区</p>
            <p class="item-info-data">
              江苏省南京市秦淮区江苏省南京市秦淮区江苏省南京市秦淮区
            </p>
          </div>
        </li>
        <li class="list-item">
          <div class="item-icon">
            <icon-font name="icon-ico_location" size="20" color="#ffffff" />
          </div>

          <div class="item-info">
            <p class="item-info-title">江苏省南京市秦淮区</p>
            <p class="item-info-data">
              江苏省南京市秦淮区江苏省南京市秦淮区江苏省南京市秦淮区
            </p>
          </div>
        </li>
      </ul>

      <cube-button @click="ensure">确定</cube-button>
    </div>
  </cube-scroll>
</template>

<script>
import { FormItem } from '@/components/Form'
import { mapGetters, mapMutations } from 'vuex'

export default {
  metaInfo: { title: '详细地址' },
  components: { FormItem },
  data () {
    return {
      form: {
        address: '',
        extra: '',
        longtitude: '',
        latitude: ''
      }
    }
  },
  computed: { ...mapGetters('order/create', [ 'currentArrdessType', 'orderInfo' ]) },
  methods: {
    ...mapMutations('order/create', [ 'SET_ADDRESS_INFO' ]),

    ensure () {
      this.SET_ADDRESS_INFO(Object.assign({}, this.form))
      this.$router.back()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.currentArrdessType === 'send') {
        vm.form.address = vm.orderInfo.consignerAddress
        vm.form.extra = vm.orderInfo.consignerHourseNumber
        vm.form.longitude = vm.orderInfo.consignerAddressLongitude
        vm.form.latitude = vm.orderInfo.consignerAddressLatitude
      } else {
        vm.form.address = vm.orderInfo.consigneeAddress
        vm.form.extra = vm.orderInfo.consigneeHourseNumber
        vm.form.longitude = vm.orderInfo.consigneeAddressLongitude
        vm.form.latitude = vm.orderInfo.consigneeAddressLatitude
      }
    })
  }
}
</script>

<style lang="stylus">
  .edit-address-box
    .form-item:after
      border-style none
</style>

<style lang="stylus" scoped>
  @import '../style/list.styl';

  .edit-address-box
    margin-top 10px
    background #ffffff

  .address-list-title
    padding 0 15px
    line-height 52px
    color #666666
</style>
