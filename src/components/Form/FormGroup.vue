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
    // rules 为表单校验规则，使用请参考 /order/create 和 cubeui-validator
    // 当前不支持校验触发事件，会在input和blur事件时自动触发校验
    rules: {
      type: Object,
      default: null
    }
  },
  methods: {
    async validate () {
      const formItems = this.$children.filter(item => item.$options._componentTag === 'form-item')
      const valids = await Promise.all(formItems.map(item => item.doValidate()))
      return valids.every(valid => valid === true)
    }
  }
}
</script>
