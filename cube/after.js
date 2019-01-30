const path = require('path')
const fs = require('fs')
const stat = fs.stat
const envs = [path.resolve(__dirname, '../.env.cube'), path.resolve(__dirname, '../.env.cube_prod')]
const exculdeFile = ['cube-chunk.js']
const exculdeDir = ['fonts', 'css']

envs.forEach((filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
})
clearPath(path.resolve(__dirname, './static/dev'))
clearPath(path.resolve(__dirname, './static/prod'))
copyFolder(path.resolve(__dirname, './static/dev'), path.resolve(__dirname, '../public/dev/cube'))
copyFolder(path.resolve(__dirname, './static/prod'), path.resolve(__dirname, '../public/prod/cube'))
clearAll(path.resolve(__dirname, './static'))
console.info('---------完成--------')
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
  choseRemove(current)
}

function choseRemove(dir, isDeep, allDel) {
  let files = []
  if (fs.existsSync(dir)) {
    files = fs.readdirSync(dir)
    files.forEach((file, index) => {
      let curPath = dir + '/' + file
      allDel = allDel || (['dev', 'prod', 'cube'].includes(file) && isDeep)
      if (fs.statSync(curPath).isDirectory()) {
        if (!exculdeDir.includes(file) || allDel) {
          choseRemove(curPath, true, allDel) // 递归删除文件夹
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

function clearAll(dir, removed) {
  let files = []
  if (fs.existsSync(dir)) {
    files = fs.readdirSync(dir)
    files.forEach((file, index) => {
      let curPath = dir + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        clearAll(curPath, true)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    if (removed) {
      fs.rmdirSync(dir)
    }
  }
}

function copyFolder(from, to) {
  // 复制文件夹到指定目录
  if (fs.existsSync(from)) {
    let files = []
    if (fs.existsSync(to)) {
      // 文件是否存在 如果不存在则创建
      files = fs.readdirSync(from)
      files.forEach(function(file, index) {
        var targetPath = from + '/' + file
        var toPath = to + '/' + file
        if (fs.statSync(targetPath).isDirectory()) {
          // 复制文件夹
          copyFolder(targetPath, toPath)
        } else {
          // 拷贝文件
          fs.copyFileSync(targetPath, toPath)
        }
      })
    } else {
      fs.mkdirSync(to)
      copyFolder(from, to)
    }
  }
}
