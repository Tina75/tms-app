<template>
  <div class="truck">
    <cell-group>
      <cell-item
        label="车牌号码"
        :route="{name:'truck-number'}"
        :link-icon="true">
        {{TruckInfo.truckNo}}
      </cell-item>
      <cell-item
        label="车型"
        :route="{name:'truck-detail', params: { type: 'proto' } }"
        :link-icon="true">
        {{TruckInfo.truckTypeName}}
      </cell-item>
      <cell-item
        label="车长"
        :route="{name:'truck-detail', params: { type: 'length' }}"
        :link-icon="true">
        {{TruckInfo.truckLengthName | lengthName}}
      </cell-item>
    </cell-group>
  </div>
</template>
<script>
import CellGroup from '@/components/CellGroup'
import CellItem from '@/components/CellItem'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'myTruck',
  metaInfo: {
    title: '车辆信息'
  },
  components: { CellGroup, CellItem },
  filters: {
    lengthName (value) {
      if (value) {
        if (value.indexOf('米') > 0) {
          return value
        } else {
          return value + '米'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['TruckInfo'])
  },
  methods: {
    ...mapActions(['getTruckInfo'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getTruckInfo()
    })
  }
}
</script>
<style lang="stylus" scoped>
.truck
  padding-top 10px
</style>
