import request from '@/utils/request'

export function baoList(params) {
  return request({
    url: '/api/statement/materialStat',
    method: 'get',
    params: params
  })
}

export function operationStat(params) {
  return request({
    url: '/api/statement/operationStat',
    method: 'get',
    params: params
  })
}

export function consumptionStat(params) {
  return request({
    url: '/api/statement/consumptionStat',
    method: 'get',
    params: params
  })
}


export function getOperationLogList(params) {
  return request({
    url: '/api/log/getOperationLogList?',
    method: 'get',
    params: params
  })
}
//日志
export function operationIndex(params) {
  return request({
    url: '/api/log/operationIndex?',
    method: 'get',
    params: params
  })
}
//日志菜单
export function operationUserList(params) {
  return request({
    url: '/api/user/userList',
    method: 'get',
    params: params
  })
}
//日志用户名下拉
export function inventoryPageList(params) {
  return request({
    url: '/api/inventory/inventoryPageList',
    method: 'get',
    params: params
  })
}
//报表盘库列表接口
export function inventoryChart(data) {
  return request({
    url: '/api/inventory/inventoryChart?' + data,
    method: 'get',
  })
}
//报表盘库右侧报表接口
export function stockPageList(params) {
  return request({
    url: '/api/stock/stockPageList',
    method: 'get',
    params: params
  })
}
//报表物资库存统计列表接口
export function stockChart(data) {
  return request({
    url: '/api/stock/stockChart?' + data,
    method: 'get',
  })
}
//报表物资库存统计右侧报表接口

