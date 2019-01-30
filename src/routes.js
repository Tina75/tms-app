// 自动注册views下所有路由
let routes = [{
  path: '/preview',
  name: 'image-preview',
  component: () => import(/* webpackChunkName: "odd" */'./components/Upload/ImagePreview.vue')
}]
const requireContext = require.context('./views', true, /router\.js/)
requireContext.keys().forEach((filePath) => {
  const routerConfig = requireContext(filePath)
  routes = routes.concat(routerConfig.default)
})
export default routes
