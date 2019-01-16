<template>
  <div class="contacts-shipper">
    <InfiniteList
      v-model="loading"
      :data="contactList.list"
      :loader="loadContactList"
      :has-next="contactList.hasNext"
    >
      <ListItem
        v-for="(item, i) in contactList.list"
        :key="item.id"
        :index="i"
        :item="item"
        @phoneCall="onItemPhoneCall"
        @click="onItemClick"
      />
      <template slot="empty">
        <NoData
          action="新增发货方"
          message="老板，您还没有记录发货方信息 赶快新增一个，方便联系哦～"
          @btn-click="$router.push({ name: 'contacts-shipper-modify' })"
        >
          <img
            slot="img"
            class="contacts-shipper__placeholder"
            src="@/assets/contacts/shipper-list-empty.png"
          >
        </NoData>
      </template>
    </InfiniteList>
  </div>
</template>

<script>
import ListItem from '../../components/ListItem'
import InfiniteList from '@/components/InfiniteList'
import NoData from '@/components/NoData'
import { mapActions, mapState } from 'vuex'
const moudleName = 'contacts/shipper'
export default {
  name: 'ContactsShipperList',
  metaInfo: {
    title: '发货方'
  },
  components: { ListItem, NoData, InfiniteList },
  data() {
    return {
      loading: false
    }
  },
  computed: mapState(moudleName, ['contactList']),
  methods: {
    ...mapActions(moudleName, ['loadContactList', 'syncContactDetail', 'syncButtOperator']),
    loader(refresh) {
      if (refresh) {
        this.syncButtOperator()
      }
      this.loadContactList(refresh)
    },
    onPageRefresh() {
      console.info('onPageRefresh')
      this.loading = true
    },
    onItemPhoneCall(item) {
      window.location.href = `tel:${item.phone}`
    },
    onItemClick(item, index) {
      this.$router.push({ name: 'contacts-shipper-detail', query: { consignerId: item.id } })
    }
  }
}
</script>

<style lang='stylus'>
.contacts-shipper
  height 100%
  &__placeholder
    width 179px
    height 133px
</style>
