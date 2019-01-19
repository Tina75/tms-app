<template>
  <form ref="$form">
    <slot />
  </form>
</template>

<script>
export default {
  name: 'FormGroup',
  provide () {
    return {
      rules: this.rules
    }
  },
  props: {
    value: {
      type: Object,
      default: null
    },
    // rules 为表单校验规则，使用请参考 /order/create 和 cubeui-validator
    // 当前不支持校验触发事件，会在input和blur事件时自动触发校验
    // ruleItem.messages 中的字段需要唯一且与校验方法同名，如果重复提示信息会被覆盖，cubeui 的校验每种类型只支持一种提示
    rules: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      model: this.value ? Object.assign({}, this.value) : null
    }
  },
  methods: {
    getAllItems () {
      return this.$children.filter(item => ['form-item', 'FormItem'].indexOf(item.$options._componentTag) > -1)
    },
    reset () {
      this.getAllItems().map(item => { item.setValid() })
      if (this.model) this.$emit('input', this.model)
    },
    async validate () {
      const valids = await Promise.all(this.getAllItems().map(item => item.doValidate()))
      return valids.every(valid => valid === true)
    }
  }
}
</script>
