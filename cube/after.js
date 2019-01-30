const path = require('path')
const fs = require('fs')
const envs = [path.resolve(__dirname, '../.env.cube'), path.resolve(__dirname, '../.env.cube_prod')]
const exculdeFile = ['cube-chunk.js']
const exculdeDir = ['fonts', 'css']
console.info('.....正在收尾....')
envs.forEach((filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
})

clearPath(path.resolve(__dirname, '../public/dev/cube'))
clearPath(path.resolve(__dirname, '../public/prod/cube'))

function clearPath(current, mode) {
  // 合并打包出的cube-index到cube-chunk末尾
  const indexPath = path.resolve(current, 'cube-index.js')
  const chunkPath = path.resolve(current, 'cube-chunk.js')
  if (fs.existsSync(indexPath) && fs.existsSync(chunkPath)) {
    var indexData = fs.readFileSync(indexPath, 'utf-8')
    fs.appendFile(chunkPath, indexData, 'utf8', function(err) {
      if (err) {
        console.log(err)
      }
    })
  }
  delDir(current)
}

function delDir(dir, isDeep, allDel) {
  let files = []
  if (fs.existsSync(dir)) {
    files = fs.readdirSync(dir)
    files.forEach((file, index) => {
      let curPath = dir + '/' + file
      allDel = allDel || (['dev', 'prod', 'cube'].includes(file) && isDeep)
      if (fs.statSync(curPath).isDirectory()) {
        if (!exculdeDir.includes(file) || allDel) {
          delDir(curPath, true, allDel) // 递归删除文件夹
        }
      } else {
        if (!exculdeFile.includes(file) || allDel) {
          fs.unlinkSync(curPath) // 删除文件
        }
      }
    })
    if (isDeep) {
      fs.rmdirSync(dir)
    }
  }
}
