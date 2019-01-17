import OSS from 'ali-oss'
import server from '@/libs/server'

/** oss上传文件 */
export async function uploadOSS (base64Data) {
  let url
  try {
    let { ossKeys, ossTokenDTO } = await getOSSAccess()
    const client = new OSS({
      accessKeyId: ossTokenDTO.stsAccessId,
      accessKeySecret: ossTokenDTO.stsAccessKey,
      stsToken: ossTokenDTO.stsToken,
      endpoint: ossTokenDTO.endpoint,
      bucket: ossTokenDTO.bucketName
    })
    url = await uploadBase64Img(client, ossKeys[0], base64Data)
  } catch (e) {
    console.error(e)
  }
  return url
}

/** 预上传 获取OSS token */
function getOSSAccess (data) {
  return server({
    method: 'post',
    url: 'file/prepareUpload',
    data: { bizType: 'order', fileCount: 1, fileSuffix: '' }
  })
    .then(({ data }) => {
      return data.data
    })
    .catch((error) => {
      console.error('getOSSAccess', error)
    })
}

function uploadBase64Img (client, path, base) {
  // base64格式的内容
  const base64Content = base
  const filename = 'img.png'
  const imgfile = dataURLtoFile(base64Content, filename)
  console.info('uploadBase64Img', imgfile, path)
  // key表示上传的object key ,imgFile表示dataURLtoFile处理后返回的图片
  return client
    .multipartUpload(path, imgfile)
    .then((res) => {
      console.info('uploadBase64Img', res.name)
      return res.name
    })
    .catch((err) => {
      console.error('uploadBase64Img', err)
    })
}

function dataURLtoFile (dataurl, filename) {
  console.info('dataURLtoFile', dataurl, filename)
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime }) // if env support File, also can use Util: return new File([u8arr], filename, { type: mime });
}
