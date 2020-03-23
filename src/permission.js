import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

NProgress.configure({ showSpinner: false }) // NProgress Configuration
import Cookies from "js-cookie";

import md5 from 'js-md5';

const whiteList = ['/login', '/404','/redirect','/dailyPaper','/firstPage'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  let userName = Cookies.get('loginToken');

  if (userName === undefined && whiteList.indexOf(to.path) == -1) {  //  登录页面往其他页面跳转
    next({
      path: '/login'
    });
    NProgress.done() // 进度条
  } else {
    if (whiteList.indexOf(to.path) != -1) {
      next();
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => {
          store.dispatch('GenerateRoutes', res).then((paths) => { // 生成可访问的路由表
            paths.push({path: '*', redirect: '/404', hidden: true});
            // paths.push({path: '/redirect', redirect: '/redirect', hidden: true});
            localStorage.setItem('tokeng', store.getters.token);
            router.addRoutes(paths);
            next({...to, replace: true})
            NProgress.done() // 进度条
            // next();

          })
        });
      } else {
        next();
      }
    }
  }
})


router.afterEach(() => {
  NProgress.done() // 结束Progress
})
// const go=paths[0].id;
// this.dss=paths[0].path;
// if(go=='home'){
//   paths.push({path: '*', redirect: '/404', hidden: true});
//   // paths.push({path: '/redirect', redirect: '/redirect', hidden: true});
//   localStorage.setItem('tokeng', store.getters.token);
//   router.addRoutes(paths);
//   next({...to, replace: true})
// }else {
//   const to=paths;
//
//   paths.push({path: '*', redirect: '/404', hidden: true});
//   // paths.push({path: '/redirect', redirect: '/redirect', hidden: true});
//   localStorage.setItem('tokeng', store.getters.token);
//   router.addRoutes(paths);
//   next({...to, replace: true})
// }
