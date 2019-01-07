import Vue from 'vue'
import Lazyload from 'vue-lazyload'

// 图片异步加载
Vue.use(Lazyload, {
  loading: 'https://ymm.oss-cn-hangzhou.aliyuncs.com/ymmfile/bbs-biz/4cd5fa86-160d-409e-ad67-faa1c591e4ba',
  error: 'https://ymm.oss-cn-hangzhou.aliyuncs.com/ymmfile/bbs-biz/2971def3-083d-48a4-ada5-f54070e9e857',
  attempt: 2,
  filter: {
    progressive (listener, options) {
      if (!listener.src.includes('http')) {
        listener.el.setAttribute('lazy-progressive', 'true')
        /**
         *  图片OSS处理
         *  1. 根据环境拼接域名
         *  2. 是否有图片处理
         *  3. 是否支持webp格式
         */
        listener.src = `${process.env.VUE_APP_IMG_HOST}${listener.src}${listener.src.includes('x-oss-process=image') ? ',' : '?x-oss-process='}image/format,${options.supportWebp ? 'webp' : 'jpg'}`
        // loading高斯模糊底图
        listener.loading = `${listener.src},image/blur,r_50,s_30/quality,q_70`
        // 图片质量处理
        listener.src = `${listener.src}/quality,q_70`
      }
    }
  }
})
