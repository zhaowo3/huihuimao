import request from '@/utils/request'
export function policy() {
  return request({
    url:'/aliyun/oss/policy',
    method:'get',
  })
}
export function fileUpload(id,fileobj) {
  let param = new FormData();
  param.append('imagefile',fileobj.file)
  return request({
    method: 'post',
    url: '/api/file/upload/'+id,
    headers: {'Content-Type':'multipart/form-data'},
    data: param,
    // responseType: 'blob'
  })
}//上传文件
export function fileUploadH(id,fileobj) {
  let param = new FormData();
  param.append('imagefile',fileobj)
  return request({
    method: 'post',
    url: '/api/file/upload/'+id,
    headers: {'Content-Type':'multipart/form-data'},
    data: param,
    // responseType: 'blob'
  })
}//上传文件
export function fileImport(fileobj) {
  let param = new FormData();
  param.append('file',fileobj.file)
  return request({
    method: 'post',
    url: '/api/file/importMaterialDetail',
    headers: {'Content-Type':'multipart/form-data'},
    data: param,
    // responseType: 'blob'
  })
}//物资导入

export function importMaterial(fileobj) {
  let param = new FormData();
  param.append('file',fileobj.file)
  return request({
    method: 'post',
    url: '/api/file/importMaterial',
    headers: {'Content-Type':'multipart/form-data'},
    data: param,
    // responseType: 'blob'
  })
}//物资导入

export function importOperation(fileobj) {
  let param = new FormData();
  param.append('file',fileobj.file)
  return request({
    method: 'post',
    url: '/api/file/importOperation',
    headers: {'Content-Type':'multipart/form-data'},
    data: param,
    // responseType: 'blob'
  })
}//导入文件
export function importOrder(fileobj) {
  let param = new FormData();
  param.append('file',fileobj.file);
  return request({
    method: 'post',
    url: '/api/file/importOrder',
    headers: {'Content-Type':'multipart/form-data'},
    data: param,
    // responseType: 'blob'
  })
}//导入文件


