<template>
  <div class="cube-has-bottom-btn cube-pt-10">
    <FromGroup :rules="rules">
      <FormItem v-model="model.cargoName" label="货物名称" class="cube-mb-15" maxlength="20" prop="require"/>
      <FormItem v-model="model.cargoNo" label="货物编号" />
      <FormItem v-model="model.cargoCost" label="货值(元)" type="number"/>
      <FormItem v-model="model.unit" label="包装方式" type="click" placeholder="请选择" @on-click="showPackageType = true"/>
      <FormItem :value="viewDimension" label="包装尺寸(毫米)" type="click" placeholder="请输入长*宽*高" @on-click="showDismensionInput = true" />
      <FormItem v-model="model.weight" label="重量(公斤)" type="number"/>
      <FormItem v-model="model.volume" label="体积(方)" maxlength="6" type="number" class="cube-mb-15"/>
      <FormItem v-model="model.remark1" label="备注1" maxlength="200" placeholder="请输入（最多输入200字）" type="textarea"  class="cube-mb-15"/>
      <FormItem v-model="model.remark2" label="备注2" maxlength="200" placeholder="请输入（最多输入200字）" type="textarea" />
    </FromGroup>
    <CheckboxPopup v-model="showPackageType" :value="model.unit" :options="unitTypes" placeholder="请输入包装方式" @confirm="model.unit = $event"/>
    <InputPopup v-model="showDismensionInput" />
    <LoadingButton :loading="submiting" class="cube-bottom-button" @click="submit"/>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import LoadingButton from '@/components/LoadingButton'
import FromGroup from '@/components/Form/FormGroup'
import FormItem from '@/components/Form/FormItem'
import CheckboxPopup from '../../components/CheckboxPopup'
import InputPopup from '../../components/InputPopup'
import { CargoDetail } from '../modules/model'
const moudleName = 'contacts/shipper'
export default {
  name: 'ModifyContactsShipperCargo',
  metaInfo() {
    return {
      title: this.isCreate ? '新增常发货物' : '修改常发货物'
    }
  },
  components: { FormItem, FromGroup, LoadingButton, CheckboxPopup, InputPopup },
  data() {
    return {
      model: new CargoDetail(),
      unitTypes: CargoDetail.unitTypes,
      rules: {
        require: {
          required: true
        }
      },
      submiting: false,
      showPackageType: false,
      showDismensionInput: false
    }
  },
  computed: {
    ...mapState(moudleName, ['cargoDetail']),
    viewDimension() {
      const dimension = this.model.dimension
      if (dimension.length || dimension.width || dimension.height) {
        return `${dimension.length}*${dimension.width}*${dimension.height}`
      }
      return ''
    },
    isCreate() {
      return !this.model.id
    }
  },
  methods: {
    ...mapActions(moudleName, ['modifyCargo']),
    async submit() {
      this.submiting = true
      try {
        this.modifyCargo()
      } catch (e) {
        console.error(e)
      } finally {
        this.submiting = false
      }
    },
    onPageRefresh() {
    }
  }
}
</script>
<style lang='stylus' >
</style>
