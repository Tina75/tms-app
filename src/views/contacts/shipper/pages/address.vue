<template>
  <div class="contacts-shipper-address">
    <InfiniteList
      v-model="loading"
      :loader="loadAddressList"
      :has-data="addressList.list.length"
      :has-next="addressList.hasNext"
    >
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
          @click="modify(item)"
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
import { loadBMap } from '@/libs/util'
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
  mounted() {
    // 预加载百度地图
    loadBMap()
  },
  methods: {
    ...mapActions({
      loadAddressList: moudleName + '/loadAddressList',
      removeAddress: moudleName + '/removeAddress',
      resetAddressPage: 'contacts/resetAddressPage'
    }),
    onPageRefresh() {
      this.loading = true
    },
    modify(item) {
      debugger
      const data = {}
      const config = {
        title: item ? '修改发货地址' : '新增发货地址',
        namespace: moudleName,
        dispatch: 'addressAction',
        data
      }
      if (item) {
        item = item.data
        data.id = item.id
        data.code = item.cityCode
        data.address = item.address
        data.additional = item.consignerHourseNumber
      } else {
        data.consignerId = this.$route.query.consignerId
      }

      this.resetAddressPage(config)
      this.$router.push({ name: 'contacts-address' })
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
