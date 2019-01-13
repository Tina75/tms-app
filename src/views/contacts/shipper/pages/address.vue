<template>
  <div class="contacts-shipper-address">
    <InfiniteList v-model="loading" :data="addressList.list" :loader="loadAddressList" :is-end="addressList.hasNext">
      <ListItem
        v-for="(item, i) in addressList.list"
        :key="item.id"
        :index="i"
        :item="item"
        icon="icon-ico_location"
      >
        <div
          slot="right"
          class="contacts-shipper-address__item border-left-1px cube-font-14 cube-c-light-grey"
          @click="modify(i)"
          v-text="'修改'"
        />
      </ListItem>
      <template slot="empty">
        <NoData action="新增发货地址" message="老板，您还没有记录发货地址信息 赶快新增一个，用着方便哦～" @btn-click="modify">
          <img
            slot="img"
            class="contacts-shipper__placeholder"
            src="@/assets/contacts/address-list-empty.png"
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
  name: 'ContactsShipperCargoList',
  metaInfo: {
    title: '发货方'
  },
  components: { ListItem, NoData, InfiniteList },
  data() {
    return {
      loading: false
    }
  },
  computed: mapState(moudleName, ['addressList']),
  methods: {
    ...mapActions(moudleName, ['loadAddressList']),
    onRefreshPage() {
      this.loading = true
    },
    modify(index) {
      if (index) {
      }
      this.$router.push({ name: 'contacts-shipper-address-modify' })
    }
  }
}
</script>

<style lang='stylus'>
.contacts-shipper-address
  height 100%
  &__placeholder
    width 179px
    height 133px
  &__item
    padding 8px 0 8px 10px
    margin-left 10px
</style>
