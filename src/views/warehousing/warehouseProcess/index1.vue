<template>
  <div style="display: inline;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <!--        <el-button type="primary" class="trayClose colorsGreen">打开托盘</el-button>-->
        <el-button type="primary" @click="closeTray" class="trayClose">关闭托盘</el-button>
        <el-button type="primary" class="trayClose colorsGreen" @click="etrievalOpen">打开托盘</el-button>
        <el-input class="trayTime" style="float: right;width: 100px" v-model="inputSweep1" placeholder="库位"></el-input>
        <el-button type="primary" class="trayClose" @click="emptyTray">清空</el-button>
        <!--        <el-input class="trayTime" style="float: right;width: 100px" v-model="input1" placeholder="库位"></el-input>-->
      </div>
    </div>
    <el-main :gutter="20" style="height: 100%">
      <el-col :span="8" class="spanvertical matchingsubject">
        <div class="matchingType">
          <div class="demo-inputVal-suffix">
            扫码查找：
            <el-input
              v-model="inputVal" @keyup.enter.native="queryClick2(inputVal)" class="inputs1" placeholder="点击这里开始扫码"
            >
              <i slot="suffix" @click="queryClick2(inputVal)" class="iconfont icon-icon-test46"></i>
            </el-input>
          </div>
          <div class="mainFrame" v-show="mainShow2">
            <div class="mainLoader">
              <svg-icon icon-class="17" class="color-main"></svg-icon>
              <div class="loader1" style="text-align: center">
                <div class="loader-inner ball-beat">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <p>请扫码</p>
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

<!--                        <el-button class="templateOK" type="primary"-->
<!--                                   style="padding: 10px; color: #fff; border-style: solid"-->
<!--                                   v-if="" @click="showH(data)">打开-->
<!--                        </el-button>-->
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
      <el-col :span="8" class="spanvertical matchingsubject">
        <div class="matchingType">
          <div class="demo-inputVal-suffix">
            扫码入库：
            <el-input
              ref='gain' v-model="inputSweep" autofocus="autofocus" @keyup.enter="queryClick1"
              placeholder="物资编码">
              <i slot="suffix" class="iconfont icon-icon-test46" @click="queryClick1"></i>
            </el-input>
          </div>
          <div class="mainFrame" v-show="mainShow1">
            <div class="mainLoader">
              <svg-icon icon-class="17" class="color-main"></svg-icon>
              <div class="loader1" style="text-align: center">
                <div class="loader-inner ball-beat">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <p>请扫码</p>
              <!--            <el-input class="wareInput" >-->
              <!--              <i slot="suffix" class="iconfont icon-icon-test46"></i>-->
              <!--            </el-input>-->
            </div>
          </div>

          <div class="templateLeft">
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
                      <div class="branchL">
                        <p>{{data.name}}</p><span>{{data.size}}</span><span>库位：{{data.location}}</span>
                        <div class="branchpointer">
                          <el-date-picker v-model="selectVal[index]" align="right" style="margin-top: 5px" type="date"
                                          placeholder="选择效期日期"
                                          popper-class="picker-no-text"
                                          :picker-options="pickerOptions">
                          </el-date-picker>
                          <el-button class="templateButton" style="margin-top: 5px;"
                                     @click="addValid(data.id,selectVal[index])">确定
                          </el-button>
                        </div>
                      </div>
                      <div class="branchR"><i class="CurrentQ">{{data.monomersN}}</i>
                        <el-button class="templateButton" style="position: absolute;bottom: 0;" v-if="data.type==1">包</el-button>
                        <!--                    v-if="data.type==1"-->
                      </div>
                    </div>
                  </div>

                </el-main>
              </li>
              <!--          <span  class="show-msg" >这里什么都没有了哦</span>-->
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="spanvertical matchingsubject ">

        <div class="matchingType">
          <div class="demo-inputVal-suffix1">
            搜索物资：
            <el-input
              v-model="searchtxt" @keyup.enter.native="queryClick(searchtxt)" class="inputs1" placeholder="输入关键字搜索">
              <i @click="queryClick(searchtxt)" slot="suffix" class="iconfont icon-icon-test35"></i>
            </el-input>
          <!--搜索物资-->

          </div>
          <div class="mainFrame" v-show="mainShow">
            <div class="mainLoader">
              <svg-icon icon-class="37" class="color-main"></svg-icon>
              <div class="loader1" style="text-align: center">
                <div class="loader-inner ball-beat">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <p>请搜索</p>
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
<!--                        <el-button class="templateOK" type="primary"-->
<!--                                   style="padding: 10px; color: #fff; border-style: solid"-->
<!--                                   v-if="" @click="showH(data)">打开-->
<!--                        </el-button>-->
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

    </el-main>
    <el-dialog title="库位" custom-class="gridK" :close-on-click-modal="false" :visible.sync="dialogTableV" width="200px">
      <el-table
        :data="gridData"
        style="width: 100%" @row-click="gridClick">
        <el-table-column property="location" label="库位"></el-table-column>
