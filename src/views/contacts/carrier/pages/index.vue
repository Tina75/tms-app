<template>
  <div class="contacts-carrier">
    <InfiniteList
      v-model="loading"
      :has-data="contactList.list.length"
      :loader="loadContactList"
      :has-next="contactList.hasNext"
    >
      <ListItem
        v-for="(item, i) in contactList.list"
        :key="item.id"
        :index="i"
        :item="item"
        icon="icon-ico-driver"
        @phoneCall="onItemPhoneCall"
        @click="onItemClick"
      />
      <template slot="empty">
        <NoData
          action="新增承运商"
          message="当前未添加承运商"
          @btn-click="$router.push({ name: 'contacts-carrier-modify' })"
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
import ListItem from '../../components/ListItem'
import InfiniteList from '@/components/InfiniteList'
import NoData from '@/components/NoData'
import { setAppRightBtn } from '@/libs/bridgeUtil'
import { mapActions, mapState } from 'vuex'
const moudleName = 'contacts/carrier'
export default {
  name: 'ContactsCarrierList',
  metaInfo: {
    title: '承运商'
  },
  components: { ListItem, NoData, InfiniteList },
  data() {
    return {
      loading: false
    }
  },
  computed: mapState(moudleName, ['contactList']),
  methods: {
    ...mapActions(moudleName, ['loadContactList']),
    loader(refresh) {
      this.loadContactList(refresh)
    },
    onPageRefresh() {
      console.info('onRefreshPage')
      this.loading = true
      setAppRightBtn([
        {
          text: '添加',
          iconType: 'add',
          action: () => {
            this.$router.push({ name: 'contacts-carrier-modify' })
          }
        }
      ])
    },
    onItemPhoneCall(item) {
      window.location.href = `tel:${item.phone}`
    },
    onItemClick(item, index) {
      this.$router.push({ name: 'contacts-carrier-detail', query: { carrierId: item.id } })
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
