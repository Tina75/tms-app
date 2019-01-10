const webpack = require('webpack')
const useBundleAnalyzer = false // 是否开启打包分析
const config = {
  baseUrl: './',
  assetsDir: '',
  outputDir: 'public/cube',
  productionSourceMap: false,
  parallel: true,
  lintOnSave: undefined,
  // 去掉文件名中的 hash
  filenameHashing: false,
   // 删除 HTML 相关的 webpack 插件
  chainWebpack: config => {
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: ['./src/assets/style/theme']
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },

  pages: {
    index: {
      // page 的入口
      entry: 'cube/entry.js'
    }
  },

  configureWebpack: {
    output: {
      filename: 'cube-index.js',
      chunkFilename: 'cube-chunk.js'
    },
    plugins: [
      new webpack.DllReferencePlugin({
        manifest: require('./public/dll/common.json')
      })
    ]
  }
}

const webpackConfig = config.configureWebpack
// 打包分析
if (useBundleAnalyzer) {
  webpackConfig.plugins = webpackConfig.plugins || []
  const util = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new util())
}

module.exports = config
