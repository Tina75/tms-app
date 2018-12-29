module.exports = {
  baseUrl: './',
  assetsDir: 'static',
  productionSourceMap: false,
  parallel: true,
  lintOnSave: undefined,

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
