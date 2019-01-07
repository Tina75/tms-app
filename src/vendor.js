import '@babel/polyfill'
import 'ydd_area'
import Vue from 'vue'
import Cube from 'cube-ui'
import VueMeta from 'vue-meta'
import './plugins'

Vue.config.productionTip = false
Vue.use(VueMeta)
Vue.use(Cube)
