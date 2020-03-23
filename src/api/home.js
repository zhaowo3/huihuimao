import request from '@/utils/request'

export function orderLists(pageSize) {
  return request({
    url: `/api/order/getOrderInfoVo/${pageSize}`,
    method: 'get',
  })
}
//5分钟刷新
export function synchOrder() {
  return request({
    url: `/api/order/synchOrder`,
    method: 'get',
  })
}
export function pageList(param) {
  return request({
    url: `/api/order/pageList/`,
    method: 'get',
    params: param,
  })
}

export function orderNun(orderNumber) {
  return request({
    url: '/api/order/${orderNumber}',
    method: 'get',
  })
}

export function prepareOrder(orderNumber) {
  return request({
    url: '/api/order/prepareOrder/' + orderNumber,
    method: 'get',
  })
}

export function template(templateId) {
  return request({
    url: '/api/order/template?' + templateId,
    method: 'get',
  })
}

export function detailns(orderNumber) {
  return request({
    url: '/api/order/detail/' + orderNumber,
    method: 'get',
  })
}


export function getsearch(param) {
  return request({
    url: '/api/order/pageList/',
    method: 'get',
    params: param,
  })
}

export function orderBrand(data) {
  return request({
    url: '/api/order',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;',
    },
  })
}

//退货
export function addMaterial(data) {
  return request({
    url: '/api/order/addMaterial?' + data,
    method: 'post',
  })
}

//无模板添加物资
export function againOrder(data) {
  return request({
    url: '/api/order/againOrder?' + data,
    method: 'post',
  })
}

//无模板添加物资
export function orderDelete(data) {
  return request({
    url: '/api/order/delete?'+data,
    method: 'post',
  })
}

//无模板删除物资
export function importHistory(data) {
  return request({
    url: '/api/order/importHistory',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;',
    },
  })
}

//无模板删除物资
//模板列表
export function operationPage(param) {
  return request({
    url: '/api/template/operationPage',
    method: 'get',
    params: param,

  })
}
//模板详情
export function infoinfo(param) {
  return request({
    url: '/api/template/info',
    method: 'get',
    params: param,
  })
}
//无模板添加物资
export function addTemplateMaterial(data) {
  return request({
    url: '/api/template/addTemplateMaterial?' + data,
    method: 'post',
  })
}

//无模板删除物资
export function deleteTemplateMaterial(param) {
  return request({
    url: '/api/template/deleteTemplateMaterial',
    method: 'get',
    params: param,
  })
}
export function deleteOperation(id) {
  return request({
    url: '/api/template/deleteOperation/'+id,
    method: 'get',
  })
}
export function updateTemplateMaterial(data) {
  return request({
    url: '/api/template/updateTemplateMaterial?'+data,
    method: 'post',
  })
}

//无模板添加手术名称
export function addOperation(data) {
  return request({
    url: '/api/template/addOperation?'+data,
    method: 'post',
  })
}
//获取手术房间
export function queryOperationRoom(data) {
  return request({
    url: '/api/order/queryOperationRoom?'+data,
    method: 'get',
  })
}
