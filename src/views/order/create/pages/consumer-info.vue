<template>
  <div class="scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <form>
        <div class="form-section">
          <form-item
            v-if="orderConfig.customerOrderNoOption"
            v-model="form.customerOrderNo"
            label="客户订单号"
            maxlength="30" />
          <form-item
            v-if="orderConfig.customerWaybillNoOption"
            v-model="form.customerWaybillNo"
            label="客户运单号"
            maxlength="30" />
          <form-item
            v-if="orderConfig.salesmanIdOption"
            v-model="form.salesmanId"
            label="对接业务员"
            type="select"
            :options="operators"
            :show-arrow="false"
            @change="saleChangeHandler" />
        </div>
        <div class="form-section">
          <form-item
            v-if="orderConfig.deliveryTimeOption"
            v-model="form.deliveryTimeText"
            label="发货时间"
            type="click"
            placeholder="请选择"
            @click.native="pickTimeHandler('delivery')" />
          <form-item
            v-if="orderConfig.arriveTimeOption"
            v-model="form.arriveTimeText"
            label="到货时间"
            type="click"
            placeholder="请选择"
            @click.native="pickTimeHandler('arrive')" />
        </div>
      </form>
    </cube-scroll>

    <cube-button class="footer" primary @click="ensure">确定</cube-button>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { FormItem } from '@/components/Form'

export default {
  metaInfo: { title: '客户订单号及其他' },
  components: { FormItem },
  data () {
    return {
      operators: [],
      form: {
        customerOrderNo: '',
        customerWaybillNo: '',
        salesmanId: '',
        salesmanName: '',
        deliveryTime: '',
        arriveTime: '',
        deliveryTimeText: '',
        arriveTimeText: ''
      },
      timePickerType: ''
    }
  },
  computed: {
    ...mapGetters('order/create', [ 'consumerInfo', 'orderConfig' ])
  },
  methods: {
    ...mapMutations('order/create', [ 'SET_CONSUMER_INFO' ]),
    ...mapActions('order/create', [ 'getOpetator' ]),

    pickTimeHandler (type) {
      this.timePickerType = type
      if (type === 'delivery') {
        this.$createDatePicker({
          title: '发货时间',
          min: new Date(),
          max: this.form.arriveTime ? new Date(this.form.arriveTime) : new Date(2020, 12, 31),
          value: this.form.deliveryTime ? new Date(this.form.deliveryTime) : new Date(),
          columnCount: 4,
          format: {
            year: 'YY年',
            month: 'M月',
            date: 'D日',
            hour: 'h点'
          },
          onSelect: this.selectTime
        }).show()
      } else {
        this.$createDatePicker({
          title: '到货时间',
          min: this.form.deliveryTime ? new Date(this.form.deliveryTime) : new Date(),
          value: this.form.arriveTime ? new Date(this.form.arriveTime) : new Date(),
          columnCount: 4,
          format: {
            year: 'YY年',
            month: 'MM月',
            date: 'D日',
            hour: 'h点'
          },
          onSelect: this.selectTime
        }).show()
      }
    },
    selectTime (date) {
      if (this.timePickerType === 'delivery') {
        this.form.deliveryTime = date.getTime()
        this.form.deliveryTimeText = dayjs(this.form.deliveryTime).format('YYYY-MM-DD HH:mm') + '前'
      } else {
        this.form.arriveTime = date.getTime()
        this.form.arriveTimeText = dayjs(this.form.arriveTime).format('YYYY-MM-DD HH:mm') + '前'
      }
    },
    saleChangeHandler (value, index, text) { this.form.salesmanName = text },
    ensure () {
      this.SET_CONSUMER_INFO(Object.assign({}, this.form))
      this.$formWillLeave()
      this.$router.back()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      console.log(vm.consumerInfo)
      for (let key in vm.form) {
        vm.form[key] = vm.consumerInfo[key] === undefined ? '' : vm.consumerInfo[key]
      }
      vm.operators = (await vm.getOpetator()).map(item => {
        return {
          value: item.id,
          text: item.name
        }
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
  form
    padding-top 10px
  .form-section
    margin-bottom 15px

  .footer
    position fixed
    left 0
    right 0
    bottom 0
    height 44px
    padding 0
    border-radius 0
    font-weight bold
</style>
