<template>
  <div class="cube-has-bottom-btn cube-pt-10">
    <FromGroup :rules="rules">
      <FormItem
        v-model="form.cargoName"
        label="货物名称"
        class="cube-mb-15"
        maxlength="20"
        prop="require"
      />
      <FormItem v-model="form.cargoNo" label="货物编号"/>
      <FormItem v-model="form.cargoCost" label="货值(元)" type="number"/>
      <FormItem
        v-model="form.unit"
        label="包装方式"
        type="click"
        placeholder="请选择"
        @on-click="showPackageType = true"
      />
      <FormItem
        :value="viewDimension"
        label="包装尺寸(毫米)"
        type="click"
        placeholder="请输入长*宽*高"
        @on-click="showDismensionInput = true"
      />
      <FormItem v-model="form.weight" label="重量(公斤)" type="number"/>
      <FormItem v-model="form.volume" label="体积(方)" maxlength="6" type="number" class="cube-mb-15"/>
      <FormItem
        v-model="form.remark1"
        label="备注1"
        maxlength="200"
        placeholder="请输入（最多输入200字）"
        type="textarea"
        class="cube-mb-15"
      />
      <FormItem
        v-model="form.remark2"
        label="备注2"
        maxlength="200"
        placeholder="请输入（最多输入200字）"
        type="textarea"
      />
    </FromGroup>
    <CheckboxPopup
      v-model="showPackageType"
      :value="form.unit"
      :options="unitTypes"
      placeholder="请输入包装方式"
      @confirm="form.unit = $event"
    />
    <DimensionPopup
      v-model="showDismensionInput"
      :value="form.dimension"
      @confirm="form.dimension = $event"
    />
    <LoadingButton :loading="submiting" class="cube-bottom-button" @click="submit"/>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import LoadingButton from '@/components/LoadingButton'
import FromGroup from '@/components/Form/FormGroup'
import FormItem from '@/components/Form/FormItem'
import CheckboxPopup from '../../components/CheckboxPopup'
import DimensionPopup from '../../components/DimensionPopup'
import { CargoDetail } from '../modules/model'
const moudleName = 'contacts/shipper'
export default {
  name: 'ModifyContactsShipperCargo',
  metaInfo() {
    return {
      title: this.isCreate ? '新增常发货物' : '修改常发货物'
    }
  },
  components: {
    FormItem,
    FromGroup,
    LoadingButton,
    CheckboxPopup,
    DimensionPopup
  },
  data() {
    return {
      form: new CargoDetail(),
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
    ...mapState(moudleName, ['cargoList']),
    ...mapMutations(moudleName, ['setCargoDetail']),
    viewDimension() {
      const dimension = this.form.dimension
      if (dimension) {
        if (dimension.length || dimension.width || dimension.height) {
          return `${dimension.length}*${dimension.width}*${dimension.height}`
        }
      }
      return ''
    },
    isCreate() {
      return typeof this.$route.query.id === 'undefined'
    }
  },
  methods: {
    ...mapActions(moudleName, ['modifyCargo', 'removeCargo']),
    async submit() {
      this.submiting = true
      const server = CargoDetail.toServer(this.form)
      server.consignerId = this.$route.query.consignerId
      try {
        await this.modifyCargo(server)
        this.$refreshPage('contacts-shipper-cargo', 'contacts-shipper-detail')
        this.$router.back()
      } catch (e) {
        console.error(e)
      } finally {
        this.submiting = false
      }
    },
    setForm() {
      const list = this.cargoList.list
      const id = this.$route.query.id
      let detailData
      if (id && list && list.length) {
        let item = list.find(item => +item.id === +id)
        if (item) {
          detailData = item.data
        }
      }
      this.form = CargoDetail.toForm(detailData)
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.setForm())
  }
}
</script>
<style lang='stylus' >
</style>
