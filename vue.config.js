const webpack = require('webpack')
const useBundleAnalyzer = false // 是否开启打包分析
const proxyUrl = 'https://dev.tms5566.com/dolphin-app'
const dllMap = `./public/${process.env.VUE_APP_STATUS !== 'local' ? 'prod' : 'dev'}/dll/common.json`
let i = 0
const config = {
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: false,
  parallel: true,
  lintOnSave: undefined,
  chainWebpack: (config) => {
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
        manifest: require(dllMap)
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
          },
          components: {
            test: /[\\/]src[\\/]components[\\/]/,
            name: 'common_components',
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
  const Util = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new Util())
}
module.exports = config
