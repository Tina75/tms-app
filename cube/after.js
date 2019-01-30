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
// 兼容性
clearAll(path.resolve(__dirname, '../public/cube'), true)
clearPath(path.resolve(__dirname, './static/dev'))
clearPath(path.resolve(__dirname, './static/prod'))
move(path.resolve(__dirname, './static/dev'), path.resolve(__dirname, '../public/dev/cube'))
move(path.resolve(__dirname, './static/prod'), path.resolve(__dirname, '../public/prod/cube'))
clearAll(path.resolve(__dirname, './static'), true)
console.info('---------完成--------')
function clearPath(current, mode) {
  // 合并打包出的cube-index到cube-chunk末尾
  const indexPath = path.resolve(current, 'cube-index.js')
  const chunkPath = path.resolve(current, 'cube-chunk.js')
  if (fs.existsSync(indexPath) && fs.existsSync(chunkPath)) {
    var indexData = fs.readFileSync(indexPath, 'utf-8')
    fs.appendFileSync(chunkPath, indexData, 'utf8', function(err) {
      if (err) {
        console.log(err)
      }
    })
    console.info('--------合并cube--------')
  }
  choseRemove(current)
}

function choseRemove(dir, deepCount = 0) {
  let files = []
  if (fs.existsSync(dir)) {
    files = fs.readdirSync(dir)
    files.forEach((file, index) => {
      let curPath = dir + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        if (!exculdeDir.includes(file) || deepCount > 0) {
          choseRemove(curPath, deepCount + 1) // 递归删除文件夹
        }
      } else {
        if (!exculdeFile.includes(file) || deepCount > 0) {
          fs.unlinkSync(curPath) // 删除文件
        }
      }
    })
    if (deepCount > 0) {
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

function move(from, to) {
  if (fs.existsSync(from)) {
    if (fs.existsSync(to)) {
      clearAll(to)
    } else {
      fs.mkdirSync(to)
    }
    copyFolder(from, to)
  }
}

function copyFolder(from, to) {
  let files = []
  files = fs.readdirSync(from)
  files.forEach(function(file, index) {
    var targetPath = from + '/' + file
    var toPath = to + '/' + file
    if (fs.statSync(targetPath).isDirectory()) {
      // 复制文件夹
      move(targetPath, toPath)
    } else {
      // 拷贝文件
      fs.copyFileSync(targetPath, toPath)
    }
  })
  clearAll(from)
}
