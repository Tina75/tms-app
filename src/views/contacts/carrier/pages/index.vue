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
        @phoneCall="onShowPhonePopup"
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
    <cube-popup ref="phoneCall" type="phoneCall-popup" position="bottom" :mask-closable="true">
      <a
        v-if="currentItem.carrierPhone"
        href="javascript:;"
        class="contacts-carrier__phone-btn border-bottom-1px"
        @click="onItemPhoneCall(currentItem.carrierPhone)">
        {{ `负责人 ${currentItem.carrierPhone}`}}
      </a>
      <a
        v-if="currentItem.customerCarrierPhone"
        href="javascript:;"
        class="contacts-carrier__phone-btn"
        @click="onItemPhoneCall(currentItem.customerCarrierPhone)">
        {{ `客服 ${currentItem.customerCarrierPhone}`}}
      </a>
    </cube-popup>
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
      loading: false,
      currentItem: ''
    }
  },
  computed: mapState(moudleName, ['contactList']),
  methods: {
    ...mapActions(moudleName, ['loadContactList']),
    loader(refresh) {
      this.loadContactList(refresh)
    },
    onPageRefresh() {
      this.loading = true
    },
    setBtns () {
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
    onShowPhonePopup(item) {
      this.currentItem = item.data
      this.$refs.phoneCall.show()
    },
    onItemPhoneCall (phone) {
      window.location.href = `tel:${phone}`
      this.$refs.phoneCall.hide()
    },
    onItemClick(item, index) {
      this.$router.push({ name: 'contacts-carrier-detail', query: { carrierId: item.id } })
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => vm.setBtns())
  }
}
</script>

<style lang='stylus'>
.contacts-carrier
  height 100%
  &__placeholder
    width 179px
    height 133px
  &__phone-btn
    display block
    line-height 45px
    text-align center
    color #418DF9
    font-size 15px
    background #ffffff
</style>
