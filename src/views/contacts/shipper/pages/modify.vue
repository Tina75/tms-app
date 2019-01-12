<template>
  <div class="modify-shipper">
    <FormItem v-model="model.name" label="发货人名称" required/>
    <FormItem v-model="model.contact" label="联系人" required/>
    <FormItem v-model="model.phone" label="联系人电话" :bottom-line="false" class="cube-mb-15" required/>
    <FormItem
      v-model="model.pickUp"
      label="提货方式"
      placeholder="请选择"
      type="select"
      :options="options.pickUps"
    />
    <FormItem
      label="支付方式"
      placeholder="请选择"
      :value="model.payType"
      type="select"
      :options="options.payTypes"
    />
    <FormItem v-model="model.isInvoice" label="是否开票" type="switch"/>
    <FormItem
      v-if="model.isInvoice"
      v-model="model.invoiceRate"
      label="开票税率(%)"
      required
      type="number"
    />
    <FormItem
      v-model="model.salesmanId"
      label="对接业务员"
      placeholder="请选择"
      type="select"
      :options="ContactOperatorOptions"
    />
    <FormItem
      v-model="model.exploiteChannel"
      label="开拓渠道"
      placeholder="请选择"
      class="cube-mb-15"
      type="select"
      :bottom-line="false"
      :options="options.channels"
    />
    <FormItem maxlength="200" type="textarea" :value="model.remark" label="备注"/>
    <cube-button class="cube-bottom-button" :primary="true" @click="submit">确定</cube-button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import FormItem from '@/components/Form/FormItem'
import { ContactDetail } from '../modules/model'
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
      model: new ContactDetail(),
      options: {
        pickUps: ContactDetail.pickUps,
        payTypes: ContactDetail.payTypes,
        channels: ContactDetail.channels
      }
    }
  },
  computed: {
    ...mapGetters(moudleName, ['ContactOperatorOptions']),
    isCreate() {
      return !this.model.id
    }
  },
  methods: {
    ...mapActions(moudleName, ['syncButtOperator', 'modifyContact']),
    submit() {
      console.info('...', this.model)
    },
    onPageRefresh() {
      if (!this.isCreate) {
        this.model = ContactDetail.parse(this.contactList[this.$route.query.index])
      } else {
        this.model = new ContactDetail()
      }
      this.loadOperators()
    }
  }
}
</script>
<style lang='stylus' >
.modify-shipper
  min-height 100%
  box-sizing border-box
  padding-bottom 60px
</style>
