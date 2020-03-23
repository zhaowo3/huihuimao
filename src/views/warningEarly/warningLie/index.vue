<template>
  <div style="height: 100%;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <el-button type="primary" class="trayClose" id="hamburger-closeL" @click="closeTray" v-if="operation==1">关闭托盘</el-button>
        <!--        <el-button type="primary" class="trayClose colorsGreen">打开托盘</el-button>-->

        <div class="autoSeach" id="hamburger-searcts">
          <el-input v-model="searchtxt" @keyup.enter.native="queryClick(searchtxt)"
                    class="inputs1" placeholder="请输入关键字" clearable>
            <i class="iconfont icon-icon-test35" @click="queryClick(searchtxt)" slot="suffix"></i>
          </el-input>
        </div>
      </div>
    </div>
    <el-container style="height: 100%;">
      <el-header class="effectiveHead" style="height: auto;">
        <el-row class="effectiveLie" >
          <el-button @click="numSort" id="hamburger-NumberNameL">实际数量
            <i class="el-icon-caret-bottom" v-if="iconBottom"></i><i class="el-icon-caret-top" v-if="iconTop"></i>
          </el-button>
          <el-button @click="numLocation" id="hamburger-numLocation">库位
            <i class="el-icon-caret-bottom" v-if="iconBottoms"></i><i class="el-icon-caret-top" v-if="iconTops"></i>
          </el-button>
          <div class="allTopBo" id="hamburger-allTopBo">
            <el-select v-model="value3" clearable placeholder="全部巷道" @change="handleCommand(value3)">
              <el-option
                v-for="item in options2"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </div>
<!--          <el-button @click="numName">名字-->
<!--            <i class="el-icon-caret-bottom" v-if="iconBottom"></i><i class="el-icon-caret-top" v-if="iconTop"></i>-->
<!--          </el-button>-->
          <p class="infoNum"><span>已显示:{{current}},</span><span>总数:{{houseNum}}</span></p>
        </el-row>

      </el-header>
      <el-main v-loading="listLoading" style="padding-top: 5px;">
        <el-row :gutter="20" class="templateRight" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                infinite-scroll-distance="10">
          <!--        @infinite-scroll="getMoreList" @scroll="eventsBand()"-->
          <div>
            <ul id="leftBox" style="padding-top: 2px;">
              <li v-for="(data,index) in houseList" :key="index" :class="{'prohibit':operation==0}">
                <el-col :span="12" >
                  <el-row class="templateLis">
                    <div class="templateHover" @click="showH(data)">
                      <div class="templateImg">
                        <el-image :src="data.imgUrl">
                          <div slot="error" class="image-slot">
                            <svg-icon icon-class="gen" style="height: 100%;cursor: pointer;width: 100%;float:left;"
                                      class="color-main"></svg-icon>
                          </div>
                          <div slot="placeholder" class="image-slot">
                            <svg-icon icon-class="gen" style="height: 100%;cursor: pointer;width: 100%;float:left;"
                                      class="color-main"></svg-icon>

                          </div>

                        </el-image>
                        <i class="iconfont icon-mianma-" v-if="data.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i><i class="iconfont icon-yiwuyima" v-if="data.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i>
                      </div>
                      <el-card class="templateR templateHeight">
                        <div style="position: relative; height: 100%;display: flex;width: 100%;">
                          <el-col :span="16" style='position: relative;height: 100%;'>
                            <h4 :title="data.name">{{data.name}}</h4>
                            <h4 :title="data.alias">{{data.alias}}</h4>
                            <span class="templateTitle">{{data.size}}</span>
                            <h3>{{data.hisCode}}</h3>
                            <div class="leftHightS">
                          <span class="templateSpan"><b>库位:</b><p>{{data.location}}</p>
                          </span>
