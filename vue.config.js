const webpack = require('webpack')
const useBundleAnalyzer = true
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

  // devServer: {
  //   open: true,
  //   host: '0.0.0.0',
  //   port: 8080,
  //   progress: true,
  //   inline: true,
  //   proxy: {
  //     '/': {
  //       target: 'https://dev.yundada56.com/bluewhale-line/',
  //       ws: false,
  //       changOrigin: true
  //     }
  //   }
  // },

  configureWebpack: {
    plugins: [
      new webpack.DllReferencePlugin({
        // 描述 polyfill 动态链接库的文件内容
        manifest: require('./public/dll/polyfill.json')
      }),
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
