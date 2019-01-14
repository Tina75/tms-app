<template>
  <div class="scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <div class="cargo-form-box">
        <form-group :rules="rules">
          <div class="form-section" v-for="(form, index) in formList" :key="index">
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
              v-model="form.weight"
              label="重量(公斤)"
              type="number" />
            <form-item
              v-model="form.volumn"
              label="体积(方)"
              type="number"
              precision="6" />
            <form-item
              v-model="form.cost"
              label="货值(元)"
              type="number"
              precision="4" />
            <form-item
              v-model="form.package"
              label="包装方式"
              type="click"
              @on-click="showPackageDialog(index)" />
            <form-item
              v-model="form.count"
              label="包装数量" />
            <form-item
              v-model="form.size"
              label="包装尺寸(毫米)"
              type="click"
              :show-arrow="false"
              placeholder="请输入长*宽*高"
              @on-click="showSizeDialog(index)" />
            <form-item
              v-model="form.number"
              label="货物编码"
              maxlength="200" />
            <form-item
              v-model="form.remark1"
              label="备注1"
              placeholder="请输入(最多输入200字)"
              type="textarea"
              maxlength="200" />
            <form-item
              v-model="form.remark2"
              label="备注2"
              placeholder="请输入(最多输入200字)"
              type="textarea"
              maxlength="200" />
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
          <span>总重量：<span class="footer-detail-line-data">{{ total.weight }}吨</span> </span>
          <span>总体积：<span class="footer-detail-line-data">{{ total.volumn }}方</span> </span>
          <span>总数量：<span class="footer-detail-line-data">{{ total.count }}</span> </span>
        </p>
        <p class="footer-detail-line">总货值：<span class="footer-detail-line-data">{{ total.cost }}元</span></p>
      </div>
      <cube-button class="footer-button" primary>确定</cube-button>
    </div>
  </div>
</template>

<script>
import NP from 'number-precision'
import { mapGetters, mapMutations } from 'vuex'
import { FormGroup, FormItem, FormTitle } from '@/components/Form'
import SizeInput from '../components/SizeInput'
import { PACKAGE_TYPE } from '../../js/constant'
const CARGO_IMAGE = require('../assets/box.png')

export default {
  metaInfo: { title: '货物信息' },
  components: { FormGroup, FormItem, FormTitle, SizeInput },
  data () {
    return {
      CARGO_IMAGE,
      formList: [],
      cargoIndex: void 0,
      dialogIndex: void 0,
      sizeDialog: null,
      packageDialog: null,
      size: { length: '', width: '', height: '' },
      package: '',
      rules: {
        cargoName: { required: true, type: 'string' }
      }
    }
  },
  computed: {
    ...mapGetters('order/create', [ 'cargoOften' ]),

    total () {
      return this.formList.reduce((last, item) => {
        return {
          weight: NP.plus(item.weight || 0, last.weight),
          volumn: NP.plus(item.volumn || 0, last.volumn),
          count: NP.plus(item.count || 0, last.count),
          cost: NP.plus(item.cost || 0, last.cost)
        }
      }, {
        weight: 0,
        volumn: 0,
        count: 0,
        cost: 0
      })
    }
  },
  methods: {
    ...mapMutations('order/create', [ 'CLEAR_CARGO_OFTEN' ]),

    cargoDelete (index) {
      this.formList.splice(index, 1)
    },

    cargoAdd (index) {
      this.formList.push({
        cargoName: '',
        weight: '',
        volumn: '',
        cost: '',
        package: '',
        count: '',
        size: '',
        length: '',
        width: '',
        height: '',
        number: '',
        remark1: '',
        remark2: ''
      })
    },

    chooseCargoInfo (index) {
      this.cargoIndex = index
      this.$router.push({ name: 'order-cargo-often' })
    },

    setChoosedCargo () {
      if (this.cargoOften) {
        this.formList.splice(this.cargoIndex, 1, Object.assign({}, this.cargoOften))
        this.CLEAR_CARGO_OFTEN()
      }
      this.cargoIndex = void 0
    },

    showSizeDialog (index) {
      this.dialogIndex = index
      if (!this.sizeDialog) this.initSizeDialog()
      const temp = this.formList[index]
      this.size.length = temp.length
      this.size.height = temp.height
      this.size.width = temp.width
      this.sizeDialog.show()
    },

    initSizeDialog () {
      this.sizeDialog = this.$createDialog({
        title: '包装尺寸(毫米)',
        type: 'confirm',
        onConfirm: () => {
          const temp = this.formList[this.dialogIndex]
          let extra = { volumn: temp.volumn, size: '' }
          if (!temp.volumn) {
            extra.volumn = NP.round(
              NP.divide(
                NP.times(this.size.length || 0, this.size.width || 0, this.size.height || 0),
                1000 * 1000 * 1000
              ),
              6
            )
          }
          extra.size = [ this.size.length || '-', this.size.width || '-', this.size.height || '-' ].join('x')
          this.formList.splice(this.dialogIndex, 1, Object.assign(temp, this.size, extra))
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

    showPackageDialog (index) {
      this.dialogIndex = index
      if (!this.packageDialog) this.initPackageDialog()
      const temp = this.formList[index]
      this.package = temp.package
      this.packageDialog.show()
    },

    initPackageDialog () {
      this.packageDialog = this.$createDialog({
        title: '包装方式',
        type: 'confirm',
        onConfirm: () => {
          const temp = this.formList[this.dialogIndex]
          if (this.package) {
            this.formList.splice(this.dialogIndex, 1, Object.assign(temp, { package: this.package }))
          }
        }
      }, createElement => {
        const buttons = PACKAGE_TYPE.map(item => createElement(
          'cube-button',
          {
            props: {
              light: true,
              inline: true
            },
            style: {
              margin: '5px'
            },
            on: {
              click: () => {
                this.package = item.text
              }
            }
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
              value: this.package
            },
            on: {
              blur: ({ target }) => {
                this.package = target.value
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
      if (vm.cargoIndex === undefined) vm.cargoAdd()
      else vm.setChoosedCargo()
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
