import request from '@/utils/request'

export function quantityWarn(params) {
  return request({
    url: '/api/material/quantityWarn',
    method: 'get',
    params: params
  })
}

export function databaseli(params) {
  return request({
    url: '/api/material/stockList',
    method: 'get',
    params: params
  })
}

export function expirationList(params) {
  return request({
    url: '/api/material/expirationList',
    method: 'get',
    params: params
  })
}

export function catalogs(params) {
  return request({
    url: '/api/material/page',
    method: 'get',
    params: params
  })
}
// export function catalogs(params) {
//   return request({
//     url: '/api/material/herpPage',
//     method: 'get',
//     params: params
//   })
// }
export function catalget(id) {
  return request({
    url: `/api/material/get/${id}`,
    method: 'get',
  })
}
export function getHerp(id) {
  return request({
    url: `/api/material/getHerp/${id}`,
    method: 'get',
  })
}
export function tmpD() {
  return request({
    url: `/api/file/download/`,
    method: 'get',

    responseType: 'blob',  //二进制流
  })
}
export function noCodeOutIn(params) {
  return request({
    url: '/api/material/noCodeOutIn',
    method: 'post',
    params: params
  })
}//盘库核实
export function stockO(params) {
  return request({
    url: '/api/material/stock',
    method: 'post',
    params: params
  })
}//盘库核实
export function updateMaterial(params) {
  return request({
    url: '/api/material/update',
    method: 'post',
    params: params
  })
}//修改物资
export function newLocation(params) {
  return request({
    url: '/api/material/newLocation',
    method: 'post',
    params: params
  })
}//修改库位
export function updateLocation(params) {
  return request({
    url: '/api/material/updateLocation',
    method: 'post',
    params: params
  })
}//修改库位deviceList
export function deviceList() {
  return request({
    url: '/api/base/deviceList',
    method: 'get',
  })
}//库位选择
export function materialAdds(params) {
  return request({
    url: 'api/material/add',
    method: 'post',
    params: params
  })
}//添加新物资

//配送单订单
export function distributions(params) {
  return request({
    url: '/api/material/deliveryPage?',
    method: 'get',
    params: params
  })
}
//配送单详情
export function getDelivery(id) {
  return request({
    url: `/api/material/getDelivery/${id}`,
    method: 'get',
  })
}
//配送单查找库位 返回的物资列表有库位，如果返回的只有一条数据就直接调用打开库位的接口
export function queryBarcode(id) {
  return request({
    url: `/api/material/queryBarcode/${id}`,
    method: 'get',
  })
}
//配送单入库
export function deliveryConfirm(params) {
  return request({
    url: '/api/material/deliveryConfirm',
    method: 'post',
    params: params
  })
}
//配送单出库
export function materialReturnHerp(params) {
  return request({
    url: '/api/material/materialReturnHerp',
    method: 'post',
    params: params
  })
}
//删除物资
export function deleteMaterial(params) {
  return request({
    url: `/api/material/deleteMaterial`,
    method: 'get',
    params: params
  })
}
//获取未使用的库位
export function useLocation(params) {
  return request({
    url: `/api/base/useLocation?`,
    method: 'get',
    params: params
  })
}
//一物一码详情
export function quantityDetail(params) {
  return request({
    url: `/api/material/quantityDetail?`,
    method: 'get',
    params: params
  })
}
//搜索
export function quantitylogPage(params) {
  return request({
    url: `/api/material/logPage?`,
    method: 'get',
    params: params
  })
}
//物资记录
