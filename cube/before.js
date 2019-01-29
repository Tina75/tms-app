const path = require('path')
const fs = require('fs')
// 动态的指定项目配置文件 cube
const devData = `
NODE_ENV = production
VUE_CLI_SERVICE_CONFIG_PATH = ${path.resolve(__dirname, '../')}/cube/vue.config.js
VUE_APP_STATUS = dev
`
fs.writeFile(path.resolve(__dirname, '../.env.cube'), devData, 'utf8', function(error) {
  if (error) {
    console.log(error)
    return false
  }
})

// 动态的指定项目配置文件 cube_prod
const prodData = `
NODE_ENV = production
VUE_CLI_SERVICE_CONFIG_PATH = ${path.resolve(__dirname, '../')}/cube/vue.config.js
VUE_APP_STATUS = prod
`
fs.writeFile(path.resolve(__dirname, '../.env.cube_prod'), prodData, 'utf8', function(error) {
  if (error) {
    console.log(error)
    return false
  }
})
