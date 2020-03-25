import { login, logout,getInfo } from '@/api/login'
import { getToken, setToken, removeToken,setAccountToken,getAccountToken } from '@/utils/auth';
import {  asyncRouterMap,constantRouterMap } from '@/router/index.js';
import Vue from "../../main";
import router from '@/router'
import { Message} from 'element-ui'

import md5 from "js-md5";
import store from "../index";

function getPel(key) {
  for (let i = 0, l = asyncRouterMap.length; i < l; i++) {
  // for (let i = 0, item; item = asyncRouterMap[i++];) {
  // for(let i=0;i<asyncRouterMap.length;i++){
    let el=asyncRouterMap[i];
    if(el.id==key){
      return {el,index:i}
    }
  }
}
function hasPermission(roles, route) {
  for(let key in roles){
    let {el,index}= getPel(key);
    if (!roles[key].openStatus){
      route.splice(index,1);
    }else{
      for (let i = 0, l = el.children.length; i < l; i++) {
        if(roles[key].children.indexOf(el.children[i].id)==-1){
          el.children.splice(i,1);
        }
      }
    }
  }
  return route;
}

// function getIPs(callback){
//
//   let ip_dups = {};
//
//
//
//   //compatibility for firefox and chrome
//
//   let RTCPeerConnection = window.RTCPeerConnection
//
//     || window.mozRTCPeerConnection
//
//     || window.webkitRTCPeerConnection;
//
//
//
//   //bypass naive webrtc blocking
//
//   if (!RTCPeerConnection) {
//
//     let iframe = document.createElement('iframe');
//
//     //invalidate content script
//
//     iframe.sandbox = 'allow-same-origin';
//
//     iframe.style.display = 'none';
//
//     document.body.appendChild(iframe);
//
//     let win = iframe.contentWindow;
//
//     window.RTCPeerConnection = win.RTCPeerConnection;
//
//     window.mozRTCPeerConnection = win.mozRTCPeerConnection;
//
//     window.webkitRTCPeerConnection = win.webkitRTCPeerConnection;
//
//     RTCPeerConnection = window.RTCPeerConnection
//
//       || window.mozRTCPeerConnection
//
//       || window.webkitRTCPeerConnection;
//
//   }
//
//
//
//   //minimal requirements for data connection
//
//   let mediaConstraints = {
//
//     optional: [{RtpDataChannels: true}]
//
//   };
//
//
//
//   //firefox already has a default stun server in about:config
//
//   //    media.peerconnection.default_iceservers =
//
//   //    [{"url": "stun:stun.services.mozilla.com"}]
//
//   let servers = undefined;
//
//
//
//   //add same stun server for chrome
//
//   if(window.webkitRTCPeerConnection)
//
//     servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};
//
//
//
//   //construct a new RTCPeerConnection
//
//   let pc = new RTCPeerConnection(servers, mediaConstraints);
//
//
//
//   //listen for candidate events
//
//   pc.onicecandidate = function(ice){
//
//
//
//     //skip non-candidate events
//
//     if(ice.candidate){
//
//
//
//       //match just the IP address
//
//       let ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
//
//       let ip_addr = ip_regex.exec(ice.candidate.candidate)[1];
//
//
//
//       //remove duplicates
//
//       if(ip_dups[ip_addr] === undefined)
//
//         callback(ip_addr);
//
//
//
//       ip_dups[ip_addr] = true;
//
//     }
//
//   };
//
//
//
//   //create a bogus data channel
//
//   pc.createDataChannel("");
//
//
//
//   //create an offer sdp
//
//   pc.createOffer(function(result){
//
//
//
//     //trigger the stun server request
//
//     pc.setLocalDescription(result, function(){}, function(){});
//
//
//
//   }, function(){});
//
// }


const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    type:'',
    status:'',
    roles: [],
    Submenu:{},
    leftBotomRols:{},
    userHeader:{},
    // choices:'',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ATOKEN: (state, Atoken) => {
      state.Atoken = Atoken
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_TYPE: (state, type) => {
      state.type = type
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_SUBMENU:(state, Submenu)=>{
      state.Submenu=Submenu
    },
    SET_SECONDM:(state, Secondm)=>{
      state.Secondm=Secondm
    },
    // SET_CHOICES:(state, choices)=>{
    //   state.choices=choices
    // },
    SET_leftBotomRols:(state, roles)=>{
      state.leftBotomRols = roles
    },
    SET_USERINFO:(state,roles)=>{
      state.token=roles;
    },

  },

  actions: {
    GenerateRoutes({ commit ,state}, data) {
      return new Promise(resolve => {
        const accessedRouters=hasPermission(data.roles,asyncRouterMap);
        commit('SET_ROLES',accessedRouters);
        commit('SET_leftBotomRols',data.secondary);
        commit('SET_USERINFO',state.token);
        resolve( Object.create(accessedRouters));
        //   let g=accessedRouters[0].path;
        // if(data.roles.home.openStatus==false){
        //    this.router.push({path:g });
        // }
      })
    },
    // 登录const getData
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        const pwds=md5(userInfo.pwd);
        login(username, pwds).then(res => {
          if(res.code==1){
            const cloneRes=JSON.parse(JSON.stringify(res));
            delete  cloneRes.msg;
            const { data } = res;
            setAccountToken(res.data.name);
            commit('SET_TOKEN', data);
            setToken(res.data);
            // localStorage.setItem('tokeng', res.data);
            commit('SET_USERINFO',res.data);
            resolve()
          }else{
            Message({
              message: res.msg,
              type: 'error',
              duration:  1000
            })
            reject()
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    // 获取用户界面信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data;
          if (data.main &&Object.keys(data.main).length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_USERINFO',state.token);
            commit('SET_ROLES', data.main);
            commit('SET_SUBMENU', data.main);
            commit('SET_SECONDM', data.secondary);
            // commit('SET_CHOICES', true);

          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          resolve({
            roles:data.main,
            secondary:data.secondary
          })
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          // commit('SET_NAME', '');
          // commit('SET_TYPE', '');
          commit('SET_ROLES', []);
          commit('SET_USERINFO',{});
          removeToken();
          sessionStorage.removeItem('dataL');
          sessionStorage.removeItem('dataO');
          sessionStorage.removeItem('dataN');
          sessionStorage.removeItem('dataQ');
          localStorage.removeItem('tokeng');
          resolve();
        })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
