<template>
  <cube-form>
    <cube-form-group>
      <cube-form-item :field="fields['carNo']"/>
      <cube-form-item :field="fields['driverName']"/>
      <cube-form-item :field="fields['driverPhone']"/>
    </cube-form-group>
    <cube-form-group>
      <cube-button type="submit">Submit</cube-button>
    </cube-form-group>
  </cube-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'send-sel',
  components: {},
  metaInfo: { title: '' },
  data () {
    return {
      model: {
        carNo: '',
        driverName: '',
        driverPhone: ''
      },
      fields: {
        carNo: {
          type: 'select',
          modelKey: 'carNo',
          label: '车牌号',
          props: {
            options: [2015, 2016, 2017, 2018, 2019, 2020]
          },
          rules: {
            required: true
          }
        }
      }

    }
  },

  computed: {},

  mounted () {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getCarrierNameList()
      vm.getSelfDriverList()
      vm.getSelfCarList().then(carList => { vm.fields.carNo.props.options = carList })
    })
  },

  methods: {
    ...mapActions('pickup', ['getCarrierNameList', 'getSelfCarList', 'getSelfDriverList'])

  }
}

</script>
<style lang='stylus' scoped>
</style>
