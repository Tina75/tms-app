const path = require('path')
const fs = require('fs');
const current = path.resolve(__dirname, '../public/cube')
const env = path.resolve(__dirname, '../.env.cube')
const exculdeFile = ['cube-index.js', 'cube-chunk.js']
const exculdeDir = ['fonts', 'css']
console.info('.....正在收尾....')
delDir(current)
if(fs.existsSync(env)){
  fs.unlinkSync(env)
}
function delDir(dir, isDeep){
  let files = [];
  if(fs.existsSync(dir)){
      files = fs.readdirSync(dir);
      files.forEach((file, index) => {
          let curPath = dir + "/" + file;
          if(fs.statSync(curPath).isDirectory()){
            if (!exculdeDir.includes(file)){
              delDir(curPath, true); //递归删除文件夹
            }
          } else {
            if (!exculdeFile.includes(file)){
              fs.unlinkSync(curPath); //删除文件
            }
          }
      });
      if (isDeep){
        fs.rmdirSync(dir);
        console.info('.....收尾结束....')
      }
  }
}
