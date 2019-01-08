const path = require('path')
const webpack = require('webpack')

const dlls = ['vue', 'vue-router', 'vuex', 'vue-meta', 'vue-analytics', 'vue-lazyload', 'dayjs', 'axios']
const polyfill = ['core-js']

module.exports = {
  entry: {
    common: dlls,
    polyfill
  },
  output: {
    path: path.resolve(__dirname, 'public/dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  resolve: {
      modules: [path.resolve(__dirname, 'node_modules')],
      extensions: ['.js', '.json'],
      alias: {
          'vue$': 'vue/dist/vue.esm.js'
      }
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'public/dll', '[name].json'),
      name: '[name]'
    })
  ]
}
