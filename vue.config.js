const webpack = require('webpack')
const useBundleAnalyzer = false
const proxyUrl = 'https://dev.tms5566.com/dolphin-app'
const config = {
  baseUrl: './',
  assetsDir: 'static',
  productionSourceMap: false,
  parallel: true,
  lintOnSave: undefined,
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
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

  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    progress: true,
    inline: true,
    proxy: {
      '/': {
        target: proxyUrl,
        ws: false,
        changOrigin: true
      }
    }
  },

  configureWebpack: {
    plugins: [
      new webpack.DllReferencePlugin({
        manifest: require('./public/dll/common.json')
      })
    ],
    externals: {
      BMap: 'BMap'
    },
    optimization: {
      splitChunks: {
        // node_modules中除city走线上,其他走本地common
        cacheGroups: {
          city: {
            test: /[\\/]node_modules[\\/]ydd_area/,
            name: 'ydd_area',
            chunks: 'all'
          }
        }
      }
    }
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
