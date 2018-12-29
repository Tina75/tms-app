import modules from './store.js'
import store from '@/store'

export default[
  {
    path: '/odd/list/:id',
    name: 'odd-list',
    component: () => import(/* webpackChunkName: "odd" */'./pages/list.vue')
  },
  {
    path: '/odd/upload/:id',
    name: 'odd-upload',
    component: () => import(/* webpackChunkName: "odd" */'./pages/upload.vue')
  },
  {
    path: '/odd/preview',
    name: 'image-preview',
    component: () => import(/* webpackChunkName: "odd" */'./pages/ImagePreview.vue')
  }
]
store.registerModule('odd', { ...modules })
