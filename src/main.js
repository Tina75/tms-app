import Vue from 'vue'
// import Cube from 'cube-ui'
import VueMeta from 'vue-meta'
import App from './app.vue'
import router from './router'
import store from './store'
import './plugins'
import './components/Form'
import Iconfont from './components/Iconfont'
require('./assets/font/iconfont.css')

Vue.config.productionTip = false
Vue.use(VueMeta)
// Vue.use(Cube)
Vue.component('icon-font', Iconfont)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
