<template>
  <div class="scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <div class="cargo-form-box">
        <form-group ref="$form" :rules="rules">
          <div v-for="(form, index) in formList" :key="index" class="form-section">
            <form-title
              :image="CARGO_IMAGE"
              :title="'货物' + (index + 1)">
              <span
                v-if="index"
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
              @on-icon-click="chooseCargoInfo(index)" />
            <form-item
              v-if="orderConfig.weightTonOption"
              v-model="form.weight"
              label="重量(吨)"
              type="number"
              precision="3" />
            <form-item
              v-if="orderConfig.weightKgOption"
              v-model="form.weightKg"
              label="重量(公斤)"
              type="number" />
            <form-item
              v-if="orderConfig.volumeOption"
              v-model="form.volume"
              label="体积(方)"
              type="number"
              precision="6" />
            <form-item
              v-if="orderConfig.cargoCostOption"
              v-model="form.cargoCost"
              label="货值(元)"
              type="number"
              precision="4" />
            <form-item
              v-if="orderConfig.unitOption"
              v-model="form.unit"
              label="包装方式"
              type="click"
              @click.native="showUnitDialog(index)" />
            <form-item
              v-if="orderConfig.quantityOption"
              v-model="form.quantity"
              label="包装数量" />
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
              maxlength="200" />
            <form-item
              v-if="orderConfig.remark1Option"
              v-model="form.remark1"
              label="备注1"
              placeholder="请输入(最多输入200字)"
              type="textarea"
              maxlength="200" />
            <form-item
              v-if="orderConfig.remark2Option"
              v-model="form.remark2"
              label="备注2"
              placeholder="请输入(最多输入200字)"
              type="textarea"
              maxlength="200" />
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
          <span v-if="orderConfig.quantityOption">总数量：<span class="footer-detail-line-data">{{ total.quantity }}</span> </span>
        </p>
        <p v-if="orderConfig.cargoCostOption" class="footer-detail-line">总货值：<span class="footer-detail-line-data">{{ total.cargoCost }}元</span></p>
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
import SizeInput from '../components/SizeInput'
import { UNIT_TYPE } from '../../js/constant'
const CARGO_IMAGE = require('../assets/box.png')

export default {
  metaInfo: { title: '货物信息' },
  components: { FormGroup, FormItem, FormTitle },
  data () {
    return {
      CARGO_IMAGE,
      formList: [],
      cargoIndex: void 0,
      dialogIndex: void 0,
      sizeDialog: null,
      unitDialog: null,
      size: { length: '', width: '', height: '' },
      unit: '',
      rules: {
        cargoName: { required: true, type: 'string' },
        weight: { type: 'number', min: 0 },
        weightKg: { type: 'number', min: 0 }
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
    ...mapMutations('order/create', [ 'CLEAR_CARGO_OFTEN', 'SET_CARGO_LIST' ]),
    // 初始化货物信息
    initCargoList () {
      const tempCargoList = Object.assign([], this.orderCargoList).map(item => {
        if (item.cargoCost) item.cargoCost = NP.divide(item.cargoCost, 100)
        if (item.size === undefined) item.size = [ item.dimension.length || '-', item.dimension.width || '-', item.dimension.height || '-' ].join('x')
        return item
      })
      this.formList = tempCargoList
      if (!this.formList.length) this.cargoAdd()
      this.setChoosedCargo()
    },
    // 提交货物信息
    async submitCargoList () {
      const valid = await this.$refs.$form.validate()
      if (!valid) return
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
    // 显示填写尺寸对话框
    showSizeDialog (index) {
      this.dialogIndex = index
      if (!this.sizeDialog) this.initSizeDialog()
      const temp = this.formList[index]
      this.size.length = temp.dimension.length
      this.size.height = temp.dimension.height
      this.size.width = temp.dimension.width
      this.sizeDialog.show()
    },
    // 初始化填写尺寸对话框
    initSizeDialog () {
      this.sizeDialog = this.$createDialog({
        title: '包装尺寸(毫米)',
        type: 'confirm',
        onConfirm: () => {
          const temp = this.formList[this.dialogIndex]
          let extra = { volume: temp.volume, size: '' }
          if (!temp.volume) {
            extra.volume = NP.round(
              NP.divide(
                NP.times(this.size.length || 0, this.size.width || 0, this.size.height || 0),
                1000 * 1000 * 1000
              ),
              6
            )
          }
          extra.size = [ this.size.length || '-', this.size.width || '-', this.size.height || '-' ].join('x')
          this.formList.splice(this.dialogIndex, 1, Object.assign(temp, { dimension: this.size }, extra))
          this.size.length = this.size.width = this.size.height = ''
        }
      }, createElement => {
        return createElement(SizeInput, {
          slot: 'content',
          on: {
            blur: (length, width, height) => {
              this.size.length = length
              this.size.width = width
              this.size.height = height
            }
          }
        })
      })
    },
    // 显示填写包装对话框
    showUnitDialog (index) {
      this.dialogIndex = index
      if (!this.unitDialog) this.initUnitDialog()
      const temp = this.formList[index]
      this.unit = temp.unit
      this.unitDialog.show()
    },
    // 初始化填写包装对话框
    initUnitDialog () {
      this.unitDialog = this.$createDialog({
        title: '包装方式',
        type: 'confirm',
        onConfirm: () => {
          const temp = this.formList[this.dialogIndex]
          if (this.unit) {
            this.formList.splice(this.dialogIndex, 1, Object.assign(temp, { unit: this.unit }))
          }
        }
      }, createElement => {
        const buttons = UNIT_TYPE.map(item => createElement(
          'cube-button',
          {
            props: { light: true, inline: true },
            style: { margin: '5px' },
            on: { click: () => { this.unit = item.text } }
          },
          item.text)
        )
        return createElement('div', {
          slot: 'content',
          placeholder: '请输入',
          style: {
            margin: '0 10px'
          }
        }, [
          createElement('cube-input', {
            props: {
              value: this.unit
            },
            on: {
              blur: ({ target }) => {
                this.unit = target.value
              }
            }
          }),
          ...buttons
        ])
      })
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.initCargoList()
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

  form
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
    &-detail
      display flex
      flex-direction column
      justify-content space-between
      height 70px
      padding 16px
      background #ffffff
      &-line
        font-size 12px
        color #999999
        &:first-child
          display flex
          span
            flex 33.333333%
        &-data
          font-size 14px
          color #333333
          font-weight bold

</style>

<style lang="stylus">
  .cargo-form-box .form-section .form-item-box:last-child .form-item:after
    border-style none
</style>
