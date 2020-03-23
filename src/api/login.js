import request from '@/utils/request'

export function login(username, pwd) {
  return new Promise((reslove, rejcet) => {

    request({
      url: '/api/user/login?username=' + username + '&pwd=' + pwd,
      method: 'post',
      // data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }).then(response => {
      reslove(response)
    }).catch(error => {
      rejcet(error);
    })
  })

}

// //读取用户菜单
export function getInfo(username, pwd) {
  return request({
    url: '/api/user/initMenu',
    method: 'get',
  })
}

//登出
export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'get',
  })
}
