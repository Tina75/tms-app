<template>
  <div class="contacts-carrier">
    <InfiniteList
      v-model="loading"
      :data="truckList.list"
      :loader="loadTruckList"
      :is-end="truckList.hasNext"
    >
      <Media
        v-for="(item, i) in truckList.list"
        :key="item.id"
        :index="i"
        :item="item"
        @phoneCall="onItemPhoneCall"
        @click="onItemClick"
      />
      <template slot="empty">
        <NoData
          action="新增合作车辆"
          message="当前未添加合作车辆"
          @btn-click="$router.push({ name: 'contacts-carrier-truck-modify', query: { carrierId: $route.query.carrierId } })"
        >
          <img
            slot="img"
            class="contacts-carrier__placeholder"
            src="@/assets/contacts/shipper-list-empty.png"
          >
        </NoData>
      </template>
    </InfiniteList>
  </div>
</template>

<script>
// import ListItem from '../../components/ListItem'
import Media from '../components/Media'
import InfiniteList from '@/components/InfiniteList'
import NoData from '@/components/NoData'
import { mapActions, mapState } from 'vuex'
const moudleName = 'contacts/carrier'
export default {
  name: 'ContactsCarrierTruckList',
  metaInfo: {
    title: '合作车辆'
  },
  components: { NoData, InfiniteList, Media },
  data() {
    return {
      loading: false
    }
  },
  computed: mapState(moudleName, ['truckList']),
  methods: {
    ...mapActions(moudleName, ['loadTruckList']),
    loader(refresh) {
      // if (refresh) {
      //   this.syncButtOperator()
      // }
      this.loadTruckList(refresh)
    },
    onPageRefresh() {
      console.info('onRefreshPage')
      this.loading = true
    },
    onItemPhoneCall(item) {
      window.location.href = `tel:${item.phone}`
    },
    onItemClick(item, index) {
      this.$router.push({ name: 'contacts-carrier-truck-detail', query: { carrierId: item.id } })
    }
  }
}
</script>

<style lang='stylus'>
.contacts-carrier
  height 100%
  &__placeholder
    width 179px
    height 133px
</style>
