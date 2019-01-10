<template>
  <div class="scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <div class="cargo-form-box">
        <form v-for="(form, index) in formList" :key="index">
          <form-title
            :image="CARGO_IMAGE"
            :title="'货物' + (index + 1)">
            <span
              slot="extra"
              v-if="index"
              @click="cargoDelete(index)">删除</span>
          </form-title>
          <form-item
            v-model="form.cargoName"
            label="货物名称"
            required
            clickIcon="icon-ico_boxx" />
          <form-item
            v-model="form.weight"
            label="重量(吨)"
            type="number" />
          <form-item
            v-model="form.volumn"
            label="体积(方)"
            type="number" />
          <form-item
            v-model="form.cost"
            label="货值(元)"
            type="number" />
          <form-item
            v-model="form.package"
            label="包装方式"
            type="click" />
          <form-item
            v-model="form.count"
            label="包装数量" />
          <form-item
            v-model="form.size"
            label="包装尺寸(毫米)"
            type="number"
            placeholder="请输入长*宽*高" />
          <form-item
            v-model="form.number"
            label="货物编码" />
          <form-item
            v-model="form.remark1"
            label="备注1"
            type="textarea"
            maxlength="200" />
          <form-item
            v-model="form.remark2"
            label="备注2"
            type="textarea"
            maxlength="200" />
        </form>
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
import { FormItem, FormTitle } from '@/components/Form'
const CARGO_IMAGE = require('../assets/box.png')

export default {
  metaInfo: { title: '货物信息' },
  components: { FormItem, FormTitle },
  data () {
    return {
      CARGO_IMAGE,
      formList: []
    }
  },
  computed: {
    total () {
      return this.formList.reduce((item, last) => {
        return {
          weight: NP.plus(item.weight || 0, last.weight),
          volumn: NP.plus(item.volumn || 0, last.volumn),
          count: NP.plus(item.count || 0, last.count),
          cost: NP.plus(item.cost || 0, last.cost),
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
        number: '',
        remark1: '',
        remark2: ''
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.cargoAdd()
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
  .cargo-form-box form .form-item-box:last-child .form-item:after
    border-style none
</style>

