import 'babel-polyfill'
import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'
import '@/assets/fonts/iconfont.css'

import '@/styles/index.scss' // global css
import 'es6-promise/auto'
import App from './App'
import router from './router'
import store from './store'
import VueChatScroll from 'vue-chat-scroll'
Vue.prototype.$store = store;
import {Message} from 'element-ui';
import infiniteScroll from 'vue-infinite-scroll'
import Qs from 'qs'
import '@/icons' // icon
import '@/permission' // permission control
// import 'lib-flexible'
import FastClick from 'fastclick';
// import Print from 'vue-print-nb'
import Viewer from 'v-viewer'
import Print from '@/plugs/print'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer);
FastClick.attach(document.body);
Vue.prototype.$message = Message;
Vue.use(ElementUI, {locale})
Vue.use(VCharts)
Vue.use(infiniteScroll)
Vue.use(VueChatScroll);
// Vue.use(Print);
Vue.use(Print) // 注册
// Vue.use(JsBarcode);
Vue.prototype.Qs = Qs;


/**
 * 检测图片是否存在
 * @param url
 */
// let imageIsExist = function(url) {
//   return new Promise((resolve) => {
//     let img = new Image();
//     img.onload = function () {
//       if (this.complete == true){
//         resolve(true);
//         img = null;
//       }
//     }
//     img.onerror = function () {
//       resolve(false);
//       img = null;
//     }
//     img.src = url;
//   })
// }
// //全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
// Vue.directive('real-img', async function (el, binding) {//指令名称为：real-img
//   let imgURL = binding.value;//获取图片地址
//   if (imgURL) {
//     let exist = await imageIsExist(imgURL);
//     if (exist) {
//       el.setAttribute('src', imgURL);
//     }
//   }
// })
Viewer.setDefaults({
  Options: { "inline": false,"zIndex": 2031,"button": true, "navbar": false, "title": false, "toolbar": false, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});
import $ from 'jquery'
Vue.prototype.openFullScreen2 = function (){//changeData是函数名
  const loading = this.$loading({
    lock: true,
    text: '设备正在运行...',
    customClass:'openFullClass',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  setTimeout(() => {
    loading.close();
  }, 2000);
}
Vue.config.productionTip = false
// import md5 from 'js-md5';
// Vue.prototype.$md5 = md5;


//适配
window.onresize = setHtmlFontSize;

function setHtmlFontSize() {
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  const htmlDom = document.getElementsByTagName('html')[0];
  htmlDom.style.fontSize = htmlWidth / 10 + 'px';
};
setHtmlFontSize();

//设为30分鐘不动就退出
let lastTime = new Date().getTime();
let currentTime = new Date().getTime();
let timeOut = 30 * 60 * 1000; //设置超时时间： 30分

window.onload = function () {
  window.document.onmousedown = function () {
    localStorage.setItem("lastTime",new Date().getTime());
  }
};
function checkTimeout() {
  currentTime = new Date().getTime(); //更新当前时间
  lastTime = localStorage.getItem("lastTime");
  // console.log(currentTime - lastTime);
  // console.log(timeOut);
  if (currentTime - lastTime > timeOut) { //判断是否超时
    // console.log("超时");
    let url = window.location.href;
    let newUrl=url.match(/(\S*)#/)[1];

    window.open(newUrl + '#/login','_self');
  }
}

/* 定时器 间隔30秒检测是否长时间未操作页面 */
window.setInterval(checkTimeout, 30000);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
