import axios from 'axios'
import router from '@/router'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // 请求超时时间
})
service.defaults.withCredentials=true;

// request拦截器
service.interceptors.request.use(config => {

  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
//
// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const res = response.data;
    return res; //先不做拦截

  },
  error => {
    // switch (error.err.status) {
    //   case -1:
    //     //跳转登录
    //     this.$router.push({path: '/login'});
    //
    // }
    if(error.message==='timeout of 3600000ms exceeded'){
      router.push({path: '/login'})
    }
    // console.log('err' + error.message)// for debug
    Message({
      message: '已断开连接',
      type: 'error',
      duration: 1000,
    })
    return Promise.reject(error)
  }
)

export default service
