<template>
  <div class="scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <form>
        <div class="form-section">
          <form-item
            v-model="form.customOrderNo"
            label="客户订单号"
            maxlength="30" />
          <form-item
            v-model="form.customWaybillNo"
            label="客户运单号"
            maxlength="30" />
          <form-item
            v-model="form.reveivelist"
            label="对接业务员"
            type="select"
            :options="operators"
            :show-arrow="false" />
        </div>
        <div class="form-section">
          <form-item
            v-model="sendTimeText"
            label="发货时间"
            type="click"
            placeholder="请选择"
            @on-click="pickTimeHandler('send')" />
          <form-item
            v-model="arriveTimeText"
            label="到货时间"
            type="click"
            placeholder="请选择"
            @on-click="pickTimeHandler('arrive')" />
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
  metaInfo: { title: '客户单号及其他' },
  components: { FormItem },
  data () {
    return {
      operators: [],
      form: {
        customOrderNo: '',
        customWaybillNo: '',
        reveivelist: '',
        sendTime: '',
        arriveTime: ''
      },
      sendTimePicker: null,
      arriveTimePicker: null,
      timePickerType: '',
      sendTimeText: '',
      arriveTimeText: ''
    }
  },
  computed: {
    ...mapGetters('order/create', [
      'consumerInfo'
    ])
  },
  methods: {
    ...mapMutations('order/create', [ 'SET_CONSUMER_INFO' ]),
    ...mapActions('order/create', [ 'getOpetator' ]),

    pickTimeHandler (type) {
      this.timePickerType = type
      if (type === 'send') {
        this.sendTimePicker = this.$createDatePicker({
          title: '发货时间',
          min: new Date(),
          max: this.form.arriveTime ? new Date(this.form.arriveTime) : new Date(2020, 12, 31),
          value: this.form.sendTime ? new Date(this.form.sendTime) : new Date(),
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
          min: this.form.sendTime ? new Date(this.form.sendTime) : new Date(),
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
      if (this.timePickerType === 'send') {
        this.form.sendTime = date.getTime()
        this.sendTimeText = dayjs(this.form.sendTime).format('YYYY-MM-DD HH:mm') + '前'
      } else {
        this.form.arriveTime = date.getTime()
        this.arriveTimeText = dayjs(this.form.arriveTime).format('YYYY-MM-DD HH:mm') + '前'
      }
    },

    ensure () {
      this.SET_CONSUMER_INFO(Object.assign({}, this.form))
      this.$router.back()
    },
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
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
</style>
