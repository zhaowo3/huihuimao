<template>
  <div style="height: 100%;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <el-button type="primary" class="trayClose" id="hamburger-closeL" @click="closeTray" v-if="operation==1">关闭托盘</el-button>
<!--        <el-button type="primary" class="trayClose colorsGreen">打开托盘</el-button>-->
        <div class="autoSeach" id="hamburger-searcts">
          <el-input v-model="searchtxt" @keyup.enter.native="queryClick(searchtxt)" class="inputs1" placeholder="请输入关键字" clearable>
            <i class="iconfont icon-icon-test35" @click="queryClick(searchtxt)" slot="suffix"></i>
          </el-input>
        </div>

      </div>
    </div>
    <el-container style="height: 100%;">
    <el-header class="effectiveHead" style="height: auto;">
      <el-row class="effectiveLie" id="hamburger-tabTimes">
        <el-button v-for="(data,index1) in leftInfo.datas" :key="index1" :class="index1==cur?'hit':''" @click="infoViews(data.type,index1)">{{data.name}}</el-button>
      </el-row>

    </el-header>

      <el-main  style="padding-top: 5px;">
        <el-row :gutter="20"  class="templateRight" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                infinite-scroll-distance="10">
            <div id="leftBox" style="padding-top: 2px" >
              <ul>
                <li v-for="(news,index) in leftInfo.houseList" :key="index" :class="{'prohibit':operation==0}" >
                  <el-col :span="12">
                    <el-row class="templateLis">
                      <div class="templateHover" @click="openTray(news)">
                        <div class="templateImg">
                          <el-image :src="news.imgUrl">
                            <div slot="error" class="image-slot">
                              <svg-icon icon-class="gen" style="height: 100%;cursor: pointer;width: 100%;float:left;"
                                        class="color-main"></svg-icon>
                            </div>
                            <div slot="placeholder" class="image-slot">
                              <svg-icon icon-class="gen" style="height: 100%;cursor: pointer;width: 100%;float:left;"
                                        class="color-main"></svg-icon>

                            </div>

                          </el-image>
                          <i class="iconfont icon-mianma-" v-if="news.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i><i class="iconfont icon-yiwuyima" v-if="news.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i>
                        </div>
                        <el-card class="templateR templateHeight">
                          <div style="position: relative; height: 100%;display: flex;width: 100%;">
                            <el-col :span="18" style='position: relative;height: 100%;'>
                              <h4 :title="news.name">{{news.name}}</h4>
                              <h4 :title="news.alias">{{news.alias}}</h4>
                              <span class="templateTitle">{{news.size}}</span>
                              <h3>{{news.hisCode}}</h3>
                              <div class="leftHightS">
                                <span class="templateSpan"><b>库位:</b><p>{{news.location}}</p></span>

                              </div>

                            </el-col>
                            <el-col :span="6" style='position: relative;height: 100%;'>
                              <div class="templateTime"><b>{{news.dif}}天</b><p>剩余:</p><span >{{news.time}}</span></div>
                              <p class="templateP">{{news.supplyQuantity}}({{news.bigUnitDesc}})</p>
                              <el-button class="templateButton" v-if="news.type==1">包</el-button>

                            </el-col>

                          </div>



                        </el-card>
                      </div>
                    </el-row>
                  </el-col>

                </li>
                <li style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px; float: left;" v-show="droping">加载中</li>
                <li style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px;float: left;" v-show="noMore">没有更多的数据</li>
              </ul>
            </div>
        </el-row>
      </el-main>

  </el-container>

    <el-dialog title="无码出库" :visible.sync="dialogTableNoCode" :before-close="NoHandleClose"
               custom-class="el-dialog__header-custom dialoVisible dialogTableNoCode" center width="70%">
      <div style="display: flex;">
        <div style="flex: 2">
          <p class="textes">{{dataStas.name}},{{dataStas.location}}</p>
          <div class="crumbHight" v-if="dataStas.codeType==2||dataStas.codeType==3">
            <el-input-number v-model="num1" :min="1" :max="dataStas.supplyQuantity"   label="输入数字" style="width: 60%;height: auto;margin-bottom: 10px"></el-input-number>
          </div>
        </div>
        <div style="flex: 1">
          <LibraryDisplay :lots="dataStas.location" ref="child"></LibraryDisplay>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
           <el-button @click="dialogTableNoCode = false">取 消</el-button>
        <el-button type="primary" @click="NoCodeOk(dataStas)">确 定</el-button>
  </span>

    </el-dialog>
    <el-dialog title="请扫码" :visible.sync="dialogTableVisible" :modal="true" :before-close="handleClose"
               custom-class="el-dialog__header-custom dialoVisible" width="70%">
      <div style="display: flex;">
        <div style="flex: 3">
          <div class="carouselLS">
            <div class="carouselLeft">
              <el-image :src="dataStas.imgUrl">
                <div slot="error" class="image-slot">
                  <img alt="" :src="smalls" >
                </div>
                <div slot="placeholder" class="image-slot">
                  <img alt="" :src="smalls" >
                </div>
              </el-image>
            </div>
            <div class="carouselRight">
              <p class="textes">{{dataStas.name}},{{dataStas.alias}}</p>
              <p class="textesH">{{dataStas.size}}</p>
              <p class="textes">库位：{{dataStas.location}}</p>
              <div class="crumbHight" >
                <el-input-number v-model="num1" :min="1"  :max="dataStas.supplyQuantity"   label="输入数字" style="width: 60%;height: auto;margin-bottom: 10px"></el-input-number>
              </div>
              <el-input v-model="inputSweep" ref='gain' autofocus="autofocus" @keyup.enter="enterL" class="cumens"
                        placeholder="物资编码">
                <i slot="suffix" class="iconfont icon-icon-test46" @click="enterL"></i>
              </el-input>

              <div class="libraryGrade">
                <el-checkbox v-model="dataStas.isHerp"  v-if="oneStorehouse==1" true-label="1" false-label="0">退至一级库</el-checkbox>
              </div>
            </div>
          </div>

        </div>
        <div style="flex: 2">
          <LibraryDisplay :lots="dataStas.location" ref="child"></LibraryDisplay>
        </div>
      </div>


      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>

