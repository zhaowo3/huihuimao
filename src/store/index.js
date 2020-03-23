import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
// import permission from './modules/permission'
import getters from './getters'


Vue.use(Vuex);
const state = {
  showBottomNav: false,
  hideBottomNav: false,
  showBottomOk: false,
  entryGlobal:[],
  outputGlobal:[],
  choices:'',
  audio:null,
  whetherTest:true, //是否测试 是:true 否false
  LibraryLo:'',
  recordPrevious:1,
  adminIp:'',
  // networkSuccess: true //是否断网
};
const store = new Vuex.Store({
  modules: {
    app,
    user,
    // permission
  },
  getters,
  state,
})

export default store
