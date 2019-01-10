const path = require('path')
const fs = require('fs')
const from = path.resolve(__dirname, './.env.cube')
const to = path.resolve(__dirname, '../.env.cube')
// 动态的指定项目配置文件
const data = `
NODE_ENV = production
VUE_CLI_SERVICE_CONFIG_PATH = ${path.resolve(__dirname, '../')}/vue.cube.config.js
`
fs.writeFile(to, data, 'utf8', function(error) {
  if (error) {
    console.log(error)
    return false
  }
  console.info('....环境配置成功, 准备编译.....')
})
