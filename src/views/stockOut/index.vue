<template>
  <!--  这个是最外框-->
  <div style="display: inline;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <!--        <div class="trayTime">-->
        <!--          <router-link :to="{ name: 'roadwayChoice' }"><i class="iconfont icon-icon-test10"></i></router-link>-->
        <!--        </div>-->
        <el-button type="primary" class="trayClose" @click="closeTray" v-if="operation==1" id="hamburger-closeL">关闭托盘</el-button>
        <el-button type="primary" class="trayClose colorsGreen" @click="etrievalOpen" v-if="operation==1" id="hamburger-stopL">打开托盘</el-button>
        <el-input class="trayTime" style="float: right;width: 100px" ref="inputSotp" v-model="inputSweep1" placeholder="库位" @keyup.enter.native="etrievalOpen" id="hamburger-inputL" v-if="operation==1"></el-input>
        <el-button class="trayClose" @click="report()" type="primary" style="margin-left: 16px;">
          出库记录
        </el-button>
        <!--        <el-button type="primary" class="trayClose" @click="emptyTray">清空</el-button>-->
      </div>

      <!--      <div style="float: right;">-->
      <!--        <div class="autoSeach">-->
      <!--          <el-input v-model="searchtxt" @keyup.enter.native="queryClick(searchtxt)" class="inputs1" placeholder="请搜索">-->
      <!--            <i class="iconfont icon-icon-test35" @click="queryClick(searchtxt)" slot="suffix"></i>-->
      <!--          </el-input>-->
      <!--        </div>-->
      <!--      </div>-->

    </div>
    <el-main :gutter="20" style="height: 100%">
      <el-col :span="8" class="spanvertical matchingsubject">
        <div class="matchingType">

          <div class="mainFrame" v-show="mainShow2">
            <div class="mainLoader">
              <div  @click="focusclick1">
                <svg-icon icon-class="17" class="color-main"></svg-icon>
                <div class="loader1" style="text-align: center">
                  <div class="loader-inner ball-beat">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="demo-inputVal-suffix">
                扫码查找：
                <el-input
                  v-model="inputVal" @keyup.enter.native="queryClick2(inputVal)" ref="inputHT1" clearable id="hamburger-queryClick1" class="inputs1" placeholder="点击这里开始扫码"
                >
                  <i slot="suffix" @click="queryClick2(inputVal)" class="iconfont icon-icon-test46"></i>
                </el-input>
              </div>
              <!--            <el-input class="wareInput" >-->
              <!--              <i slot="suffix" class="iconfont icon-icon-test46"></i>-->
              <!--            </el-input>-->
            </div>
          </div>
          <div class="templateLeft" v-infinite-scroll="loadMore2"
               infinite-scroll-disabled="busy2"
               infinite-scroll-distance="10" v-loading="listLoading" :infinite-scroll-immediate-check=false>
            <ul class="clearfix" id="leftBox2">
              <li v-for="(data,index) in houseList2" :data1="data.id" :key="index" :class="index==cur?'hit':''"
              >
                <el-main>
                  <div class="FraHeight">
                    <div class="templateLeftImg">
                      <div class="templateLeftFrem">
                        <el-image :src="data.imgUrl">
                          <div slot="error" class="image-slot">
                            <img alt=""  :src="big">
                          </div>
                          <div slot="placeholder" class="image-slot">
                            <img alt=""  :src="big">

                          </div>
                        </el-image>

                      </div>
                    </div>
                    <div class="templateLeftTu">
                      <div class="leftxinxi">
                        <p>{{data.name}}</p>
                        <span>{{data.size}}</span>
                        <span></span>
                        <span>库位：{{data.location}}</span>

                        <el-button class="templateOK" type="primary"
                                   style="padding: 10px; color: #fff; border-style: solid"
                                   v-if="" @click="showH(data)">打开
                        </el-button>
                      </div>
                      <div class="rightxinxi">
                        <span>{{data.supplyQuantity}}</span>
                        <el-button class="templateButton" style="position: absolute;bottom: 0;" v-if="data.type==1">包</el-button>
                      </div>

                    </div>
                  </div>
                </el-main>
              </li>
              <!--            <li v-if="leftInfo.loading" style="text-align: center;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;">正在加载，请稍后</li>-->
              <!--            <li v-if="leftInfo.isFinsh" style="text-align: center;color: #ddd;border: none; margin-top: 10px; margin-bottom: 5px;">没有更多数据了</li>-->
              <li
                style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px; float: left;"
                v-show="droping2">加载中
              </li>
              <li
                style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px;float: left;"
                v-show="noMore2">没有更多的数据
              </li>
              <!--          <span  class="show-msg" >这里什么都没有了哦</span>-->
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="spanvertical matchingsubject ">

        <div class="matchingType">

          <div class="mainFrame" v-show="mainShow">
            <div class="mainLoader">
              <div  @click="focusclick">
                <svg-icon icon-class="37" class="color-main"></svg-icon>
                <div class="loader1" style="text-align: center">
                  <div class="loader-inner ball-beat">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="demo-inputVal-suffix1">
                搜索物资：
                <el-input
                  v-model="searchtxt" ref="inputHT" @keyup.enter.native="queryClick(searchtxt)" id="hamburger-queryClick2" clearable class="inputs1" placeholder="输入关键字搜索">
                  <i @click="queryClick(searchtxt)" slot="suffix" class="iconfont icon-icon-test35"></i>
                </el-input>
              </div>
              <!--            <el-input class="wareInput" >-->
              <!--              <i slot="suffix" class="iconfont icon-icon-test46"></i>-->
              <!--            </el-input>-->
            </div>
          </div>
          <div class="templateLeft" v-infinite-scroll="loadMore"
               infinite-scroll-disabled="busy"
               infinite-scroll-distance="10" v-loading="listLoading" :infinite-scroll-immediate-check=false>
            <ul class="clearfix" id="leftBox1">
              <li v-for="(data,index) in houseList" :data1="data.id" :key="index" :class="index==cur?'hit':''"
              >
                <el-main>
                  <div class="FraHeight">
                    <div class="templateLeftImg">
                      <div class="templateLeftFrem">
                        <el-image :src="data.imgUrl">
                          <div slot="error" class="image-slot">
                            <img alt=""  :src="big">
                          </div>
                          <div slot="placeholder" class="image-slot">
                            <img alt=""  :src="big">

                          </div>
                        </el-image>
                      </div>
                    </div>
                    <div class="templateLeftTu">
                      <div class="leftxinxi">
                        <p>{{data.name}}</p>
                        <span>{{data.size}}</span>
                        <span>库位：{{data.location}}</span>
                        <span>{{data.createDate}}</span>
                        <el-button class="templateOK" type="primary"
                                   style="padding: 10px; color: #fff; border-style: solid"
                                   v-if="" @click="showH(data)">打开
                        </el-button>
                      </div>
                      <div class="rightxinxi">
                        <span>{{data.supplyQuantity}}</span>
                        <el-button class="templateButton" style="position: absolute;bottom: 0;" v-if="data.type==1">包</el-button>
                      </div>

                    </div>
                  </div>
                </el-main>
              </li>
              <!--            <li v-if="leftInfo.loading" style="text-align: center;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;">正在加载，请稍后</li>-->
              <!--            <li v-if="leftInfo.isFinsh" style="text-align: center;color: #ddd;border: none; margin-top: 10px; margin-bottom: 5px;">没有更多数据了</li>-->
              <li
                style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px; float: left;"
                v-show="droping">加载中
              </li>
              <li
                style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px;float: left;"
                v-show="noMore">没有更多的数据
              </li>
              <!--          <span  class="show-msg" >这里什么都没有了哦</span>-->
            </ul>
          </div>

        </div>
      </el-col>
      <el-col :span="8" class="spanvertical matchingsubject">
        <div class="matchingType">
          <!--          <div class="demo-inputVal-suffix" style="display:none;">-->
          <!--            扫码出库：-->
          <!--            <el-input-->
          <!--              ref='gain' v-model="inputSweep" autofocus="autofocus" @keyup.enter="enterL"-->
          <!--              placeholder="物资编码">-->
          <!--              <i slot="suffix" class="iconfont icon-icon-test46" @click="enterL"></i>-->
          <!--            </el-input>-->
          <!--          </div>-->
          <div class="mainFrame" v-show="mainShow1" style="height:138px;" id="hamburger-queryClick3">
            <router-link :to="{ name: 'roadwayChoice' }" ><i class="iconfont icon-tubiao-11 suffix1Ls color-main" style="font-size: 60px"></i>
              <p class="mainfize">选择库位</p>
            </router-link>

          </div>
          <div class="templateLeft">
            <!--            v-chat-scroll="{chatlog}"-->
            <ul class="clearfix" id="leftBox">
              <li v-for="(data,index) in leftInfo.dataList" :key="index" :class="index==cur?'hit':''"
              >
                <el-main>
                  <div class="FraHeight">
                    <div class="templateLeftImg">
                      <div class="templateLeftFrem">
                        <el-image :src="data.imgUrl">
                          <div slot="error" class="image-slot">
                            <img alt=""  :src="big">
                          </div>
                          <div slot="placeholder" class="image-slot">
                            <img alt=""  :src="big">

                          </div>
                        </el-image>
                      </div>
                    </div>
                    <div class="templateLeftSpan">
                      <div class="branchL"><p>{{data.name}}</p>
                        <span>{{data.size}}</span><span>库位：{{data.location}}</span>
                        <!--                    <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期"-->
                        <!--                                    :picker-options="pickerOptions">-->
                        <!--                    </el-date-picker>-->
                      </div>
                      <div class="branchR"><i class="CurrentQ">{{data.monomersN}}</i>
                        <el-button class="templateButton" style="position: absolute;bottom: 0;" v-if="data.type==1">包</el-button>
                      </div>
                    </div>
                  </div>
                </el-main>
              </li>
              <li v-if="leftInfo.loading"
                  style="text-align: center;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;">正在加载，请稍后
              </li>
              <li v-if="leftInfo.isFinsh"
                  style="text-align: center;color: #ddd;border: none; margin-top: 10px; margin-bottom: 5px;">没有更多数据了
              </li>
              <!--          <span  class="show-msg" >这里什么都没有了哦</span>-->
            </ul>
          </div>
        </div>
      </el-col>
    </el-main>
    <el-dialog title="请扫码" :visible.sync="dialogTableVisible" :modal="true" :fullscreen="fullscreen"
               custom-class="el-dialog__header-custom dialoVisible">
      <p class="textes">{{dataStas.name}},{{dataStas.location}}</p>
      <el-input v-model="inputSweep2" ref='gain' autofocus="autofocus" @keyup.enter="enterL2"
                placeholder="物资编码">
        <i slot="suffix" class="iconfont icon-icon-test46" @click="enterL2"></i>
      </el-input>
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
    <RecordInventory :accuseVisible="accuseVisible" @close-dialogStatus="Close_dialog" ref="listChild"></RecordInventory>
  </div>
