import request from '@/utils/request'

export function deviceList() {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await request({
        url: '/api/base/deviceList',
        method: 'get',
      })
      resolve(Object.assign(res, {required: 'a', fn: 'carrier'}))
    } catch (e) {
      reject();
    }

  })
}//获取所有巷道a
export function carrier(deviceId) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await request({
        url: '/api/base/carrier/' + deviceId,
        method: 'get',
      })
      resolve(Object.assign(res, {required: 'b', fn: 'shelf'}))
    } catch (e) {
      reject();
    }

  })
}//根据巷道获取货架b
export function shelf(carrierId) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await request({
        url: '/api/base/shelf/' + carrierId,
        method: 'get',
      })
      resolve(Object.assign(res, {required: 'c', fn: 'locations'}))
    } catch (e) {
      reject();
    }

  })
}//根据货架获取层c
export function locations(shelfId) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await request({
        url: '/api/base/location/' + shelfId,
        method: 'get',
      })
      resolve(Object.assign(res, {required: 'd', fn: ''}))
    } catch (e) {
      reject();
    }

  })
}//根据层获取栏位d