<!--        <el-table-column-->
<!--          label="库位"-->
<!--          width="180">-->
<!--          <template slot-scope="scope">{{scope.row.location}}</template>-->
<!--        </el-table-column>-->

      </el-table>

    </el-dialog>
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
  </div>


</template>

<script>
  let speechSU = new window.SpeechSynthesisUtterance();
  import big from '@/assets/images/big.jpg';
  import {debounce} from '@/utils/debounce';
  import {
    enterL, inquiry, addDateS
  } from '@/api/library'
  import {
    openL, closeL, searchPage
  } from '@/api/systemsL'
  import {
    catalogs
  } from '@/api/material'

  export default {
    name: "warehouseProcess",
    data() {
      return {
        state: '',
        inputSweep: '',
        inputSweep1: '',
        inputSweep2: '',
        materialName: '',
        id: '',
        leftInfo: {
          loading: false,
          isFinsh: false,  //是否完成加载
          allSize: '',
          pageSize: 0,
          pageNumber: 1,
          dataList: [],
        },
        big,
        selectVal: [],
        searchHouse: {
          pageSize: 10,
          pageNumber: 1,
          // keyWords:'',
        },
        searchHouse1: {
          pageSize: 10,
          pageNumber: 1,
          // keyWords:'',
        },
        searchHouse2: {
          pageSize: 10,
          pageNumber: 1,
          // keyWords:'',
        },
        inputOutput: '',
        searchtxt: '',
        cur: 0,
        houseList: [],
        houseList1: [],
        houseList2: [],
        busy: true,
        busy1: true,
        busy2: true,
        houseNum : '',
        houseNum1 : '',
        houseNum2 : '',
        droping: false,
        droping2: false,
        noMore: false,
        noMore2: false,
        mainShow: true,
        mainShow1: true,
        mainShow2: true,
        listLoading: false,
        lansen: '',
        value2: [],
        gridData: [],
        checkedIdStr: [],
        inputVal: '',
        dataStas: '',
        dataL: [],
        kuKun:'',
        monomersN: '',
        inputvisible: '',
        dialogTableVisible: false,
        dialogTableV:false,
        chatlog: true,
        fullscreen: false,// 弹窗是否全屏
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
          }, {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },

      }
    },
    watch: {
      chatlog() {
        this.$nextTick(() => {
          let container = this.$el.querySelector("#leftBox");
          container.scrollTop = container.scrollHeight;
        })
      },

    },
    created() {
      // this.searchs();
      //刷新就输入框选中
      this.$nextTick(() => {
        this.$refs.gain.focus()
      });
      this.$watch('inputSweep', debounce((newQuery) => {
        if (newQuery == "") {
          // this.houseList1 = [];
          // this.mainShow1 = true;
          return
        }else {
          this.queryClick1(newQuery);
        }

      }, 2000));
      this.$watch('inputSweep2', debounce((newQuery) => {
        this.enterL2(newQuery);
      }, 2000));
      //扫码查找
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
      //搜索物资
      this.$watch('searchtxt', debounce((val) => {
        if (val == "") {
          this.houseList = [];
          this.droping = false;
          this.noMore = false;
          this.mainShow = true;
          return
        }
        this.queryClick(val);

      }, 1000));
      //入库
      let getS= sessionStorage.getItem('dataO');
      this.leftInfo.dataList=JSON.parse(getS);
      if(JSON.parse(getS)!==null){
        if (JSON.parse(getS).length > 0) {
          this.mainShow1 = false;
        } else {
          this.mainShow1 = true;
        }
      }
    },
    methods: {
      //打开库位
      munOK(data) {
        let vm = this;
        vm.lansen = data.location;
        openL(data.location).then(res => {

          // data.supplyQuantity =data.realQuantity;
          // data.checkStatus=1;
          // this.valueEquals=true;
          vm.$message({
            type: 'success',
            message: res.msg,
            customClass:'zZindex'
          });
          return false;
        }).catch(err => {
          vm.$message({
            type: 'error',
            message: err.msg,
            customClass:'zZindex'
          });
          return false;
        });
      },
      //清空数据
      emptyTray(){
        this.$confirm('确定清空界面数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('dataO');
          sessionStorage.removeItem('dataN');
          this.leftInfo.dataList = [];
        }).catch(() => {

        });
      },
      //关闭托盘
      closeTray() {
        if (this.lansen == '') {
          this.$message({
            type: 'error',
            message: '请输入库位',
            customClass:'zZindex'
          });
          return false;
        }
        closeL(this.lansen).then(response => {
            this.$store.state.recordPrevious=0;
            this.openFullScreen2();
          this.$message({
            type: 'success',
            message: response.msg,
            customClass:'zZindex'
          });
          return false;
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err.msg,
            customClass:'zZindex'
          });
          return false;
        })
      },
      //打开托盘
      etrievalOpen() {
        if (this.inputSweep1 == '') {
          this.$message({
            type: 'error',
            message: '请选择库位'
          });
          return false;
        }
        openL(this.inputSweep1).then(response => {
          this.openFullScreen2();
          // this.locth=data.location;
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1000,
            customClass:'zZindex'
          });
        }).catch(err => {
          this.$message({
            type: 'err',
            message: err.msg
          });
        })
      },
      //打开库位列表(现阶段不要)
      showH(data) {
        this.dialogTableVisible = true;
        this.dataStas = data;
        this.munOK(data);
        this.$nextTick( () =>{
          this.$refs.gain.focus()
        })
      },
      //存到本地的函数调用
      F(list){
        //分
        let arr1=[];
        let arr2=[];
        //取出来后和原来的排序
        // das.concat(list);
        list.some((so)=>{
          let idx=arr1.indexOf(so.barcode);
          // let idx1=arr1.indexOf(so.location);
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
      //输入效期
      addValid(id, selectVal) {
        if (selectVal == '') {
          this.$message({
            type: 'error',
            message: '请输入效期',
            customClass:'zZindex'
          });
          return;
        }
        this.$confirm('确定效期时间?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          addDateS({
            id: id,
            valid: selectVal
          }).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000,
              customClass:'zZindex'
            });
          })
        }).catch(() => {

        });
      },

      //扫码查找翻页
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
      //扫码查找
      queryClick2(val) {
        let mv = this;
        if (val == '' || val.length < 4) {
          return;
        }
        mv.searchHouse2.pageNumber = 1;
        mv.houseList2 = [];

        this.busy2 = false // 将无限滚动给打开
        mv.querySearch2(val);
      },
      //扫码查找搜索
      querySearch2(val) {
        let mv = this;
        if (val == "" || val.length < 4) {
          mv.houseList2 = [];
          mv.droping2 = false;
          mv.noMore2 = false;
          mv.mainShow2 = true;
          return
        }
        let hou = this.searchHouse2;
        hou.barCode = val;
        mv.mainShow2 = false;
        catalogs(hou).then(res => {
          let listTotal = res.data.total;
          if (listTotal > 0) {
            this.busy2 = true
          } else {
            this.busy2 = false
          }
          this.loading = false;
          mv.houseList2 = mv.houseList2.concat(res.data.result);
          let DownloadTotal =
            (mv.searchHouse2.pageNumber + 1) * mv.searchHouse2.pageSize;
          let total = res.data.total;
          mv.houseNum2 = total;
          let totalPage = (mv.houseNum2 + mv.searchHouse2.pageSize) / mv.searchHouse2.pageSize;
          // mv.searchHouse.pageNumber++; //增加页数
          if (mv.searchHouse2.pageNumber + 1 >= totalPage) {
            this.busy2 = true // 将无限滚动关闭
            this.searchHouse2.pageNumber = 0 // 页数变为0
            this.noMore2 = true // 切换底部提示信息
            this.droping2 = false
          } else {
            this.busy2 = false // 将无限滚动给打开
            this.droping2 = true
            this.noMore2 = false // 切换底部提示信息
          }
        }).catch(function (error) {
          mv.$message({
            message: error.msg,
            type: 'error'
          });
          mv.droping2 = false
        });
      },

      //当有多个库位的时候
      gridClick(val) {
        let mv = this;
        mv.lansen = val.location;
        enterL({
          barCode: val.barcode,
          location: val.location,
            bcode:mv.dataStas.barcode,
            barcodeSize:mv.dataStas.barcodeSize,
        }).then(res => {
          if (res.code == '-1') {
            // this.dialogTableV = true;

          } else if (res.code == '-1') {
            this.$message({
              message: res.msg,
              type: 'error',
              duration: 1000
            });
            speechSU.text = res.msg;
            window.speechSynthesis.speak(speechSU);
            return
          } else if (res.code == '-4') {
            this.$message({
              message: res.msg,
              type: 'error',
              duration: 1000
            });
            speechSU.text = res.msg;
            window.speechSynthesis.speak(speechSU);
            return
          } else if (res.code == 1) {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000
            });
            // this.dialogTableV = false;

            let L=sessionStorage.getItem('dataN');
            let L2 = [].concat(res.data);
            if(!!L){
              L2 = [].concat(L2).concat(JSON.parse(L));
            }
            let fdata = this.F(L2);
            // // 分别将 未分组数据 和 分组数据 存入 sessionStorage
            //  分组
            sessionStorage.setItem('dataO',JSON. stringify(fdata));
            //未分组
            sessionStorage.setItem('dataN',JSON. stringify(L2));
            this.leftInfo.dataList=fdata;
            if (fdata.length > 0) {
              this.mainShow1 = false;
            } else {
              this.mainShow1 = true;
            }
            this.inputSweep = '';
            speechSU.text = res.msg;
            window.speechSynthesis.speak(speechSU);
          }
        })
      },

      //搜索成功后入库
      enterL() {
        let mv = this;
        if (mv.inputSweep == '') {
          return;
        }
        // this.$confirm('是否进行入库操作?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
          enterL({
            barCode: mv.inputSweep,
            location: mv.dataStas.location,
              bcode:mv.dataStas.barcode,
              barcodeSize:mv.dataStas.barcodeSize,
          }).then(res => {
           if (res.code == '-1') {
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 1000,
              });
              speechSU.text = res.msg;
              window.speechSynthesis.speak(speechSU);
              return
            } else if (res.code == '-4') {
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 1000,
                customClass:'zZindex'
              });
              speechSU.text = res.msg;
              window.speechSynthesis.speak(speechSU);
              return
            } else if (res.code == 1) {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1000
              });


              speechSU.text = '已入库'+res.data.name+'1'+res.data.smallUnitDesc;
              window.speechSynthesis.speak(speechSU);
              let L=sessionStorage.getItem('dataN');
              let L2 = [].concat(res.data);
              if(!!L){
                L2 = [].concat(L2).concat(JSON.parse(L));
              }
              let fdata = this.F(L2);
              // // 分别将 未分组数据 和 分组数据 存入 sessionStorage
              //  分组
              sessionStorage.setItem('dataO',JSON. stringify(fdata));
              //未分组
              sessionStorage.setItem('dataN',JSON. stringify(L2));
              this.leftInfo.dataList=fdata;
              if (fdata.length > 0) {
                this.mainShow1 = false;
              } else {
                this.mainShow1 = true;
              }
              this.dialogTableVisible = false;
              // this.dialogTableV = false;
              this.inputSweep = '';
            }
          }).catch((err) => {
            console.log(err);
          })
        // }).catch(() => {
        //   // this.$message({
        //   //   type: 'info',
        //   //   message: '已取消发货'
        //   // });
        // });
      },



      //弹框扫码入库
      enterL2(newQuery) {
        let mv = this;
        if (newQuery == '') {
          return;
        }
        // if (this.dataStas.barcode == newQuery.toUpperCase().substring(0, 4)||this.dataStas.hisCode == mv.inputSweep) {
          // this.$confirm('是否进行入库操作?', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
            enterL({
              barCode: newQuery,
              location: mv.dataStas.location,
                bcode:mv.dataStas.barcode,
                barcodeSize:mv.dataStas.barcodeSize,
            }).then(res => {
              if (res.code == '-1' ) {
                this.gridData = res.data;

                // this.dialogTableV = true;
                this.$message({
                  message: res.msg,
                  type: 'error',
                  duration: 1000
                });
                speechSU.text = res.msg;
                window.speechSynthesis.speak(speechSU);
              } else if (res.code == '-1') {
                this.$message({
                  message: res.msg,
                  type: 'error',
                  duration: 1000,
                  customClass: 'zZindex'
                });
                speechSU.text = res.msg;
                window.speechSynthesis.speak(speechSU);
                return
              } else if (res.code == '-4') {
                this.$message({
                  message: res.msg,
                  type: 'error',
                  duration: 1000,
                  customClass: 'zZindex'
                });
                speechSU.text = res.msg;
                window.speechSynthesis.speak(speechSU);
                return
              } else if (res.code == 1) {
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 1000,
                  customClass: 'zZindex'
                });
                speechSU.text = '已入库' + res.data.name + '1' + res.data.smallUnitDesc;
                window.speechSynthesis.speak(speechSU);
                let L = sessionStorage.getItem('dataN');
                let L2 = [].concat(res.data);
                if (!!L) {
                  L2 = [].concat(L2).concat(JSON.parse(L));
                }
                let fdata = this.F(L2);
                // // 分别将 未分组数据 和 分组数据 存入 sessionStorage
                //  分组
                sessionStorage.setItem('dataO', JSON.stringify(fdata));
                //未分组
                sessionStorage.setItem('dataN', JSON.stringify(L2));
                this.leftInfo.dataList = fdata;
                if (fdata.length > 0) {
                  this.mainShow1 = false;
                } else {
                  this.mainShow1 = true;
                }

                this.dialogTableVisible = false;
                // this.dialogTableV = false;
                this.inputSweep2 = '';
                // this.$router.push({name: 'warehouseLie',params:{data:res}})
              }
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
        //     duration: 1000,
        //     customClass:'zZindex'
        //   });
        //   speechSU.text = '物资编码与实际物资编码不相同';
        //   window.speechSynthesis.speak(speechSU);
        //   return;
        // }
      },





      loadMore1() {
        setTimeout(() => {
          let mv = this;
          if (!mv.busy1) {
            mv.busy1 = true;// 将无限滚动给禁用
            mv.searchHouse1.pageNumber++ // 增加页数
            mv.querySearch1(mv.inputVal);
          }
        }, 500);
      },


      //扫码入库查找
      queryClick1(val) {
        let mv = this;
        if (val == '' || val.length < 4) {
          return;
        }
        mv.searchHouse1.pageNumber = 1;
        mv.houseList1 = [];

        this.busy1 = false // 将无限滚动给打开
        mv.querySearch1(val);
      },

      //扫码入库搜索
      querySearch1(val) {
        let mv = this;
        if (val == "" || val.length < 4) {
          mv.houseList1 = [];
          return
        }
        let hou = this.searchHouse1;
        hou.barCode = val;
        catalogs(hou).then(res => {
          let listTotal = res.data.total;
          let listst = res.data.result;
          // let kuK=res.data.result;
          // for(let i=0;i<kuK.length;i++){
          //   mv.kuKun= kuK[i].location;
          // }
          if(listTotal>1){
            this.gridData = res.data.result;
            // mv.dialogTableV=true;

          }else {
            mv.enterL();
          }

          // if (listTotal > 0) {
          //   this.busy1 = true
          // } else {
          //   this.busy1 = false
          // }
          // this.loading = false;
          // // mv.houseList1 = mv.houseList1.concat(res.data.result);
          // // let DownloadTotal =
          // //   (mv.searchHouse1.pageNumber + 1) * mv.searchHouse1.pageSize;
          // let total = res.data.total;
          // mv.houseNum1 = total;
          // let totalPage = (mv.houseNum1 + mv.searchHouse1.pageSize) / mv.searchHouse1.pageSize;
          // // mv.searchHouse.pageNumber++; //增加页数
          // if (mv.searchHouse1.pageNumber + 1 >= totalPage) {
          //   this.busy1 = true // 将无限滚动关闭
          //   this.searchHouse1.pageNumber = 0 // 页数变为0
          // } else {
          //   this.busy1 = false // 将无限滚动给打开
          // }
        }).catch(function (error) {
          mv.$message({
            message: error.msg,
            type: 'error'
          });
        });
      },

      loadMore() {
        setTimeout(() => {
          let mv = this;
          if (!mv.busy) {
            mv.busy = true;// 将无限滚动给禁用
            mv.searchHouse.pageNumber++;// 增加页数
            mv.querySearch(mv.searchtxt);
          }
        }, 500);
      },
      //搜索物资
      queryClick(val) {
        let mv = this;
        if (val == '') {
          return;
        }
        mv.searchHouse.pageNumber = 1;
        mv.houseList = [];

        this.busy = false // 将无限滚动给打开
        mv.querySearch(val);
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

  .branchpointer {
    display: flex;
    float: left;
  }

  .FraHeight {
    height: 100%;
    display: flex;
    position: relative;
  }

  .demo-inputVal-suffix {
    font-size: 20px;
    padding: 20px;
    display: flex;
    line-height: 40px;

    .el-input {
      flex: 1;
    }
  }

  .demo-inputVal-suffix1 {
    font-size: 20px;
    padding: 20px;
    display: flex;
    line-height: 40px;

    .el-input {
      flex: 1;
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
    width: 200px;
    height: 200px;
    text-align: center;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .mainLoader {
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

</style>
