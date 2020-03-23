import request from '@/utils/request'

export function installLs() {
  return request({
    url: `/api/user/permissions`,
    method: 'get',
  })
}

export function updatePermissions(data) {
  return request({
    url: `/api/user/updatePermissions`,
    method: 'POST',
    data: data
  })
}

export function openL(location) {
  return request({
    url: `/api/base/open/` + location,
    method: 'POST',
  })
}//开门
export function closeL(location) {
  return request({
    url: `/api/base/close/` + location,
    method: 'POST',
  })
}//关门
export function searchS(data) {
  return request({
    url: `/api/search/?${data}`,
    method: 'get',

  })
}//全局搜索

export function searchPage(data) {
  return request({
    url: `/api/material/page?${data}`,
    method: 'get',

  })
}//物资搜索

export function herpPage(data) {
  return request({
    url: `/api/material/herpPage?${data}`,
    method: 'get',

  })
}//物资搜索

export function searchQuantityWarn(data) {
  return request({
    url: `/api/material/quantityWarn?${data}`,
    method: 'get',

  })
}//预警搜索

export function searchStockList(data) {
  return request({
    url: `/api/material/stockList?${data}`,
    method: 'get',

  })
}//盘库搜索

export function searchExpirationList(data) {
  return request({
    url: `/api/material/expirationList?${data}`,
    method: 'get',

  })
}//效期搜索

export function submenuMenuId(data) {
  return request({
    url: `/api/user/submenu?menuId=${data}`,
    method: 'get',

  })
}//控制子菜单

export function changePassword(data) {
  return request({
    url: `/api/user/editUser`,
    method: 'POST',
    data:data,
  })
}//修改密码

export function delUser(data) {
  return request({
    url: `/api/user/delUser`,
    method: 'POST',
    data:data,
  })
}//删除用户
export function employeeList(data) {
  return request({
    url: `/api/user/employeeList`,
    method: 'get',
  })
}//删除用户

export function recordInventory(data) {
  return request({
    url: '/api/inventory/recordInventory?' + data,
    method: 'get',
  })
}
//核实完毕
export function LibraryDisplay(data) {
  return request({
    url: '/api/material/position?' + data,
    method: 'get',
  })
}
//库位展示
