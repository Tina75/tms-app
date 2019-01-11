<template>
  <div class="address-shipper">
    <ContactList
      :data="ContactList"
      :refreshing="refreshing"
      :loading="loading"
      @phoneCall="onPhoneCall"
      @selectItem="onSelectItem"
      @pulling-down="onPullDown"
      @pulling-up="onPullUp"
    />
  </div>
</template>

<script>
import ContactList from '../../components/ContactList'
import { mapActions, mapGetters, mapMutations } from 'vuex'
const moudleName = 'contacts/shipper'
export default {
  name: 'ContactsShipper',
  metaInfo: {
    title: '发货方'
  },
  components: { ContactList },
  data() {
    return {
      loading: false,
      refreshing: false
    }
  },
  computed: {
    ...mapGetters(moudleName, ['ContactList'])
  },
  methods: {
    ...mapActions(moudleName, ['loadContactList']),
    ...mapMutations(moudleName, ['clearContactList']),
    async onRefresh() {
      this.refreshing = true
      await this.onPullDown()
    },
    async onPullDown() {
      console.info('onRefresh')
      this.refreshing = true
      this.clearContactList()
      await this.loadContactList()
      this.refreshing = false
    },
    async onPullUp() {
      this.loading = true
      await this.loadContactList()
      this.loading = false
    },
    onPhoneCall() {
      console.info('onPhoneCall')
    },
    onSelectItem() {
      console.info('onSelectItem')
    }
  }
}
</script>

<style lang='stylus' scoped>
.address-shipper
  height 100%
</style>
