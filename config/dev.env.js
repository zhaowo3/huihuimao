'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //本地的
  BASE_API: '"http://192.168.1.43:8081/"',//公司
  // BASE_API: '"http://192.168.18.14:8081/"',//大连
  // BASE_API: '"http://127.0.0.1:8081/"',//本机
  // BASE_API: '"http://101.132.253.140:8081/"',//测试服务器
  //  BASE_API: '"http://172.30.106.86:8081/"',//金山
  //   BASE_API: '"http://172.30.14.88:8081/"',//金山
  changeOrigin: true, //跨域
  // BASE_API: '"http://192.168.1.151:8081/"'
})
