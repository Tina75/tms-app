const path = require('path')
const fs = require('fs');
const from = path.resolve(__dirname, './.env.cube')
const to = path.resolve(__dirname, '../.env.cube')
fs.readFile(from,"utf8",function(error,data){
  if(error){
      console.log(error);
      return false;
  }
  fs.writeFile(to,data,'utf8',function(error){
    if(error){
        console.log(error);
        return false;
    }
    console.info('....环境配置成功, 准备编译.....')
  })
})