</template>

<script>
  let speechSU = new window.SpeechSynthesisUtterance();
  import {
    enterLout, inquiry
  } from '@/api/library';
  import {debounce} from '@/utils/debounce';
  import {
    catalogs
  } from '@/api/material'
  import {
    openL, closeL, searchPage,submenuMenuId
  } from '@/api/systemsL'
  import big from '@/assets/images/big.jpg';
  import roadwayShelves from './stockOuter/roadwayShelves'
  import roadwayLayer from './stockOuter/roadwayLayer'
  import roadwayTunnel from './stockOuter/roadwayTunnel'
  import roadwayChoice from './stockOuter/roadwayChoice'
  import warehouseLie1 from './stockOuter/warehouseLie'
  import roadRetrieval from './stockOuter/roadRetrieval'
  import RecordInventory from '@/components/RecordInventory'

  export default {
    name: "stockOuter",
    components: {roadwayShelves, roadwayLayer, roadwayTunnel, roadwayChoice, warehouseLie1,roadRetrieval,RecordInventory},
    data() {
      return {
        state: '',
        inputSweep: '',
        inputSweep1: '',
        inputSweep2: '',
        materialName: '',
        id: '',
          accuseVisible: false,
        leftInfo: {
          loading: false,
          isFinsh: false,  //是否完成加载
          allSize: '',
          pageSize: 0,
          pageNumber: 1,
          dataList: [],
        },
        searchHouse: {
          pageSize: 10,
          pageNumber: 1,
          // keyWords:'',
        },
        big,
        searchHouse2: {
          pageSize: 10,
          pageNumber: 1,
          // keyWords:'',
        },
        searchtxt: '',
        cur: 0,
        houseList: [],
        houseList2: [],
        busy: true,
        busy2: true,
        houseNum: '',
        houseNum2: '',
        droping: false,
        mainShow: true,
        noMore: false,
        droping2: false,
        mainShow2: true,
        mainShow1: true,
        noMore2: false,
        listLoading: false,
        value2: '',
        gridData: [],
        checkedIdStr: [],
        inputVal: '',
        dataStas: '',
        lansen: '',
        monomersN: '',
        inputvisible: '',
        dialogTableVisible: false,
        chatlog: true,
          seachTexts:'',
        operation:'',
          oneStorehouse:'',
        fullscreen: false,// 弹窗是否全屏
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
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
      }
    },
    watch: {
      // searchtxt: function (val) {
      //   let timer = 0;
      //   clearTimeout(timer);
      //   timer = setTimeout(() => {
      //     this.queryClick(val);
      //   }, 1000)
      // },
      chatlog() {
        this.$nextTick(() => {
          let container = this.$el.querySelector("#leftBox");
          container.scrollTop = container.scrollHeight;
        })
      },

    },
    created() {
      // this.searchs();
      // this.$nextTick(() => {
      //   this.$refs.gain.focus()
      // });
      this.$watch('inputSweep', debounce((newQuery) => {
        this.enterL(newQuery);
      }, 2000));
      this.$watch('inputSweep2', debounce((newQuery) => {
        this.enterL2(newQuery);
      }, 2000));
      this.$watch('inputVal', debounce((val) => {
        if (val == "") {
          this.houseList2 = [];
          this.droping2 = false;
          this.noMore2 = false;
          this.mainShow2 = true;
          return
        }
        this.queryClick2(val);

      }, 1000));
      // this.$watch('searchtxt', debounce((val) => {
      //   if (val == "") {
      //     this.houseList = [];
      //     this.droping = false;
      //     this.noMore = false;
      //     this.mainShow = true;
      //     return
      //   }
      //   this.queryClick(val);
      //
      // }, 1000));
      let getS= sessionStorage.getItem('dataL');
      this.leftInfo.dataList=JSON.parse(getS);
      if(JSON.parse(getS)!==null){
        if (JSON.parse(getS).length > 0) {
          this.mainShow1 = false;
        } else {
          this.mainShow1 = true;
        }
      }
      this.submenuMenuId();
    },
    methods: {
      //清空数据
      emptyTray(){
        this.$confirm('确定清空界面数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('dataL');
          sessionStorage.removeItem('dataQ');
          this.leftInfo.dataList=[];
        }).catch(() => {

        });
      },
      //首页加载权限
      submenuMenuId() {
        let mv=this;
        submenuMenuId(mv.$store.state.user.Submenu.stockOut.id).then(response => {
          if(response.code !=='1'){
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
            if(response.data[1].children=='oneStorehouse'){
                mv.oneStorehouse=response.data[1].ststus;
            }

        });
      },
        Close_dialog (val) {
            this.accuseVisible = false
        },
        report(){
            let mv=this;
            let seachR=2;
            mv.seachTexts='出库记录';
            mv.accuseVisible = true;
            mv.$refs.listChild.accicy(seachR,mv.seachTexts);
        },

      //扫码查找
      queryClick2(val){
        let mv = this;
        if (val == ''||val.length<4) {
          return;
        }
        // this.searchtxt='';
        this.$router.push({name: 'roadRetrieval',query:{hoVal:val,operation:mv.operation,oneStorehouse:mv.oneStorehouse}})
      },
        //点击聚焦
        focusclick(){
            this.$refs.inputHT.focus()
        },
        focusclick1(){
            this.$refs.inputHT1.focus()
        },
        //打开库位列表
        showH(data) {
            let mv = this;
            mv.dialogTableVisible = true;
            mv.dataStas = data;
            mv.openTray(data);
            mv.$nextTick( () =>{
                mv.$refs.gain.focus()
            })
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
        //打开库位
        pushDataList(data) {
            let mv = this;
            mv.lansen = data.location;
            mv.openFullScreen2();
            mv.$store.state.LibraryLo=data.location;
        openL(data.location).then(res => {
            mv.$store.state.recordPrevious=1;
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
            mv.$message({
            type: 'success',
            message: res.msg,
            customClass:'zZindex'
          });
            // mv.openFullScreen2();
            mv.inputSweep2='';
          return false;
        }).catch(err => {
            mv.$message({
            type: 'error',
            message: err.msg
          });
          return false;
        });
      },
      //关闭
      closeTray() {
          let mv = this;
          mv.lansen=mv.$store.state.LibraryLo;
        if (mv.lansen == '') {
          this.$message({
            type: 'error',
            message: '请输入库位'
          });
          return false;
        }
        closeL(mv.lansen).then(response => {
            mv.$store.state.recordPrevious=0;
            mv.openFullScreen2();
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
        etrievalOpen() {
            let mv=this;
            let lan=mv.inputSweep1;
            if(lan=''){
                return;
            }
            let result=lan.split("-");
            if(this.$store.state.LibraryLo==''){
                mv.pushDataList1();
            }else {
                let resultData=this.$store.state.LibraryLo.split("-");
                let resultD1=parseInt(resultData.slice(0)[0]);
                let resultD2=parseInt(resultData.slice(1)[0]);
                let result1=parseInt(result.slice(0)[0]);
                let result2=parseInt(result.slice(1)[0]);
                if(resultData.length==result.length&&resultD1==result1&&resultD2==result2){
                    if(this.$store.state.recordPrevious==0){
                        mv.pushDataList1();
                    }else {
                        return;
                    }
                }else {
                    mv.pushDataList1();
                }
            }
        },
      //单独打开库位
        pushDataList1() {
          this.$refs.inputSotp.focus();
          this.lansen=this.inputSweep1;
          this.$store.state.LibraryLo=this.lansen;
        if (this.inputSweep1 == '') {
          this.$message({
            type: 'error',
            message: '请选择库位'
          });
          return false;
        }
            this.openFullScreen2();
        openL(this.inputSweep1).then(response => {
            this.$store.state.recordPrevious=1;
            this.openFullScreen2();
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
            });
            return
          }
          // this.locth=data.location;
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1000
          });
        }).catch(err => {
          this.$message({
            type: 'err',
            message: err.msg
          });
        })
      },

      searchs() {
        // this.materialName = this.input;
        this.enterL();
      },

      enterL2(newQuery) {
        let mv = this;
        if (newQuery == '') {
          return;
        }
        // if (this.dataStas.barcode == newQuery.toString().toUpperCase().substring(0, 4)||this.dataStas.hisCode== newQuery) {

          // this.$confirm('是否进行出库操作?', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
            enterLout({
              barCode: newQuery,
                bcode:mv.dataStas.barcode,
                barcodeSize:mv.dataStas.barcodeSize,
            }).then(res => {
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


                let L = sessionStorage.getItem('dataQ');
                let L2 = [].concat(res.data);
                if (!!L) {
                  L2 = [].concat(L2).concat(JSON.parse(L));
                }
                let fdata = this.F(L2);
                // // 分别将 未分组数据 和 分组数据 存入 sessionStorage
                //  分组
                sessionStorage.setItem('dataL', JSON.stringify(fdata));
                //未分组
                sessionStorage.setItem('dataQ', JSON.stringify(L2));
                this.leftInfo.dataList = fdata;
                if (fdata.length > 0) {
                  this.mainShow1 = false;
                } else {
                  this.mainShow1 = true;
                }
                // this.leftInfo.dataList.push(res.data);
                this.dialogTableVisible = false;
                this.inputSweep2 = '';
                speechSU.text = '已出库' + res.data.name + '1' + res.data.smallUnitDesc;
                window.speechSynthesis.speak(speechSU);
                // this.$router.push({name: 'warehouseLie',params:{data:res}})
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

      F(list){
        //分
        let arr1=[];
        let arr2=[];
        //取出来后和原来的排序
        // das.concat(list);
        list.some((so)=>{
          let idx=arr1.indexOf(so.barcode);
          if(idx>-1){
            arr2[idx].monomersN++
          }else {
            arr1.push(so.barcode);
            so.monomersN=1;
            arr2.push(so)
          }
        });
        return arr2;
      },
      loadMore2() {
        setTimeout(() => {
          let mv = this;
          if (!mv.busy2) {
            mv.busy2 = true;// 将无限滚动给禁用
            mv.searchHouse2.pageNumber++ // 增加页数
            mv.querySearch2(mv.inputVal);

          }
        }, 500);
      },



      loadMore() {
        setTimeout(() => {
          let mv = this;
          if (!mv.busy) {
            mv.busy = true;// 将无限滚动给禁用
            mv.searchHouse.pageNumber++ // 增加页数
            mv.querySearch(mv.searchtxt);
          }
        }, 500);
      },
      //物资搜索
      queryClick(val) {
        let mv = this;
        if (val == '') {
          return;
        }
        // mv.searchHouse.pageNumber = 1;
        // mv.houseList = [];
        // this.inputVal='';
        this.$router.push({name: 'roadRetrieval',query:{hoValick:val,operation:mv.operation,oneStorehouse:mv.oneStorehouse}})
      },
      //搜索
      querySearch(val) {
        let mv = this;
        if (val == "") {
          mv.houseList = [];
          mv.droping = false;
          mv.noMore = false;
          mv.mainShow = true;
          return
        }
        let hou = this.searchHouse;
        hou.keyWords = val;
        mv.mainShow = false;
        searchPage(this.Qs.stringify(hou)).then(res => {
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
        }).catch(function (error) {
          mv.$message({
            message: error.msg,
            type: 'error'
          });
          mv.droping = false
        });
      },
      loadAll() {
      },
    }

  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .textes{
    text-align: center;
    height: 30px;
    margin-bottom: 10px;
    font-size: 18px;
  }
  /*搜索*/
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

  .FraHeight {
    height: 100%;
    display: flex;
    position: relative;
  }

  .demo-inputVal-suffix {
    font-size: 20px;
    padding: 20px;

    .el-input {
      width: calc(100% - 110px);
    }
  }

  .demo-inputVal-suffix1 {
    font-size: 20px;
    padding: 20px;

    .el-input {
      width: calc(100% - 150px);
    }

    .suffix1Ls {
      font-size: 32px;
      color: #00b2ed;
    }
  }

  .matchingType {
    /*margin:0 ;*/
    height: 100%;
    background: #fff;
    overflow: hidden;
    flex: 1;
    margin-right: 0.104167rem;
    position: relative;
  }

  .matchingsubject:last-child .matchingType {
    margin-right: 0;
  }

  .templateOK {
    position: relative;
    float: right;
    margin-right: 50px;
  }

  /*头部*/
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

    .trayTime {
      float: right;
      margin: 14px 28.8px 14px 0;
      cursor: pointer;

      i {
        font-size: 34px;
        float: right;
        color: #adb0b0;
      }
    }

    .trayTime:hover i {
      color: #00b2ed;
    }

    .warningIcon {
      height: 72px;
      line-height: 72px;
      float: right;
      display: inline-block;

      .warningEarly, .periodEffective {
        float: right;
        display: flex;
        margin: 0 8.8px 0 0;

        :hover {
          i {
            color: #00b2ed;
          }

          span {
            color: #00b2ed;
          }
        }

        a {
          display: flex;
        }

        i {
          font-size: 34px;
          color: #adb0b0;
          vertical-align: middle;
          float: left;
        }

        span {
          font-size: 16px;
          padding-left: 18px;
          line-height: 72px;
          height: 72px;
        }

        b {
          font-size: 16px;
          padding-left: 10px;
          padding-right: 20px;
          color: red;
          font-weight: normal;
          line-height: 72px;
          height: 72px;
        }
      }
    }

    .pageSearch {
      float: right;
      margin-right: 28.8px;

      .pageAuto {
        display: flex !important;

        .el-input__suffix-inner {
          padding: 7px 5px 7px 0px;
          display: flex;
          vertical-align: middle;
          height: 100%;
        }

        i {
          font-size: 30px;
          cursor: pointer;
        }
      }

      .my-autocomplete {
        li {
          line-height: normal;
          padding: 7px;

          .name {
            text-overflow: ellipsis;
            overflow: hidden;
          }

          .addr {
            font-size: 12px;
            color: #b4b4b4;
          }

          .highlighted .addr {
            color: #ddd;
          }
        }
      }
    }
  }

  /*左侧列表*/
  .templateLeft {
    /*background: #fff;*/
    height: calc(100% - 94px);
    overflow-y: auto;

    li {
      float: left;
      font-size: 20px;
      width: 100%;
      /*line-height: 84px;*/
      /*height: 84px;*/
      border-bottom-color: #dde8ec;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      .templateLeftFrem {
        width: 138px;
        height: 100%;
        float: left;

        img {
          width: 100%;
          height: 100%;
        }
      }
      .templateLeftImg {
        /*width: 138px;*/
        height: auto;
        float: left;
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .templateLeftTu {
        padding-left: 20px;
        float: left;
        width: calc(100% - 138px);
        display: flex;

        .leftxinxi {
          flex: 1;
          position: relative;
        }

        .rightxinxi {
          width: 60px;

          span {
            text-align: right;
            font-size: 30px;
            color: #00b2ed;
          }
        }

        p {
        }

        span {
          float: left;
          font-size: 16px;
          margin-top: 10px;
          width: 100%;
        }


        .CurrentQ {
          float: right;
          font-style: normal;
          width: 100%;
          text-align: center;
          margin-bottom: 10px;
          font-size: 30px;
          color: #00b2ed;
        }

        button {
          float: right;
          color: #0eb2ea;
          border: 2px dashed #0eb2ea;
          padding: 5px;
          position: absolute;
          bottom: 0;
          right: 0;
        }

      }

      .templateLeftSpan {
        padding-left: 20px;
        float: left;
        width: calc(100% - 138px);
        display: flex;

        .branchL {
          flex: 1;
        }

        p {
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        span {
          float: left;
          font-size: 16px;
          margin-top: 10px;
          width: 100%;
        }

        .branchR {
          width: 60px;
          position: relative;
          .CurrentQ {
            float: right;
            font-style: normal;
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
            font-size: 30px;
            color: #00b2ed;
          }

          button {
            float: right;
            color: #0eb2ea;
            border: 2px dashed #0eb2ea;
            padding: 10px 10px;
            left: 50%;
            margin-left: -25%;
          }
        }

      }
    }

    .hit {
      background: #e7f9fe;
    }

    li:hover {
      background: #e7f9fe;
      cursor: pointer;
    }

  }

  .spanvertical {
    display: inline-block;
    position: relative;
    height: 100%;
  }

  .mainFrame {
    width: 100%;
    height: 200px;
    text-align: center;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    a{
      display: grid;
      width: 100%;
    }
    .mainLoader {
      display: grid;
      width: 100%;
      .wareInput {
        float: left;
        margin-top: 50px;

        input {
          height: 100px !important;
        }

        i {
          height: 100%;
          vertical-align: middle;
          display: inline-block;
          margin-top: 2px;
          font-size: 50px;
        }
      }

      .color-main {
        display: block;
        margin: 0 auto;
        height: 80px;
        width: 80px;
      }

      .loader1 {
        display: flex;
        justify-content: center;
        text-align: center;
        vertical-align: middle;
        margin-top: 20px;
      }

      p {
        font-size: 28px;
        color: #7c8084;
        margin-top: 20px;
      }
    }

  }
  .mainfize{
    font-size: 30px;
    text-align: center;
  }
</style>
