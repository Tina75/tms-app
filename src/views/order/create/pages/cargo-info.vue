<template>
  <div class="scroll-list-wrap">
    <cube-scroll ref="$scroll" class="scroll-box">
      <div class="cargo-form-box">
        <form-group ref="$form" :rules="rules">
          <div v-for="(form, index) in formList" :key="index" class="form-section">
            <form-title
              :image="CARGO_IMAGE"
              :title="'货物' + (index + 1)">
              <span
                v-if="formList.length > 1"
                slot="extra"
                @click="cargoDelete(index)">删除</span>
            </form-title>
            <form-item
              v-model="form.cargoName"
              prop="cargoName"
              label="货物名称"
              required
              maxlength="200"
              click-icon="icon-ico_boxx"
              @on-icon-click="chooseCargoInfo(index)"
              @on-focus="inputFocus" />
            <form-item
              v-if="orderConfig.weightTonOption"
              v-model="form.weight"
              prop="weight"
              label="重量(吨)"
              type="number"
              precision="3"
              @on-focus="inputFocus" />
            <form-item
              v-if="orderConfig.weightKgOption"
              v-model="form.weightKg"
              prop="weightKg"
              label="重量(公斤)"
              type="number"
              @on-focus="inputFocus" />
            <form-item
              v-if="orderConfig.volumeOption"
              v-model="form.volume"
              prop="volume"
              label="体积(方)"
              type="number"
              precision="6"
              @on-focus="inputFocus" />
            <form-item
              v-if="orderConfig.cargoCostOption"
              v-model="form.cargoCost"
              prop="cargoCost"
              label="货值(元)"
              type="number"
              precision="4"
              @on-focus="inputFocus" />
            <form-item
              v-if="orderConfig.unitOption"
              v-model="form.unit"
              label="包装方式"
              type="click"
              @click.native="showUnitDialog(index)" />
            <form-item
              v-if="orderConfig.quantityOption"
              v-model="form.quantity"
              prop="quantity"
              type="number"
              label="包装数量"
              @on-focus="inputFocus" />
            <form-item
              v-if="orderConfig.dimensionOption"
              v-model="form.size"
              label="包装尺寸(毫米)"
              type="click"
              :show-arrow="false"
              placeholder="请输入长*宽*高"
              @click.native="showSizeDialog(index)" />
            <form-item
              v-if="orderConfig.cargoNoOption"
              v-model="form.cargoNo"
              label="货物编码"
              maxlength="200"
              @on-focus="inputFocus" />
            <form-item
              v-if="orderConfig.remark1Option"
              v-model="form.remark1"
              label="备注1"
              placeholder="请输入(最多输入100字)"
              type="textarea"
              maxlength="100"
              @on-focus="inputFocus" />
            <form-item
              v-if="orderConfig.remark2Option"
              v-model="form.remark2"
              label="备注2"
              placeholder="请输入(最多输入100字)"
              type="textarea"
              maxlength="100"
              @on-focus="inputFocus" />
            <!-- <form-item
              v-if="orderConfig.remark3Option"
              v-model="form.remark3"
              label="备注3"
              placeholder="请输入(最多输入200字)"
              type="textarea"
              maxlength="200" />
            <form-item
              v-if="orderConfig.remark4Option"
              v-model="form.remark4"
              label="备注4"
              placeholder="请输入(最多输入200字)"
              type="textarea"
              maxlength="200" /> -->
          </div>
        </form-group>
        <cube-button
          class="form-add border-top-1px"
          @click="cargoAdd">
          <span>+</span>
          添加货物
        </cube-button>
      </div>

    </cube-scroll>

    <div class="footer">
      <div class="footer-detail">
        <p class="footer-detail-line">
          <span v-if="orderConfig.weightTonOption">总重量：<span class="footer-detail-line-data">{{ total.weight }}吨</span> </span>
          <span v-if="orderConfig.weightKgOption">总重量：<span class="footer-detail-line-data">{{ total.weightKg }}公斤</span> </span>
          <span v-if="orderConfig.volumeOption">总体积：<span class="footer-detail-line-data">{{ total.volume }}方</span> </span>
        </p>
        <p class="footer-detail-line">
          <span v-if="orderConfig.quantityOption">总数量：<span class="footer-detail-line-data">{{ total.quantity }}</span> </span>
          <span v-if="orderConfig.cargoCostOption">总货值：<span class="footer-detail-line-data">{{ total.cargoCost }}元</span> </span>
        </p>
      </div>
      <cube-button
        class="footer-button"
        primary
        @click="submitCargoList">确定</cube-button>
    </div>
  </div>
</template>

<script>
import NP from 'number-precision'
import { mapGetters, mapMutations } from 'vuex'
import { FormGroup, FormItem, FormTitle } from '@/components/Form'
import dialogs from '../js/cargoDialog'
import inputAutoPosition from '../js/inputAutoPosition'
const CARGO_IMAGE = require('../assets/box.png')

