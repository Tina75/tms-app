<template>
  <div class="page"/>
</template>

<script>
export default {
  name: 'image-preview',
  metaInfo: { title: '图片查看' },
  data () {
    return {
      initialIndex: 0,
      preview: {},
      hasBack: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.hasBack = false
      let imgsParam = [...to.params.imgs]
      if ((typeof imgsParam) === 'object' && imgsParam.length) {
        if (imgsParam[0] && imgsParam[0].indexOf('aliyuncs.com') < 0) {
          imgsParam = imgsParam.map(item => process.env.VUE_APP_IMG_HOST + item + '?x-oss-process=image/resize,m_lfit,w_1000')
        }
        if (!imgsParam || !imgsParam.length) return
        vm.initialIndex = to.params.index
        vm.preview = vm.$createImagePreview({
          imgs: imgsParam,
          initialIndex: vm.initialIndex,
          loop: false,
          onChange: (i) => { vm.initialIndex = i },
          onHide: () => {
            if (!vm.hasBack) vm.$router.back()
          }
        })
        vm.preview.show()
      } else {
        window.toast('图片链接无法访问')
        vm.$router.back()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.hasBack = true
    this.preview.hide()
    next()
  }
}

</script>
<style lang='stylus' scoped>
.page
  background #000000
</style>