<script>
  let speechSU = new window.SpeechSynthesisUtterance();
  import smalls from '@/assets/images/small.jpg';
  import LibraryDisplay from '@/components/LibraryDisplay'
  import {
    expirationList,catalogs,noCodeOutIn
  } from '@/api/material'
  import {
    enterLout,enterL
  } from '@/api/library'
  import {debounce} from '@/utils/debounce';
  import {
    openL,closeL,searchExpirationList,submenuMenuId
  } from '@/api/systemsL'
    export default {
        name: "Effective",
        components: {
            LibraryDisplay
        },
      data() {
        return {
            h:0,//定义时，分，秒，毫秒并初始化为0；
            m:0,
            ms:0,
            s:0,
            time:0,
            str:'',
            mytime:'',
            sumTimes:0,
          activeName: 'second',
          cur:0,
          leftInfo:{
            isFinsh:false,  //是否完成加载
            listLoading: false,
            loading:false,
            houseNum:'',
            houseList:[],

            searchHouse:{
              pageSize:10,
              pageNumber:0,
              keyWords:'',
              type:1,
            },

            datas:[
              {type:1,name:'已过期'},
              {type:2,name:'余1天'},
              {type:3,name:'余3天'},
              {type:4,name:'余7天'}
            ],
          },
          houseList1:[],
          searchHouse1:{
            pageSize:10,
            pageNumber:0,
            keyWords:'',
          },
          dialogTableVisible: false,
            dialogTableNoCode:false,
          inputSweep:'',
          kuKun:'',
          dataStas:'',
            curID:1,
            num1:1,
          busy:false,
          busy1:false,
          lansen: '',
          droping : false,
          noMore : false,
          ishidden:false,
          danViews: {},
          danViewsLoadding:false,
          searchtxt:'',
          smalls,
          operation:'',
            oneStorehouse:'',
        };
      },


      watch: {
        // searchtxt: function (val) {
        //   let timer = 0;
        //   clearTimeout(timer);
        //   timer = setTimeout(() => {
        //     this.queryClick(val);
        //   }, 1000)
        // },
      },
      created(){
        if(this.$route.params.inputNO!==undefined){
          this.searchtxt=this.$route.params.inputNO;
          this.queryClick(this.$route.params.inputNO);
        }
        this.$watch('searchtxt', debounce((newQuery) => {
          this.queryClick(newQuery);
        }, 1000));
        this.$watch('inputSweep', debounce((newQuery) => {
          if (newQuery == "") {
            // this.houseList1 = [];
            // this.mainShow1 = true;
            return
          }else {
            this.enterL();
          }
        }, 2000));
        this.submenuMenuId();
      },
      mounted(){
      },
      methods: {
        //关闭
        closeTray() {
            this.lansen = this.$store.state.LibraryLo;
          if (this.lansen == '') {
            this.$message({
              type: 'error',
              message: '请输入库位'
            });
            return false;
          }
          closeL(this.lansen).then(response => {
              this.$store.state.recordPrevious=0;
              this.openFullScreen2();
            if(response.code !=='1'){
              this.$message({
                message: response.msg,
                type: 'error',
              });
              return
            }
            this.$message({
              type: 'success',
              message: response.msg
            });
            return false;
          }).catch(err => {
            this.$message({
              type: 'error',
              message: err.msg
            });
            return false;
          })
        },
        //首页加载权限
        submenuMenuId() {
          let mv=this;
          submenuMenuId(mv.$store.state.user.Secondm.management.id).then(response => {
            if(response.code !=='1'){
              this.$message({
                message: response.msg,
                type: 'error',
              });
              return
            }
            let res=response.data;
            // mv.jurisdiction = response.data;
            if(res[0].children=='operation'){
              mv.operation=res[0].ststus;
            }
            if(res[1].children=='oneStorehouse'){
                mv.oneStorehouse=res[1].ststus;
            }

          });
        },
        enterL() {
          let mv = this;
          if (mv.inputSweep == '') {
            return;
          }
          // if (this.dataStas.barcode == mv.inputSweep.toString().toUpperCase().substring(0, 4)||this.dataStas.hisCode == mv.inputSweep) {
            // this.$confirm('是否进行出库操作?', '提示', {
            //   confirmButtonText: '确定',
            //   cancelButtonText: '取消',
            //   type: 'warning'
            // }).then(() => {
              mv.kuKun=this.$store.state.LibraryLo;
              enterLout({
                barCode: mv.inputSweep,
                location: mv.dataStas.location,
                  number:mv.num1,
                  codeType:mv.dataStas.codeType,
                  barcodeSize:mv.dataStas.barcodeSize,
                  isHerp:mv.dataStas.isHerp,
                  bcode:mv.dataStas.barcode,
              }).then(res => {
                  // if (res.code !== '1' && res.msg == '请选择库位') {
                  //     this.gridData = res.data;
                  //
                  //     this.dialogTableVisible = true;
                  //
                  // } else
                  if (res.code !== '1') {
                  this.$message({
                    message: res.msg,
                    type: 'error',
                    duration: 1000
                  });
                  speechSU.text = res.msg;
                  window.speechSynthesis.speak(speechSU);
                  return
                }
                  this.$message({
                    message: res.msg,
                    type: 'success',
                    duration: 1000
                  });
                  this.inputSweep = '';
                  mv.dataStas.supplyQuantity = mv.dataStas.supplyQuantity - mv.num1;

                  if (mv.dataStas.supplyQuantity == 0) {
                    this.dialogTableVisible = false;
                  }
                  this.dialogTableVisible = false;
                  mv.infoViews(mv.curID,mv.cur);
                  speechSU.text = '已出库' + mv.dataStas.name +'数量'+ mv.num1;
                  //+ mv.dataStas.bigUnitDesc
                  window.speechSynthesis.speak(speechSU);
                  mv.num1='1';
                  // this.leftInfo.dataList.push(res.data);
              }).catch((err) => {
                console.log(err);
              })
            // }).catch(() => {
            //   // this.$message({
            //   //   type: 'info',
            //   //   message: '已取消发货'
            //   // });
            // });
          // }else {
          //   this.$message({
          //     message: '物资编码与实际物资编码不相同',
          //     type: 'error',
          //     duration: 1000
          //   });
          //   speechSU.text = '物资编码与实际物资编码不相同';
          //   window.speechSynthesis.speak(speechSU);
          //   return;
          // }
        },
        //扫码查找
        queryClick1(val) {
          let mv = this;
          if (val == '' || val.length < 4) {
            return;
          }
          mv.searchHouse1.pageNumber = 1;
          mv.houseList1 = [];

          this.busy1 = false;// 将无限滚动给打开
          mv.querySearch1(val);
        },

        //搜索
        querySearch1(val) {
          let mv = this;
          if (val == "" || val.length < 4) {
            mv.houseList1 = [];
            return
          }
          let hou = this.searchHouse1;
          hou.barCode = val;
          catalogs(hou).then(res => {
            if(res.code !=='1'){
              this.$message({
                message: res.msg,
                type: 'error',
              });
              return
            }
            let listTotal = res.data.total;
            let kuK=res.data.result;
            for(let i=0;i<kuK.length;i++){
              mv.kuKun= kuK[i].location;
            }
            mv.enterL();
            if (listTotal > 0) {
              this.busy1 = true
            } else {
              this.busy1 = false
            }
            this.loading = false;
            // mv.houseList1 = mv.houseList1.concat(res.data.result);
            // let DownloadTotal =
            //   (mv.searchHouse1.pageNumber + 1) * mv.searchHouse1.pageSize;
            let total = res.data.total;
            mv.houseNum1 = total;
            let totalPage = (mv.houseNum1 + mv.searchHouse1.pageSize) / mv.searchHouse1.pageSize;
            // mv.searchHouse.pageNumber++; //增加页数
            if (mv.searchHouse1.pageNumber + 1 >= totalPage) {
              this.busy1 = true // 将无限滚动关闭
              this.searchHouse1.pageNumber = 0 // 页数变为0
            } else {
              this.busy1 = false // 将无限滚动给打开
            }
          }).catch(function (error) {
            mv.$message({
              message: error.msg,
              type: 'error'
            });
          });
        },
        queryClick(val){
          let mv=this;
          mv.leftInfo.searchHouse.pageNumber=1;
          mv.leftInfo.houseList=[];
          // this.busy = false // 将无限滚动给打开
          mv.querySearch(val);
        },
        querySearch(val){
          let mv=this;
          let hou=this.leftInfo.searchHouse;
          hou.keyWords=val;
          searchExpirationList(this.Qs.stringify(hou)).then(res => {
            if(res.code !=='1'){
              this.$message({
                message: res.msg,
                type: 'error',
              });
              return
            }
            let listTotal = res.data.total;
            if (listTotal > 0) {
              this.busy = true
            } else {
              this.busy = false
            }
            this.loading = false;
              if(listTotal<=mv.leftInfo.searchHouse.pageSize){
                  mv.leftInfo.houseList=res.data.result;
                  mv.busy = true;
                  mv.noMore = true // 切换底部提示信息
                  mv.droping = false
              }else {
                  mv.leftInfo.houseList = mv.leftInfo.houseList.concat(res.data.result);
                  let DownloadTotal =
                      (mv.leftInfo.searchHouse.pageNumber + 1) * mv.leftInfo.searchHouse.pageSize;
                  let total = res.data.total;
                  mv.leftInfo.houseNum = total;
                  let totalPage = (mv.leftInfo.houseNum + mv.leftInfo.searchHouse.pageSize) / mv.leftInfo.searchHouse.pageSize;
                  // mv.searchHouse.pageNumber++; //增加页数
                  if (mv.leftInfo.searchHouse.pageNumber + 1 >= totalPage) {
                      this.busy = true // 将无限滚动关闭
                      mv.leftInfo.searchHouse.pageNumber = 0;// 页数变为0
                      this.noMore = true // 切换底部提示信息
                      this.droping = false
                  } else {
                      this.busy = false // 将无限滚动给打开
                      this.droping = true
                      this.noMore = false // 切换底部提示信息
                  }
              }
          }).catch(function(error) {
            this.$message.error(error);
            this.droping = false
          });
        },
        loadMore() {
          setTimeout(() => {
            let mv=this;
            if (!mv.busy) {
              mv.busy = true;// 将无限滚动给禁用
              if(mv.searchtxt==''){
                mv.leftInfo.searchHouse.pageNumber++ // 增加页数
                mv.searchSource();// 请求数据
              }else {
               mv.leftInfo.searchHouse.pageNumber++ // 增加页数
                mv.querySearch(mv.searchtxt);
              }
            }
          });
        },
        searchSource(){
          let mv=this;
          let houseList=this.leftInfo.searchHouse;
          houseList.type=this.leftInfo.datas[this.cur].type;
          expirationList(houseList).then(response => {
            if(response.code !=='1'){
              this.$message({
                message: response.msg,
                type: 'error',
              });
              return
            }
            let listTotal = response.data.total;
            if (listTotal > 0) {
              this.busy = true
            } else {
              this.busy = false
            }
            this.loading = false;
              if(listTotal<=mv.leftInfo.houseList.pageSize){
                  mv.leftInfo.houseList=response.data.result;
                  mv.busy = true;
                  mv.noMore = true // 切换底部提示信息
                  mv.droping = false
              }else {
                  mv.leftInfo.houseList = mv.leftInfo.houseList.concat(response.data.result)
                  // console.log(response.data.result)
                  let DownloadTotal =
                      (mv.leftInfo.searchHouse.pageNumber + 1) * mv.leftInfo.searchHouse.pageSize;
                  let total = response.data.total;
                  mv.leftInfo.houseNum = response.data.total;
                  let totalPage = (mv.leftInfo.houseNum + mv.leftInfo.searchHouse.pageSize) / mv.leftInfo.searchHouse.pageSize;
                  // mv.searchHouse.pageNumber++; //增加页数
                  if (mv.leftInfo.searchHouse.pageNumber + 1 >= totalPage) {
                      this.busy = true // 将无限滚动关闭
                      this.leftInfo.searchHouse.page = 0 // 页数变为0
                      this.noMore = true // 切换底部提示信息
                      this.droping = false
                  } else {
                      this.busy = false // 将无限滚动给打开
                      this.droping = true
                      this.noMore = false // 切换底部提示信息
                  }
              }
          }).catch(function(error) {
            this.$message.error(error)
            this.droping = false
          });


        },


          //计时开始
          //重置时间
          // timer(){   //定义计时函数
          //     this.ms=this.ms+50;         //毫秒
          //     if(this.ms>=1000){
          //         this.ms=0;
          //         this.s=this.s+1;         //秒
          //     }
          //     if(this.s>=60){
          //         this.s=0;
          //         this.m=this.m+1;        //分钟
          //     }
          //     if(this.m>=60){
          //         this.m=0;
          //         this.h=this.h+1;        //小时
          //     }
          //     this.str =this.toDub(this.m)+":"+this.toDub(this.s)+"."+this.toDubms(this.ms);
          //     // document.getElementById('mytime').innerHTML=h+"时"+m+"分"+s+"秒"+ms+"毫秒";
          // },
          sumTime(){
              this.sumTimes=this.sumTimes+1;      //秒
              this.str=this.sumTimes;
          },
          reset(){  //重置
              // clearInterval(this.time);
              // this.h=0;
              // this.m=0;
              // this.ms=0;
              // this.s=0;
              // this.str="00:00:00";
              this.sumTimes=0;
              this.str="0";
          },
          start(){  //开始
              this.time=setInterval(this.sumTime,1000);
          },
          stop(){  //暂停
              clearInterval(this.time);
          },
          toDub(n){  //补0操作
              if(n<10){
                  return "0"+n;
              }
              else {
                  return ""+n;
              }
          },
          toDubms(n){  //给毫秒补0操作
              if(n<10){
                  return "00"+n;
              }
              else {
                  return ""+n;
              }

          },
          //计时结束
          //关闭窗口
          NoHandleClose(done){
              let mv=this;
              mv.stop();
              localStorage.setItem("Timename", this.str);
              mv.reset();
              done();
          },
          handleClose(done){
              let vm = this;
              vm.stop();
              localStorage.setItem("Timename", this.str);
              vm.reset();
              done();
          },

        infoViews(id,index1){
          this.cur=index1;
            this.curID=id;
          this.danViewsLoadding=true;
          this.leftInfo.houseList=[];
          this.leftInfo.searchHouse.pageNumber=1;
          this.searchSource();
        },
          //判断是否同一库位
          openTray(data) {
              let mv=this;
              let lan=data.location;
              let result=lan.split("-");
              if(mv.$store.state.whetherTest == true){
                  if(data.codeType==3){
                      mv.dialogTableNoCode = true;
                  }else {
                      mv.dialogTableVisible = true;
                  }
                  mv.num1=1;
                  mv.dataStas = data;
                  // vm.dialogTableVisible = true;
              }
              this.$nextTick( () =>{
                  this.$refs.child.parentMsg(lan);
              })
              if(this.$store.state.LibraryLo==''){
                  mv.pushDataList(data);
              }else {
                  let resultData=this.$store.state.LibraryLo.split("-");
                  let resultD1=parseInt(resultData.slice(0)[0]);
                  let resultD2=parseInt(resultData.slice(1)[0]);
                  let result1=parseInt(result.slice(0)[0]);
                  let result2=parseInt(result.slice(1)[0]);
                  if(resultData.length==result.length&&resultD1==result1&&resultD2==result2){
                      if(this.$store.state.recordPrevious==0){
                          mv.pushDataList(data);
                      }else {
                          return;
                      }
                  }else {
                      mv.pushDataList(data);
                  }
              }
          },
          pushDataList(data){
          let vm = this;

            this.$store.state.LibraryLo=data.location;
          vm.lansen = this.$store.state.LibraryLo;
              vm.openFullScreen2();
          openL(data.location).then(res=>{
              vm.$store.state.recordPrevious=1;
            if(res.code !=='1'){
              this.$message({
                message: res.msg,
                type: 'error',
              });
              return
            }

            // data.supplyQuantity =data.realQuantity;
            // data.checkStatus=1;
            // this.valueEquals=true;

            this.start();
            vm.$message({
              type: 'success',
              message: res.msg
            });

            this.inputSweep='';
            this.$nextTick( () =>{
              this.$refs.gain.focus();
            })
            return false;
          }).catch(err => {
            vm.$message({
              type: 'error',
              message: err.msg
            });
            return false;
          });
        },
          //  无码出库
          NoCodeOk(data){
              let mv = this;
              noCodeOutIn({
                  id: data.id,
                  actionType:2,
                  number:mv.num1,
                  codeType:mv.dataStas.codeType,
                  barcodeSize:mv.dataStas.barcodeSize,
                  bcode:mv.dataStas.barcode,
              }).then(res => {
                  if (res.code !== '1') {
                      this.$message({
                          message: res.msg,
                          type: 'error',
                          duration: 1000,
                      });
                      speechSU.text = res.msg;
                      window.speechSynthesis.speak(speechSU);
                      return
                  }
                  if (res.code == 1) {
                      this.$message({
                          message: '出库成功',
                          type: 'success',
                          duration: 1000
                      });
                      mv.dataStas.supplyQuantity=mv.dataStas.supplyQuantity-mv.num1;

                      if(mv.dataStas.codeType==2||mv.dataStas.codeType==3){
                          mv.dialogTableNoCode = false;
                      }
                      // mv.dialogTableNoCode = false;
                      mv.infoViews(mv.curID,mv.cur);
                      // mv.infoViews(mv.houseList.type,mv.cur);
                      speechSU.text = '已出库'+res.data.name+'数量'+mv.num1;
                      //+res.data.smallUnitDesc
                      window.speechSynthesis.speak(speechSU);
                      mv.num1='1';

                      // this.$router.push({name: 'warehouseLie',params:{data:res}})
                  }
              }).catch((err) => {
                  console.log(err);
              })
          },
      },
    }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .traygran{
    background: #ddd !important;
    cursor: not-allowed;
    pointer-events:none;

    h4{
      color: #ddd;
    }
    span{
      color: #ddd;
    }
    .allocationStorehouse{
      color: #ddd;
    }
  }
  .textes{
    text-align: left;
    height: 30px;
    margin-bottom: 10px;
    font-size: 18px;
  }
  [v-cloak]{
    display: none;
  }
  .menuMainContent {
    display: inline-block;
    position: absolute;
    right: 50px;
    top: 0;
    height: 72px;
    .trayClose {
      float: right;
      margin: 14px 28.8px 14px  0;
    }
  }
  .autoSeach{
    .inputs1{
      float: right;

    }
    i{
      font-size: 30px;
      margin: 4px 0;
      display: block;
      cursor: pointer;
    }
  }
  .templatH{
    height: calc(100% - 45px);
    overflow-y: auto;
  }
