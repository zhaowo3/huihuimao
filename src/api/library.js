import request from '@/utils/request'

export function enterL(params) {
  return request({
    url: '/api/material/in',
    method: 'post',
    params: params
  })
}//临时存

export function inquiry(params) {
  return request({
    url: '/api/material/page',
    method: 'get',
    params: params
  })
}//获取物资目录
export function enterLout(params) {
  return request({
    url: '/api/material/out',
    method: 'post',
    params: params
  })
}//获取临时取
export function orderEnterL(params) {
  return request({
    url: '/api/order/out',
    method: 'post',
    params: params
  })
}//订单扫码取
export function orderRu(params) {
  return request({
    url: '/api/order/in',
    method: 'post',
    params: params
  })
}//订单扫码入
export function returnS(params) {
  return request({
    url: '/api/order/return/',
    method: 'post',
    params: params,
  })
}//订单扫码退
export function settleS(params) {
  return request({
    url: '/api/order/settle/',
    method: 'post',
    params: params,
  })
}//订单扫码退
export function addDateS(params) {
  return request({
    url: '/api/material/addValidDate',
    method: 'post',
    params: params,
  })
}//订单扫码退
