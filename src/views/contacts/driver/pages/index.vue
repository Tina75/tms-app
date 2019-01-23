<template>
  <div class="contacts-driver">
    <InfiniteList
      v-model="loading"
      :has-data="driverList.list.length"
      :loader="loadDriverList"
      :has-next="driverList.hasNext"
    >
      <ListItem
        v-for="(item, i) in driverList.list"
        :key="item.id"
        :index="i"
        :item="item"
        :use-name-icon="true"
        @phoneCall="onItemPhoneCall"
        @click="onItemClick"
      />
      <template slot="empty">
        <NoData
          action="新增熟车司机"
          message="老板，您还没有记录熟车司机信息赶快新增一个，方便联系哦～"
          @btn-click="$router.push({ name: 'contacts-driver-modify' })"
        >
          <img
            slot="img"
            class="contacts-driver__placeholder"
            src="@/assets/contacts/driver-list-empty.png"
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
import { setAppRightBtn } from '@/libs/bridgeUtil'
const moudleName = 'contacts/driver'
export default {
  name: 'ContactsDriverList',
  metaInfo: {
    title: '熟车司机'
  },
  components: { ListItem, NoData, InfiniteList },
  data() {
    return {
      loading: false
    }
  },
  computed: mapState(moudleName, ['driverList']),
  methods: {
    ...mapActions(moudleName, ['loadDriverList']),
    onPageRefresh() {
      this.loading = true
    },
    setBtn() {
      setAppRightBtn([
        {
          text: '添加',
          iconType: 'add',
          action: () => {
            this.$router.push({ name: 'contacts-driver-modify' })
          }
        }
      ])
    },
    onItemPhoneCall(item) {
      window.location.href = `tel:${item.phone}`
    },
    onItemClick(item, index) {
      this.$router.push({ name: 'contacts-driver-detail', query: { driverId: item.id } })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => vm.setBtn())
  }
}
</script>

<style lang='stylus'>
.contacts-driver
  height 100%
  &__placeholder
    width 179px
    height 117px
</style>
