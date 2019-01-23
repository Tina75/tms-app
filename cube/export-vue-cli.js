const path = require('path')
const fs = require('fs')
const to = path.resolve(__dirname, './vue-cli.config.json')

fs.writeFile(to, JSON.stringify(require('@vue/cli-service/webpack.config')), 'utf8', function(error) {
  if (error) {
    console.log(error)
    return false
  }
  console.info('....导出成功.....')
})
