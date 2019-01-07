const webpack =require('webpack')
const useBundleAnalyzer = true

const config = {
  baseUrl: './',
  assetsDir: 'static',
  productionSourceMap: false,
  parallel: true,
  lintOnSave: undefined,

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

  configureWebpack: {
    externals: {
      BMap: 'BMap'
    },
    output: {
      chunkFilename: '[name].js'
    },
    optimization: {
      splitChunks: {
        // node_modules中除city走线上,其他走本地common
        cacheGroups: {
          city: {
            test: /[\\/]node_modules[\\/]ydd_area/,
            name: 'ydd_area.js',
            chunks: 'all'
          },
          // alioss: {
          //   test: /[\\/]node_modules[\\/]ali-oss/,
          //   name: 'oss~vendor',
          //   chunks: 'all'
          // }
          node: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name: 'common~vendor',
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