.effectiveHead{;
  background: #fff;
  .effectiveLie{
 display: flex;
    margin: 10px 0;
    button{
      height: 40px;
  padding-bottom: 0;
      padding-top: 0;
      border-width: 0px;
      border-radius: 10px;
    }
  }
}
  .templateOK{
    position: relative;
    float: right;
    margin-right: 50px;
  }
.hit{
  background: #13bbf4;
  color: #fff;
}

.templateRight{
  margin: 0;
  height: 100%;
  overflow-y: auto;
  .templateAdd{
    width: 100%;
    text-align: center;
    box-sizing:border-box;
    display:flex;
  }
  .templateHover{
    display:initial;
    float: left;width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
  }
  .templateHover:hover{
    outline: 2px #13bdf6 solid;
    outline-offset: -2px;
  }
  .el-card__body{
    height: 100%;
    position: relative;
  }
  li{
    .templateLis{
      padding-bottom: 20px;
    }
    .templateImg{
      width: 246px;
      height: 100%;
      float: left;
      outline: 1px solid #ddd;
      position: absolute;
      left: 0;
      top: 0;
      padding: 10px;
      img{
        width: 100%;
        height: 100%;
        float: left;

      }
    }
    .templateR{
      height: 100%;
      padding-left: 246px;
      h4{
        font-size: 24px;
        font-weight: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      h4::before,span::before {
        content:"\007C ";
        opacity:0;
      }
      h3::before{
        content:"\007C ";
        opacity:0;
      }
      h3{
        font-size: 16px;
        color: #00adf8;
        margin-top: 10px;
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分省略号显示*/
        width: 100%;
      }
      .templateP{
        float: right;
        font-size: 36px;
        padding-top: 10px;
        padding-right: 8px;
        color: #02b2e9;
      }
      .templateTime{
        float: right;
        font-size: 16px;
        width: 100%;
        span{
          float: right;
          font-size: 16px;
        }
        p{
          float: right;
          font-size: 16px;
          padding-left: 10px;
        }
        b{
          float: right;
          font-size: 16px;
          font-weight: normal;
          color: #ef0000;
        }
      }
      .templateNum{
        position: absolute;
        right: 80px;
        bottom: 25px;
      }
      .templateButton{
        position: absolute;
        right: 20px;
        border:2px dashed #0eb2ea;
        color: #0eb2ea;
        bottom: 25px;
        font-size: 16px;
        padding-left:15px;
        padding-right:15px;
      }
      .leftHightS{
        float: left;
        width: 100%;

      }
      .templateSpan{
        float: left;
        font-size: 16px;
        margin-top: 10px;
        b{
          float: left;
          font-weight: normal;
        }
        p{
          float: left;

        }
      }
      .templateTitle{
        display: block;
        font-size: 16px;
        padding-top:8px;
        color: #8e8e8e;
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分省略号显示*/
      }
      .templateTitle::before{
        content:"\007C ";
        opacity:0;
      }
    }


  }
  .prohibit {
    pointer-events: none;
    cursor: default;
  }
}
  .carouselLS{
    display: flex;
    .carouselLeft{
      flex: 1;
      img{
        height: 100%;
        width: 100%;
      }
      /*width: 100px;*/
    }
    .carouselRight{
      flex: 2;
      padding-left: 50px;
    }
  }
  .textesH{
    text-align: left;
    height: 20px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .selValImg{
    margin-top: 5px;
    margin-bottom: 10px;
    width: 80% !important;
    float: left;
  }
  .crumbHight{
    width:80% !important;
    height: auto;
    margin-bottom: 10px;
    float: left;
    .el-input-number{
      width: 100% !important;
    }
  }
  .cumens{
    margin-top: 10px;
    width: 80% !important;
    height: auto;
    margin-bottom: 10px;
    float: left;
  }
</style>
