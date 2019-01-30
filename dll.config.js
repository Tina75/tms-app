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
  'number-precision',
  'vue-clipboard2'
]
// const polyfill = ['core-js']
const index = process.argv.indexOf('--mode')
const mode = process.argv[index + 1]
const distName = mode === 'production' ? 'prod' : 'dev'
module.exports = {
  entry: {
    common: dlls
  },
  output: {
    path: path.resolve(__dirname, `public/${distName}/dll`),
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
      path: path.resolve(__dirname, `public/${distName}/dll`, '[name].json'),
      name: '[name]'
    })
  ]
}