<!--                              <el-button class="templateOK" v-if="" >打开</el-button>-->
                            </div>
                          </el-col>
                          <el-col :span="8" style='position: relative;height: 100%;'>
                            <div class="templateTime"><b>{{data.warnQuantity}}</b>
                              <p>预警:</p><span>{{data.dif}}</span></div>
                            <p class="templateP">{{data.supplyQuantity}}({{data.bigUnitDesc}})</p>
                            <el-button class="templateButton" v-if="data.type==1">包</el-button>

                          </el-col>

                        </div>
                      </el-card>
                    </div>
                  </el-row>
                </el-col>

              </li>
              <li
                style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px;float: left;"
                v-show="droping">加载中
              </li>
              <li
                style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px;float: left;"
                v-show="noMore">没有更多的数据
              </li>

            </ul>
          </div>

        </el-row>
      </el-main>
    </el-container>
    <el-dialog title="无码入库" :visible.sync="dialogTableNoCode" :before-close="NoHandleClose"
               custom-class="el-dialog__header-custom dialoVisible dialogTableNoCode" center width="70%">
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
              <el-date-picker v-model="selectVal" ref='gainVal' class="selValImg" align="right" type="date"
                              placeholder="选择效期日期"
                              popper-class="picker-no-text"
                              value-format="yyyy-MM-dd"
                              :picker-options="pickerOptions">
              </el-date-picker>
              <div class="crumbHight" v-if="dataStas.codeType==2||dataStas.codeType==3">
                <el-input-number v-model="num1" :min="1" :max="9999" :disabled="disabled"  label="输入数字"></el-input-number>
              </div>
            </div>
          </div>

        </div>
        <div style="flex: 2">
          <LibraryDisplay :lots="dataStas.location" ref="child"></LibraryDisplay>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
           <el-button @click="dialogTableNoCode = false">取 消</el-button>
        <el-button type="primary" @click="NoCodeOk(dataStas)">确 定</el-button>
  </span>

    </el-dialog>
    <el-dialog title="请扫码入库" :visible.sync="dialogTableVisible" :modal="true"
               custom-class="el-dialog__header-custom dialoVisible" :before-close="handleClose" width="70%">
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
              <el-date-picker v-model="selectVal" ref='gainVal' class="selValImg" align="right" type="date"
                              placeholder="选择效期日期"
                              popper-class="picker-no-text"
                              value-format="yyyy-MM-dd"
                              :picker-options="pickerOptions">
              </el-date-picker>
              <div class="crumbHight" v-if="dataStas.codeType==2||dataStas.codeType==3">
                <el-input-number v-model="num1" :min="1" :disabled="disabled" :max="9999"   label="输入数字"></el-input-number>
              </div>
              <el-input v-model="inputSweep" ref='gain' :disabled="disabled" clearable class="cumens" autofocus="autofocus" @click="enterL(inputSweep,danViews.location)"
                        @keyup.enter="enterL(inputSweep,danViews.location)"        placeholder="物资编码">
                <i slot="suffix" class="iconfont icon-icon-test46" @click="enterL(inputSweep,danViews.location)"></i>
              </el-input>
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
  import {debounce} from '@/utils/debounce';
  import LibraryDisplay from '@/components/LibraryDisplay'
  import {
    quantityWarn,catalogs,noCodeOutIn,deviceList
  } from '@/api/material'
  import {
    enterLout,enterL
  } from '@/api/library'
  import {
    openL, closeL, searchQuantityWarn,submenuMenuId
  } from '@/api/systemsL'

  export default {
    name: "warningLie",
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

        smalls,
        listLoading: false,
        loading: false,
        houseList: [],
        disabled:false,
        selectVal:'',
        searchHouse: {
          pageSize: 10,
          pageNumber: 0,
          columnName: 'supply_quantity',
          orderType: 'desc'
        },
        searchHouse1:{
          pageSize:10,
          pageNumber:0,
          keyWords:'',
        },
          options2:[],
          value3:'全部',
          machineDeviceNo:'',
        dialogTableVisible: false,
          dialogTableNoCode:false,
        inputSweep:'',
        kuKun:'',
        dataStas:'',
        busy1:false,
        iconBottom: true,
        iconTop: false,
          iconBottoms: true,
          iconTops: false,
        houseNum: '',
          current:'',
        busy: false,
        droping: false,
        noMore: false,
        lansen: '',
          num1:1,
          curID:1,
        searchtxt: '',
        operation:'',
        pickerOptions: {
          // disabledDate(time) {
          //   return time.getTime() > Date.now();
          // },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      };
    },
    mounted() {
    },
    watch: {
      selectVal:function () {
        const vm=this;
        if(vm.selectVal!==null){
          vm.disabled=false;
        }else {
          vm.disabled=true;
        }
      }
    },
    created() {
        this.submenuMenuId();
      // if(this.$route.params.inputNO!==''){
      //   this.searchtxt=this.$route.params.inputNO;
      //   this.queryClick(this.$route.params.inputNO);
      // }
      this.$watch('searchtxt', debounce((newQuery) => {
        this.queryClick(newQuery);
      }, 1000));
      this.$watch('inputSweep', debounce((newQuery) => {
        if (newQuery == "") {
          // this.houseList = [];
          // this.mainShow1 = true;
          return
        }else {
          this.enterL();
        }
      }, 2000));

        this.operationIndex();
    },
    methods: {
      handleClose(done){
        let vm = this;
          vm.stop();
          localStorage.setItem("Timename", this.str);
          vm.reset();
        vm.selectVal='';
        vm.inputSweep='';
        done();
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
            clearInterval(this.sumTimes);
            // this.h=0;
            // this.m=0;
            // this.ms=0;
            // this.s=0;
            // this.ms=0;
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

      enterL(newQuery) {
        let mv = this;
        if(mv.selectVal==null){
          mv.$message({
            type: 'error',
            message: '请输入日期',
          });
          return;
        }
        if (newQuery == '') {
          this.$message({
            type: 'error',
            message: '请扫码',
              duration: 1000
          });
          return;
        }
        // if (this.dataStas.barcode == mv.inputSweep.toString().toUpperCase().substring(0, 4)||this.dataStas.hisCode == mv.inputSweep) {
          // this.$confirm('是否进行入库操作?', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
          mv.kuKun=this.$store.state.LibraryLo;
            enterL({
              barCode: mv.inputSweep,
              location: mv.dataStas.location,
              valid: mv.selectVal,
                number:mv.num1,
                codeType:mv.dataStas.codeType,
                barcodeSize:mv.dataStas.barcodeSize,
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
                mv.dataStas.supplyQuantity = mv.dataStas.supplyQuantity + mv.num1;

                this.inputSweep = '';
                // this.leftInfo.dataList.push(res.data);
                if (mv.dataStas.supplyQuantity == 0) {
                  this.dialogTableVisible = false;
                }
                if(mv.dataStas.codeType==2||mv.dataStas.codeType==3){
                    mv.dialogTableVisible = false;
                }
                mv.queryClick();
                speechSU.text = '已入库' + res.data.name +'数量'+ mv.num1;
                //+ res.data.smallUnitDesc
                window.speechSynthesis.speak(speechSU);
                mv.num1='1';
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
        mv.houseList = [];

        this.busy1 = false;// 将无限滚动给打开
        mv.querySearch1(val);
      },
      //搜索出库
      querySearch1(val) {
        let mv = this;
        if (val == "" || val.length < 4) {
          mv.houseList = [];
          return
        }
        let hou = this.searchHouse1;
        hou.barCode = val;
        catalogs(hou).then(res => {
          if(res.code !=='1'){
            this.$message({
              message: res.msg,
              type: 'error',
                duration: 1000
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
            if(listTotal<=mv.searchHouse1.pageSize){
                mv.houseList=res.data.result;
                mv.houseNum = res.data.total;
                this.busy = true;
                mv.noMore = true // 切换底部提示信息
                mv.droping = false;
                mv.current= mv.houseList.length;
            }else {
                mv.houseList = mv.houseList.concat(res.data.result);
                // let DownloadTotal =
                //   (mv.searchHouse1.pageNumber + 1) * mv.searchHouse1.pageSize;
                let total = res.data.total;
                mv.houseNum = total;
                let totalPage = (mv.houseNum + mv.searchHouse1.pageSize) / mv.searchHouse1.pageSize;
                // mv.searchHouse.pageNumber++; //增加页数
                if (mv.searchHouse1.pageNumber + 1 >= totalPage) {
                    this.busy1 = true // 将无限滚动关闭
                    this.searchHouse1.pageNumber = 0 // 页数变为0
                } else {
                    this.busy1 = false // 将无限滚动给打开
                }
                mv.current= mv.houseList.length;
            }
        }).catch(function (error) {
          mv.$message({
            message: error.msg,
            type: 'error'
          });
        });
      },
      queryClick(val) {
        let mv = this;
        mv.searchHouse.pageNumber = 1;
        mv.houseList = [];
        mv.querySearch(val);
      },
      //搜索
      querySearch(val) {
        let mv = this;
        let hou = this.searchHouse;
        hou.keyWords = val;
        searchQuantityWarn(this.Qs.stringify(hou)).then(res => {
          if(res.code !=='1'){
            this.$message({
              message: res.msg,
              type: 'error',
                duration: 1000
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
            if(listTotal<=mv.searchHouse.pageSize){
                mv.houseList=res.data.result;
                mv.houseNum = res.data.total;
                this.busy = true;
                mv.noMore = true // 切换底部提示信息
                mv.droping = false
                mv.current= mv.houseList.length;
            }else {
                mv.houseList = mv.houseList.concat(res.data.result);
                let DownloadTotal =
                    (mv.searchHouse.pageNumber + 1) * mv.searchHouse.pageSize;
                let total = res.data.total;
                mv.houseNum = total;
                let totalPage = (mv.houseNum + mv.searchHouse.pageSize) / mv.searchHouse.pageSize;
                // mv.searchHouse.pageNumber++; //增加页数
                if (mv.searchHouse.pageNumber + 1 >= totalPage) {
                    this.busy = true // 将无限滚动关闭
                    this.searchHouse.pageNumber = 0 // 页数变为0
                    this.noMore = true // 切换底部提示信息
                    this.droping = false
                } else {
                    this.busy = false // 将无限滚动给打开
                    this.droping = true
                    this.noMore = false // 切换底部提示信息
                }
                mv.current= mv.houseList.length;
            }
        }).catch(function (error) {
          this.$message({
            message: error.msg,
            type: 'error',
              duration: 1000
          });
          this.droping = false
        });
      },

      //关闭
      closeTray() {
          this.lansen = this.$store.state.LibraryLo;
        if (this.lansen == '') {
          this.$message({
            type: 'error',
            message: '请输入库位',
              duration: 1000
          });
          return false;
        }
        closeL(this.lansen).then(response => {
            this.$store.state.recordPrevious=0;
            this.openFullScreen2();
          if(response.code=='-1'){
            this.$message({
              message: response.msg,
              type: 'error',
                duration: 1000
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
        submenuMenuId(mv.$store.state.user.Secondm.warningEarly.id).then(response => {
          if(response.code=='-1'){
            this.$message({
              message: response.msg,
              type: 'error',
            });
            return
          }
          // mv.jurisdiction = response.data;
          if(response.data[0].children=='operation'){
            mv.operation=response.data[0].ststus;
          }

        });
      },
      //打开库位列表
      showH(data) {
        let vm = this;
          this.selectVal=data.validDate;
          // console.log(data.validDate);
          if(this.$store.state.whetherTest == true){
              if(data.codeType==3){

                  vm.dialogTableNoCode = true;
                  this.selectVal=data.validDate;
              }else {
                  this.dialogTableVisible = true;
                  this.selectVal=data.validDate;
              }
              vm.num1=1;
          }
        vm.dataStas = data;

        vm.openTray(data);
        vm.start();
        if(vm.selectVal==''||vm.selectVal==null){
          vm.disabled=true;
            vm.$nextTick( () =>{
                vm.$refs.gainVal.focus();
                vm.$refs.child.parentMsg(data.location);
            })


        }else {
          vm.disabled=false;
            vm.$nextTick( () =>{
                    vm.$refs.gain.focus();
                vm.$refs.child.parentMsg(data.location);
            })
        }

      },
        //下拉
        operationIndex(){
            let mv=this;
            deviceList().then(response=> {
                mv.options2=response.data;
                // let IpPositonhome=  sessionStorage.getItem('IpPositonhome');
                // mv.value3=response.data[0];

                mv.searchHouse.deviceNo=response.data[0].deviceNo;
                mv.value3=response.data[0].deviceNo;
                mv.machineDeviceNo=response.data[0].deviceNo;
                mv.queryClick(mv.searchHouse.deviceNo);
                // let h=this.listQuery;
                // h.search=this.options2s;
            })
        },
        handleCommand(val) {
            let mv=this;
            // mv.searchHouse.pageNumber=1;
            if(val==''){
                // mv.searchHouse.deviceNo='';
                mv.queryClick();
                mv.current=0;
                return
            }else {
                switch(val) {
                    case val:
                        mv.searchHouse.deviceNo=val;
                        mv.machineDeviceNo=val;
                        mv.queryClick();
                        mv.current=0;
                        break;
                }
            }

        },
        //判断是否同一库位
        openTray(data) {
            let mv=this;
            let lan=data.location;
            let result=lan.split("-");
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
        pushDataList(data) {
            let vm = this;
        // this.dataStas = data;
            vm.$store.state.LibraryLo=data.location;
            vm.openFullScreen2();
            vm.lansen = this.$store.state.LibraryLo;
        openL(data.location).then(res => {
            vm.$store.state.recordPrevious=1;
          if(res.code=='-1'){
            this.$message({
              message: res.msg,
              type: 'error',
            });
            return
          }
          // data.supplyQuantity =data.realQuantity;
          // data.checkStatus=1;
          // this.valueEquals=true;
          vm.$message({
            type: 'success',
            message: res.msg
          });
            // if(data.codeType==3){
            //     vm.dialogTableNoCode = true;
            // }else {
            //     vm.dialogTableVisible = true;
            // }
            // vm.dialogTableVisible = true;

          this.inputSweep='';
          // this.$nextTick( () =>{
          //   this.$refs.gain.focus();
          // })
          return false;

        }).catch(err => {
          vm.$message({
            type: 'error',
            message: err.msg
          });
          return false;
        });
      },
        //  无码入库
        NoCodeOk(data){
            let mv = this;
            noCodeOutIn({
                id: data.id,
                actionType:1,
                number:mv.num1,
                valid: mv.selectVal,
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
                        message: '入库成功',
                        type: 'success',
                        duration: 1000
                    });

                    mv.dataStas.supplyQuantity=mv.dataStas.supplyQuantity+mv.num1;

                    if(mv.dataStas.codeType==2||mv.dataStas.codeType==3){
                        mv.dialogTableNoCode = false;
                    }
                    if(mv.dataStas.supplyQuantity==0){
                        mv.houseList[mv.cur].supplyQuantity=0;

                    }
                    mv.queryClick();
                    speechSU.text = '已入库'+res.data.name+'数量'+mv.num1;
                    //+res.data.smallUnitDesc
                    window.speechSynthesis.speak(speechSU);
                    mv.num1='1';
                    // this.$router.push({name: 'warehouseLie',params:{data:res}})
                }
            }).catch((err) => {
                console.log(err);
            })
        },
      loadMore() {
        setTimeout(() => {
          let mv = this;
          if (!mv.busy) {
            mv.busy = true;// 将无限滚动给禁用
            if (mv.searchtxt == '') {
              mv.searchHouse.pageNumber++;// 增加页数
              mv.searchSource();// 请求数据
            } else {
              mv.searchHouse.pageNumber++;// 增加页数
              mv.querySearch(mv.searchtxt);
            }
          }
        }, 500);
      },
      searchSource() {
        let mv = this;
        quantityWarn(this.searchHouse).then(response => {
          if(response.code=='-1'){
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
            if(listTotal<=mv.searchHouse.pageSize){
                mv.houseList=response.data.result;
                mv.houseNum = response.data.total;
                this.busy = true;
                mv.noMore = true // 切换底部提示信息
                mv.droping = false;
                mv.current= mv.houseList.length;
            }else {
                mv.houseList = mv.houseList.concat(response.data.result);
                let DownloadTotal =
                    (mv.searchHouse.pageNumber + 1) * mv.searchHouse.pageSize;
                let total = response.data.total;
                mv.houseNum = response.data.total;
                let totalPage = (mv.houseNum + mv.searchHouse.pageSize - 1) / mv.searchHouse.pageSize;
                // mv.searchHouse.pageNumber++; //增加页数
                if (mv.searchHouse.pageNumber + 1 >= totalPage) {
                    this.busy = true // 将无限滚动关闭
                    this.searchHouse.page = 0 // 页数变为0
                    this.noMore = true // 切换底部提示信息
                    this.droping = false
                } else {
                    this.busy = false // 将无限滚动给打开
                    this.droping = true
                    this.noMore = false // 切换底部提示信息
                }
                mv.current= mv.houseList.length;
            }
        }).catch(function (error) {
          this.$message.error(error)
          this.droping = false
        });


      },
      numSort() {
        if (this.searchHouse.orderType == 'desc') {
          this.searchHouse.orderType = 'asc';
          this.iconBottom = false;
          this.iconTop = true;
          this.houseList = [];
          this.searchHouse.pageNumber = 1;
          this.searchSource() // 请求数据
        } else {
          this.searchHouse.orderType = 'desc';
          this.iconBottom = true;
          this.iconTop = false;
          this.houseList = [];
          this.searchHouse.pageNumber = 1;
          this.searchSource() // 请求数据
        }
      },
        numLocation(){
            this.searchHouse.columnName='location';
            if (this.searchHouse.orderType == 'desc') {
                this.searchHouse.orderType = 'asc';
                this.iconBottoms = false;
                this.iconTops = true;
                this.houseList = [];
                this.searchHouse.pageNumber = 1;
                this.searchSource() // 请求数据
            } else {
                this.searchHouse.orderType = 'desc';
                this.iconBottoms = true;
                this.iconTops = false;
                this.houseList = [];
                this.searchHouse.pageNumber = 1;
                this.searchSource() // 请求数据
            }
        },
      // numName(){
      //   if (this.searchHouse.orderType == 'desc') {
      //     this.searchHouse.orderType = 'asc';
      //     this.searchHouse.columnName = 'pinyin';
      //     this.iconBottom = false;
      //     this.iconTop = true;
      //     this.houseList = [];
      //     // this.$delete(this.searchHouse, "pageNumber")
      //      this.searchHouse.pageNumber = 1;
      //     this.searchSource() // 请求数据
      //   } else {
      //     this.searchHouse.orderType = 'desc';
      //     this.searchHouse.columnName = 'pinyin';
      //     this.iconBottom = true;
      //     this.iconTop = false;
      //     this.houseList = [];
      //     // this.$delete(this.searchHouse, "pageNumber");
      //     this.searchHouse.pageNumber = 1;
      //     this.searchSource() // 请求数据
      //   }
      // },
    },
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .textes{
    text-align: left;
    height: 30px;
    margin-bottom: 10px;
    font-size: 18px;
  }
  .menuMainContent {
    display: inline-block;
    position: absolute;
    right: 50px;
    top: 0;
    height: 72px;

    .trayClose {
      float: right;
      margin: 14px 28.8px 14px 0;
    }
  }

  .leftHightS {
float: left;
    width: 100%;

  }

  .templateOK {
    position: relative;
    float: right;
    margin-right: 50px;
  }

  .autoSeach {
    .inputs1 {
      float: right;

    }

    i {
      font-size: 30px;
      margin: 4px 0;
      display: block;
      cursor: pointer;
    }
  }

  .effectiveHead {;

    .effectiveLie {
      display: flex;
      margin: 10px 0;

      button {
        height: 40px;
        padding-bottom: 0;
        padding-top: 0;
        border-width: 0px;

        .svg-icon {
          width: 10px;
          height: 10px;
          margin-left: 10px;
          float: right;
          margin-top: 2px;
        }
      }
    }
  }

  .templateRight {
    margin: 0;
    height: 100%;
    overflow-y: auto;

    .templateAdd {
      width: 100%;
      text-align: center;
      box-sizing: border-box;
      display: flex;
    }

    .templateHover{
      display:initial;
      float: left;width: 100%;
      height: 100%;
      position: relative;
      cursor: pointer;
    }

    .templateHover:hover {
      outline: 2px #13bdf6 solid;
      outline-offset: -2px;
    }

    .el-card__body {
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
        padding: 8px;
        img{
          width: 100%;
          height: 100%;
          float: left;
          padding: 10px;
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
  .allTopBo{
    float: left;
    display: flex;
    z-index: 999;
    position: relative;

    padding-left: 10px;
  }
  .waresw{
    margin-top: 10px;
  }
  .infoNum{
    position: absolute;
    right: 0;
    top: 25%;
    font-size: 18px;
    color: #97a8be;
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
