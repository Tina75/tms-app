const path = require('path')
const webpack = require('webpack')

const dlls = [
  'core-js',
  'vue',
  'vue-router',
  'vuex',
  'vue-meta',
  'vuex-router-sync',
  'vue-analytics',
  'vue-lazyload',
  'axios',
  'ali-oss',
  'dayjs',
  'number-precision'
]
// const polyfill = ['core-js']

module.exports = {
  entry: {
    common: dlls
    // polyfill
  },
  output: {
    path: path.resolve(__dirname, 'public/dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.js', '.json']
    // alias: {
    //     'vue$': 'vue/dist/vue.esm.js'
    // }
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'public/dll', '[name].json'),
      name: '[name]'
    })
  ]
}
