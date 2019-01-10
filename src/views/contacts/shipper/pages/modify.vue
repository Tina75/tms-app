<template>
  <div class="modify-shipper">
    <FormItem v-model="contactModify.name" label="发货人名称" required/>
    <FormItem v-model="contactModify.contact" label="联系人" required/>
    <FormItem v-model="contactModify.phone" label="联系人电话" :bottom-line="false" required/>
    <FormItem label="提货方式" :value="test" placeholder="请选择" type="click" class="cube-mt-15"/>
    <FormItem label="支付方式" :value="test" placeholder="请选择" type="click"/>
    <FormItem label="是否开票" :value="test" type="switch"/>
    <FormItem label="对接业务员" :value="test" placeholder="请选择" type="click"/>
    <FormItem label="开拓渠道" :value="test" placeholder="请选择" :bottom-line="false" type="click"/>
    <FormItem maxlength="200" :value="test" class="cube-mt-15" type="textarea" label="备注"/>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import FormItem from '@/components/Form/FormItem'
const moudleName = 'contacts/shipper'
export default {
  name: 'ModifyShipper',
  metaInfo() {
    return {
      title: this.isCreate ? '新增发货方' : '编辑发货方'
    }
  },
  components: { FormItem },
  data() {
    return {
      test: ''
    }
  },
  computed: {
    ...mapState(moudleName, ['contactModify']),
    isCreate() {
      return this.$route.params.type === 'create'
    }
  },
  methods: {
    ...mapMutations(moudleName, ['setContactModify'])
  }
}
</script>
<style lang='stylus' >
.modify-shipper
  height 100%
</style>
