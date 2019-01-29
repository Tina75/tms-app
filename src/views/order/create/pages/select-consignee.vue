<template>
  <NoData
    v-if="!list.length"
    message="老板，您还没有记录收货人信息">
    <img
      slot="img"
      class="order-create-consignee__placeholder"
      src="@/assets/contacts/shipper-list-empty.png"
    >
  </NoData>
  <cube-scroll v-else ref="$scroll">
    <ListItem
      v-for="(item, i) in list"
      :key="item.id"
      :index="i"
      :item="item"
      :use-name-icon="true"
      @click="onItemClick"
    />
  </cube-scroll>
</template>

<script>
import ListItem from '@/views/contacts/components/ListItem'
import NoData from '@/components/NoData'
import { mapState, mapMutations } from 'vuex'
import { MODULE_NAME } from '../../js/constant'
import { addressConcat } from '../../js/filters'

export default {
  name: 'select-consignee',
  metaInfo: {
    title: '选择收货人'
  },
  components: { ListItem, NoData },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState(MODULE_NAME.ORDER_CREATE, [ 'consigneeList' ]),
    list () {
      return this.consigneeList.map(item => ({
        id: item.id,
        name: item.contact + '  ' + item.phone,
        detail: addressConcat(item.address, item.startName, item.consignerHourseNumber),
        phone: item.phone,
        data: item
      }))
    }
  },
  methods: {
    ...mapMutations(MODULE_NAME.ORDER_CREATE, [ 'SET_CONSIGNEE_INFO' ]),

    onItemClick(item) {
      this.SET_CONSIGNEE_INFO(item.data)
      this.$router.back()
    }
  }
}
</script>

<style lang='stylus'>
  .order-create-consignee__placeholder
    width 179px
    height 133px

  .contact-item__right-icon
    display none
</style>