export default {
  metaInfo: { title: '货物信息' },
  components: { FormGroup, FormItem, FormTitle },
  data () {
    return {
      windowOriginHeight: 0,
      windowIsResize: false,
      CARGO_IMAGE,
      formList: [],
      cargoIndex: void 0,
      unit: void 0,
      rules: {
        cargoName: { required: true, type: 'string' },
        weight: { type: 'number', min: 0 },
        weightKg: { type: 'number', min: 0 },
        volume: { type: 'number', min: 0 },
        quantity: { type: 'number', min: 1 },
        cargoCost: {
          type: 'number',
          pattern: /^((([1-9]\d{0,8})|0)(\.\d{0,3}[1-9])?)?$/,
          messages: {
            pattern: '整数位不得超过9位'
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('order/create', [ 'cargoOften', 'orderCargoList', 'orderConfig' ]),

    total () {
      return this.formList.reduce((last, item) => {
        return {
          weight: NP.plus(item.weight || 0, last.weight),
          weightKg: NP.plus(item.weightKg || 0, last.weightKg),
          volume: NP.plus(item.volume || 0, last.volume),
          quantity: NP.plus(item.quantity || 0, last.quantity),
          cargoCost: NP.plus(item.cargoCost || 0, last.cargoCost)
        }
      }, {
        weight: 0,
        weightKg: 0,
        volume: 0,
        quantity: 0,
        cargoCost: 0
      })
    }
  },
  methods: {
    ...inputAutoPosition,
    ...mapMutations('order/create', [ 'CLEAR_CARGO_OFTEN', 'SET_CARGO_LIST' ]),
    // 初始化货物信息
    initCargoList (fromName) {
      const tempCargoList = Object.assign(
        [],
        fromName === 'order-cargo-often'
          ? this.formList
          : this.orderCargoList).map(item => {
        if (item.cargoCost && fromName !== 'order-cargo-often') item.cargoCost = NP.divide(item.cargoCost, 100)
        if (item.size === undefined) {
          item.size = !item.dimension.length && !item.dimension.width && !item.dimension.height
            ? ''
            : [ item.dimension.length || '-', item.dimension.width || '-', item.dimension.height || '-' ].join('x')
        }
        return item
      })
      this.formList = tempCargoList
      if (!this.formList.length) this.cargoAdd()
      this.setChoosedCargo()
      this.$refs.$scroll.refresh()
    },
    // 提交货物信息
    async submitCargoList () {
      const valid = await this.$refs.$form.validate()
      if (!valid) return window.toast('请修改错误信息')
      const tempCargoList = Object.assign([], this.formList).map(item => {
        if (item.cargoCost) item.cargoCost = NP.times(item.cargoCost, 100)
        return item
      })
      this.SET_CARGO_LIST(tempCargoList)
      this.$formWillLeave()
      this.$router.back()
    },
    // 删除货物
    cargoDelete (index) {
      this.formList.splice(index, 1)
    },
    // 添加货物
    cargoAdd (index) {
      this.formList.push(this.getEmptyCargo())
      this.$refs.$scroll.refresh()
    },
    // 返回一个空的货物信息
    getEmptyCargo () {
      return {
        cargoName: '',
        weight: '',
        weightKg: '',
        volume: '',
        cargoCost: '',
        unit: '',
        quantity: '',
        size: '',
        dimension: {
          length: '',
          width: '',
          height: ''
        },
        cargoNo: '',
        remark1: '',
        remark2: ''
        // remark3: '',
        // remark4: ''
      }
    },
    // 选择常发货物
    chooseCargoInfo (index) {
      this.$formWillLeave()
      this.cargoIndex = index
      this.$router.push({ name: 'order-cargo-often' })
    },
    // 读取常发货物信息
    setChoosedCargo () {
      if (this.cargoOften) {
        this.formList.splice(this.cargoIndex, 1, Object.assign(this.getEmptyCargo(), this.cargoOften))
        this.CLEAR_CARGO_OFTEN()
      }
      this.cargoIndex = void 0
    },

    ...dialogs
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$nextTick(() => { vm.initCargoList(from.name) })
    })
  }
}
</script>

<style lang="stylus" scoped>
  .scroll-box
    height calc(100vh - 114px)
    padding-bottom 15px

  .cargo-form-box
    padding-bottom 15px

  .form-section
    margin-top 15px
    &:first-child
      margin-top 10px

  .form-add
    height 50px
    padding 0
    border-radius 0
    color #189cb2
    background #ffffff
    span
      font-size 20px

  .footer
    &-button
      height 44px
      padding 0
      border-radius 0
      font-weight bold
    &-detail
      display flex
      flex-direction column
      justify-content space-between
      height 70px
      padding 16px
      background #ffffff
      &-line
        display flex
        font-size 12px
        color #999999
        > span
            flex none
            width 50%
        &-data
          font-size 14px
          color #333333
          font-weight bold

</style>

<style lang="stylus">
  .cargo-form-box .form-section .form-item-box:last-child .form-item:after
    border-style none
  .cargo-info-size-dialog
    display flex
    justify-content space-around
    padding 10px 5px
    &-item
      flex 1
      margin 0 5px
      input
        text-align center
</style>
