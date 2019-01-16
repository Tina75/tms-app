<template>
  <div class="scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <form-group>
        <div class="form-section">
          <form-item
            v-model="isInvoice"
            label="是否开票"
            type="switch" />
          <form-item
            v-if="isInvoice"
            v-model="form.invoiceRate"
            label="开票税率(%)"
            type="number"
            precision="2" />
        </div>
        <div class="form-section">
          <form-item
            v-model="form.collectionMoney"
            label="代收货款(元)"
            type="number"
            precision="4" />
        </div>
        <div class="form-section">
          <form-item
            v-model="form.remark"
            label="备注"
            type="textarea"
            placeholder="请输入(最多输入200字)"
            maxlength="200" />
        </div>
      </form-group>
    </cube-scroll>

    <cube-button class="footer" primary @click="ensure">确定</cube-button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { FormGroup, FormItem } from '@/components/Form'
import NP from 'number-precision'

export default {
  metaInfo: { title: '其他信息' },
  components: { FormGroup, FormItem },
  data () {
    return {
      isInvoice: false,
      form: {
        isInvoice: 0,
        invoiceRate: '',
        collectionMoney: '',
        remark: ''
      }
    }
  },
  computed: {
    ...mapGetters('order/create', [ 'otherInfo' ])
  },
  watch: {
    isInvoice (val) { this.form.isInvoice = Number(val) }
  },
  methods: {
    ...mapMutations('order/create', [ 'SET_OTHER_INFO' ]),

    ensure () {
      const temp = Object.assign({}, this.form)
      temp.collectionMoney = NP.times(temp.collectionMoney, 100)
      this.SET_OTHER_INFO(temp)
      this.$router.back()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      for (let key in vm.form) {
        if (key === 'isInvoice') vm.form.isInvoice = !!vm.otherInfo.isInvoice
        else if (key === 'collectionMoney') {
          if (vm.otherInfo.collectionMoney === undefined)
          vm.form.collectionMoney = (vm.otherInfo.collectionMoney === undefined || vm.otherInfo.collectionMoney === '')
            ? ''
            : NP.divide(vm.otherInfo.collectionMoney, 100)
        }
        else vm.form[key] = vm.otherInfo[key] === undefined ? '' : vm.otherInfo[key]
      }
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
