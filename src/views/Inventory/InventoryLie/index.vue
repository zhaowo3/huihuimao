<template>
  <div style="height: 100%;">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <el-button type="primary" class="trayClose" @click="closeTray" id="hamburger-closeL" v-if="numberCheck==1">关闭托盘</el-button>
        <el-button type="primary" v-if="ishidden&&numberCheck==1"  @click="finishingNuclearNo" class="trayClose" >核实</el-button>
        <el-button type="primary" v-if="ishidden&&numberCheck==1"  @click="StatusListNuc" class="trayClose" >核实查询</el-button>
        <el-button type="primary" v-if="ishiddenOK&&numberCheck==1" id="hamburger-verify" @click="finishingNuclear" class="trayClose">核实完毕</el-button>
        <div class="autoSeach" id="hamburger-searcts">
          <el-input v-model="searchtxt"  @keyup.enter.native="queryClick(searchtxt)"
                    class="inputs1" placeholder="请输入关键字" clearable ref="inRefs">
            <i class="iconfont icon-icon-test35" @click="queryClick(searchtxt)" slot="suffix"></i>
          </el-input>
        </div>
      </div>
    </div>
    <el-container style="height: 100%;">
      <el-header class="effectiveHead" style="height:auto;">
        <el-row class="effectiveLie">
          <el-button @click="numSort" id="hamburger-NumberNameL">实际数量
            <i class="el-icon-caret-bottom" v-if="iconBottom"></i><i class="el-icon-caret-top" v-if="iconTop"></i>
          </el-button>
          <el-button @click="numLocation" id="hamburger-numLocation">库位
            <i class="el-icon-caret-bottom" v-if="iconBottoms"></i><i class="el-icon-caret-top" v-if="iconTops"></i>
          </el-button>
          <el-button  @click="searchLocation" class="searchHit1" :class="{hit1:searchHouse.searchType===1}">预警筛选</el-button>
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
          <p class="infoNum"><span>已显示:{{current}},</span><span>总数:{{houseNum}}</span></p>
        </el-row>

      </el-header>
      <el-main v-loading="listLoading" style="padding-top: 5px;">
        <el-row :gutter="20" class="templateRight" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                infinite-scroll-distance="10">
          <div style="height:100%; ">
            <ul id="leftBox" class="newsList" style="padding-top: 2px">
              <li v-for="(data,index) in houseList" :key="index">
                <el-col :span="12">
                  <el-row class="templateLis">
                    <div class="templateHover">
                      <div class="templateImg">
                        <el-image :src="data.imgUrl">
                          <div slot="error" class="image-slot">
                            <img alt="" :src="smalls" >
                          </div>
                          <div slot="placeholder" class="image-slot">
                            <img alt="" :src="smalls" >

                          </div>

                        </el-image>
                        <i class="iconfont icon-mianma-" v-if="data.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;">

                      </i><i class="iconfont icon-yiwuyima" v-if="data.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i>
                      </div>
                      <el-card class="templateR templateHeight">
                        <div style="height: 100%; position: relative;width: 100%;">

                          <el-col :span="16" style='position: relative;height: 100%;'>

                            <h4 :title="data.name" >{{data.name}}</h4>
                            <h4 :title="data.alias" >{{data.alias}}</h4>
                            <span class="templateTitle" :title="data.size">{{data.size}}</span>
                            <span class="templateTitle">效期:{{data.validDate|subStringTime}}</span>
                            <h3>{{data.hisCode}}</h3>
                          </el-col>
                          <el-col :span="8" v-if="validator" style='position: relative;height: 100%;'>
                            <!--                        <div class="templateTime"><b>{{data.times}}</b><p>剩余:</p><span >{{data.time}}</span></div>-->
                            <p class="templateP" :class="data.supplyQuantity<data.warnQuantity?'detailgrey':''" >{{data.supplyQuantity}}</p>
<!--                            <p class="templateP" >{{data.supplyQuantity}}</p>-->

                            <el-button class="templateButton" v-if="validator">{{data.bigUnitDesc}}</el-button>

                          </el-col>

                          <el-col :span="8" v-if="valueEquals" style='position: relative;height: 100%;'>

                            <el-tag type="success" class="templateLabel" v-if="data.checkStatus">已核实</el-tag>
                            <p class="templateP" :class="data.supplyQuantity<data.warnQuantity?'detailgrey':''">{{data.supplyQuantity}}</p>
<!--                            <p class="templateP" >{{data.supplyQuantity}}</p>-->
                            <!--                        <div class="templateTime"><b>{{data.times}}</b><p>剩余:</p><span >{{data.time}}</span></div>-->

                              <el-input-number v-model="data.realQuantity" id="hamburger-realQuantity" v-if="antity&&numberCheck==1&&data.codeType !==1" @change="" :min="0" :max="999"
                                               label="描述文字" class="detailsNum"></el-input-number>
                            <el-button style="float: right" v-if="data.codeType ==1" @click="ThingClick(data)">
                              详情
                            </el-button>

                          </el-col>
                          <el-col :span="24">
                            <div class="leftHightS">
                              <span class="templateVerify"><b>上期核实时间:</b><p :title="data.stockDate">{{data.stockDate}}</p></span>
                              <div  class="templateEmptys">
                                <el-button class="templateOK colorsGreen" id="hamburger-pushOpen" @click="openTray(data)"  v-if="antity&&numberCheck==1">打开</el-button>
                              </div>

                              <span class="templateSpan"><b>库位:</b><p>{{data.location}}</p>
                        </span>
                              <el-button class="templateButton" id="hamburger-ButtonPush" @click="munOb(data)" @keyup.enter.native="munOb(data)"  v-if="antity&&numberCheck==1">确定</el-button>
                            </div>
                          </el-col>
                        </div>
                      </el-card>
                    </div>
                  </el-row>
                </el-col>

              </li>
              <li
                style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px; float: left;"
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
    <el-dialog
      title="一物一码详情"
      :visible.sync="ThingDialogVisible"
      width="770px" custom-class="DIFitionHistory" :before-close="handleClose">
      <el-table :data="thingData" @row-click="ThingDetails" max-height="300">
        <el-table-column property="intactBarcode" label="条码"></el-table-column>
        <el-table-column property="validDate" label="效期"></el-table-column>
        <el-table-column property="inOperator" label="存入人员"></el-table-column>
        <el-table-column property="inTime" label="存入时间"></el-table-column>
        <el-table-column property="inTime" label="操作" width="90">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.$index,scope.row)" type="danger" class="clickThing" size="small">出库</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-dialog>
    <el-dialog
      title="未核实列表"
      :visible.sync="StatusDialogVisible"
      width="700px" custom-class="DIFitionHistory" :before-close="StatusClose">
      <el-table :data="StatusList" max-height="300">
        <el-table-column property="name" label="名称"></el-table-column>
        <el-table-column property="alias" label="别名"></el-table-column>
        <el-table-column property="size" label="规格"></el-table-column>
        <el-table-column property="supplyQuantity" width="70px" label="数量"></el-table-column>
      </el-table>
      <p style="text-align: center; height: 50px; line-height: 50px;" v-if="statusNun!==0"><b style="font-weight: normal;">以上<span style="color: red;font-size: 18px;">{{statusNunT}}</span>个没盘库,</b>还剩<span style="color: red;font-size: 18px;">{{statusNun}}</span>条未加载</p>
    </el-dialog>
  </div>
</template>

<script>
  import smalls from '@/assets/images/small.jpg';
  import {debounce} from '@/utils/debounce';
  import {
    databaseli, stockO,deviceList,quantityDetail
  } from '@/api/material'
  import {
    getInfo
  } from '@/api/login'
  import {
      enterLout
  } from '@/api/library';
  import {
    openL, closeL, searchStockList,submenuMenuId,recordInventory
  } from '@/api/systemsL'

  export default {
    name: "InventoryLie",
    data() {
      return {
        validator: false,
        valueEquals: true,
        ishidden: false,
        ishiddenOK: true,
        listLoading: false,
        loading: false,
        houseList: [],
        restaurants: [],
          ThingDialogVisible:false,
          StatusDialogVisible:false,
        searchHouse: {
          pageSize: 10,
          pageNumber: 0,
          columnName: 'location',
          orderType: 'asc',
            searchType: 0,
          // keyWords: '',
          deviceNo:'',
        },
          Coolkdata:[],
        value3:'全部',
        antity: true,
        iconBottom: true,
        iconTop: false,
          iconBottoms: true,
          iconTops: false,
        houseNum: '',
        lansen: '',
        smalls,
        busy: false,
        droping: false,
        noMore: false,
        realQuantity: '',
        supplyQuantity: '',
        searchtxt: '',
        numberCheck:'',
        options2:[],
          thingData:[],
          StatusList:[],
        serverdesk: {},
        remind: {},
          statusNun:'',
          statusNunT:'',
          machineDeviceNo:'',
          ip: '',
          valueO:0,
          current:'',
      };
    },
    created() {
      // if(this.$route.params.inputNO!==''){
      //   this.searchtxt=this.$route.params.inputNO;
      //
      // }
        this.operationIndex();
      this.$watch('searchtxt', debounce((newQuery) => {
        this.queryClick(newQuery);
      }, 1000));
      this.submenuMenuId();

    },
      filters:{
          subStringTime(time){
              if (time !== '' && time !== null) {
                  time = time.substring(0,10);
                  // time = time.replace(/-/,'年').replace(/-/,'月') + "日";
                  return time;
              }
          },
      },
    mounted() {
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
    methods: {
      queryClick(val) {
        let mv = this;
        mv.searchHouse.pageNumber = 1;
        mv.houseList = [];
          mv.$nextTick( () =>{
              mv.$refs.inRefs.focus()
          })
        mv.querySearch(val);

      },
      //搜索
      querySearch(val) {
        let mv = this;
        let hou = this.searchHouse;
        hou.keyWords = val;
        searchStockList(this.Qs.stringify(hou)).then(res => {
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
                mv.droping = false;
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
            duration: 1000,
          });
          this.droping = false
        });
      },
      //  一物一码详情
        ThingClick(data){
            const maup = {
                location: data.location,
                barcode:  data.barcode,
            }
            quantityDetail(maup).then(response => {
                if (response.code !== '1') {
                    this.$message({
                        message: response.msg,
                        type: 'error',
                    });
                    return
                }
                this.thingData=response.data;
                this.Coolkdata=data;
                this.ThingDialogVisible=true;
            });
        },
      //  选择一物一码的物资
        ThingDetails(){

        },
        handleClose(done){
            done();
        },
        StatusClose(done){
            done();
        },

      //关闭
      closeTray() {
          this.lansen = this.$store.state.LibraryLo;
        if (this.lansen == '') {
          this.$message({
            type: 'error',
            message: '请输入库位',
            duration: 1000,
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
          this.openFullScreen2();
          this.$message({
            type: 'success',
            message: response.msg,
            duration: 1000,
          });
          return false;
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err.msg,
            duration: 1000,
          });
          return false;
        })
      },



        handleClick(index,row){
            let mv = this;
            if (row.intactBarcode == '') {
                return;
            }
            this.$confirm('是否进行出库操作?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
            enterLout({
                barCode: row.intactBarcode,
                location:mv.Coolkdata.location,
                number:1,
                codeType:mv.Coolkdata.codeType,
                barcodeSize:mv.Coolkdata.barcodeSize,
                bcode:mv.Coolkdata.barcode,
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
                        message: res.msg,
                        type: 'success',
                        duration: 1000
                    });
                }
                mv.thingData.splice(index, 1);
                mv.houseList.map(items=>{
                    if(items.id==mv.Coolkdata.id){
                        items.supplyQuantity-=1;
                    }
                });
                if(mv.thingData.length==0){
                    mv.ThingDialogVisible=false;
                }


            }).catch((err) => {
                console.log(err);
            })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消出库'
              });
            });
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
      munOb(data) {
        let vm = this;
        stockO({
          id: data.id,
          number: data.realQuantity,
        }).then(res => {
          if(res.code !=='1'){
            this.$message({
              message: res.msg,
              type: 'error',
              duration: 1000,
            });
            return
          }
          data.supplyQuantity = data.realQuantity;
          data.checkStatus = 1;
          this.valueEquals = true;
          vm.$message({
            type: 'success',
            message: res.msg,
            duration: 500,
          });
          return false;
        }).catch(err => {
          vm.$message({
            type: 'error',
            message: err.msg,
            duration: 500,
          });
          return false;
        });
      },
      //首页加载权限
      submenuMenuId() {
        let mv=this;
        submenuMenuId(mv.$store.state.user.Secondm.Inventory.id).then(response => {
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
              duration: 1000,
            });
            return
          }
          // mv.jurisdiction = response.data;
          if(response.data[0].children=='numberCheck'){
            mv.numberCheck=response.data[0].ststus;
          }

        });
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
            vm.$store.state.LibraryLo=data.location;
            vm.openFullScreen2();
            vm.lansen = this.$store.state.LibraryLo;
        openL(data.location).then(res => {
            vm.$store.state.recordPrevious=1;
          if(res.code !=='1'){
            this.$message({
              message: res.msg,
              type: 'error',
            });
            return
          }
            // if(this.$store.state.whetherTest == false){
            //     this.dialogTableVisible = true;
            // }
          vm.openFullScreen2();
          // data.supplyQuantity =data.realQuantity;
          // data.checkStatus=1;
          // this.valueEquals=true;
          vm.$message({
            type: 'success',
            message: res.msg
          });
          return false;
        }).catch(err => {
          vm.$message({
            type: 'error',
            message: err.msg
          });
          return false;
        });
      },
      loadMore() {
        setTimeout(() => {
          let mv = this;
          if (!mv.busy) {
            mv.busy = true;// 将无限滚动给禁用
            if (mv.searchtxt == '') {
              mv.searchHouse.pageNumber++ // 增加页数
              mv.searchSource();// 请求数据
            } else {
              mv.searchHouse.pageNumber++ // 增加页数
              mv.querySearch(mv.searchtxt);
            }
          }
        }, 500);
      },
      searchSource() {
        let mv = this;
        databaseli(this.searchHouse).then(response => {
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
            if(listTotal<=mv.searchHouse.pageSize){
                mv.houseList=response.data.result;
                mv.houseNum = response.data.total;
                this.busy = true;
                mv.noMore = true;// 切换底部提示信息
                mv.droping = false;
                mv.current= mv.houseList.length;
            }else {
                mv.houseList = mv.houseList.concat(response.data.result)
                let DownloadTotal =
                    (mv.searchHouse.pageNumber + 1) * mv.searchHouse.pageSize;
                let total = response.data.total;
                mv.houseNum = response.data.total;
                let totalPage = (mv.houseNum + mv.searchHouse.pageSize) / mv.searchHouse.pageSize;
                // mv.searchHouse.pageNumber++; //增加页数
                if (mv.searchHouse.pageNumber + 1 >= totalPage) {
                    this.busy = true;// 将无限滚动关闭
                    this.searchHouse.pageNumber = 0 // 页数变为0
                    this.noMore = true; // 切换底部提示信息
                    this.droping = false
                } else {
                    this.busy = false;// 将无限滚动给打开
                    this.droping = true;
                    this.noMore = false; // 切换底部提示信息
                }
                mv.current= mv.houseList.length;
            }

        }).catch(function (error) {
          this.$message.error(error);
          this.droping = false
        });


      },
      numSort() {
          this.searchHouse.columnName='supply_quantity';
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
        searchLocation(){
            // this.searchHouse.searchType=0;
            if (this.searchHouse.searchType == 1) {
                this.searchHouse.searchType = 0;
                this.iconBottoms = false;
                this.iconTops = true;
                this.houseList = [];
                this.searchHouse.pageNumber = 1;
                this.searchSource() // 请求数据
            } else {
                this.searchHouse.searchType = 1;
                this.iconBottoms = true;
                this.iconTops = false;
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
        StatusListNuc(){
            let mv = this;
            for(let i=0;i<mv.houseList.length;i++){
                if(mv.houseList[i].checkStatus==0){
                    mv.StatusList=mv.StatusList.concat(mv.houseList[i]);
                }
            }
            mv.statusNunT=mv.StatusList.length;
           mv.statusNun=mv.houseNum-mv.houseList.length;
            mv.StatusDialogVisible=true;
        },
      finishingNuclear() {
          let mv = this;
          mv.antity = false;
          mv.ishiddenOK = false;
          mv.ishidden = true;
          let sendData = '';
          sendData += `deviceNo=${this.machineDeviceNo}`;
          recordInventory(sendData).then(response => {
              if(response.code !=='1'){
                  this.$message({
                      message: response.msg,
                      type: 'error',
                  });
                  return
              }
              mv.$message({
                  type: 'success',
                  message: response.msg
              });
              return false;
          })
      },
      finishingNuclearNo() {
        this.antity = true;
        this.ishiddenOK = true;
        this.ishidden = false;
      },
    },

  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
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

  .effectiveHead {
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

    .templateHover {
      display: initial;
      float: left;
      width: 100%;
      height: 100%;
      position: relative;
    }

    .templateHover:hover {
      outline: 2px #13bdf6 solid;
      outline-offset: -2px;
    }

    .el-card__body {
      height: 100%;
      position: relative;
    }

    li {
      .templateLis {
        padding-bottom: 20px;
      }

      .templateImg {
        width: 246px;
        height: 100%;
        float: left;
        position: absolute;
        left: 0;
        top: 0;
        outline: 1px #ddd solid;
        padding: 10px;
        img {
          width: 100%;
          height: 100%;
          float: left;

        }
      }

      .templateR {
        height: 100%;
        padding-left: 246px;
        .el-card__body {
          display: flex;

          h4 {
            font-size: 24px;
            font-weight: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
         h4::before,h3::before {
            content:"\007C ";
            opacity:0;
          }
          h3 {
            font-size: 16px;
            color: #00adf8;
            margin-top: 5px;
            float: left;
          }

          .templateP {
            float: right;
            font-size: 36px;
            /*padding-top: 10px;*/
            /*padding-right: 8px;*/
            color: #02b2e9;

            text-align: right;
            width: 100%;
            padding: 0;

          }

          .templateTime {
            float: right;
            font-size: 16px;
            width: 100%;

            span {
              float: right;
              font-size: 16px;

            }

            p {
              float: right;
              font-size: 16px;
              padding-left: 10px;

            }

            b {
              float: right;
              font-size: 16px;
              font-weight: normal;
              color: #ef0000;
            }
          }

          .templateLabel {
            float: left;
            width: 106px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            font-size: 18px;
            background: #fff;
            border-color: #1bdc6f;
            border-width: 2px;
            border-style: dashed;
            color: #1bdc6f;
            position: absolute;
            top: 0;
            left: 0;
          }

          .templateNum {
            position: absolute;
            right: 80px;
            bottom: 25px;
          }

          .templateButton {
            position: relative;
            right: 0px;
            background: #0eb2ea;
            color: #fff;
            bottom: 0px;
            font-size: 16px;
            padding-left: 15px;
            padding-right: 15px;
            float: right;

          }

          .templateOK {
float: left;
            /*margin-left: 5%;*/
            /*margin-right: 50px;*/
          }

          .templateSpan {
            float: left;
            font-size: 16px;
            margin-top: 10px;
            /*width: 100%;*/
            margin-left: 5%;
            b {
              float: left;
              font-weight: normal;
            }

            p {
              float: left;

            }
          }

          .leftHightS {
            /*position: absolute;*/
            /*bottom: 0;*/
            width: 100%;
            float: left;
            margin-top: 10px;
            min-height: 42px;
          }
          .templateEmptys{
            width: 80px;
            height: 42px;
            float: left;
          }
          .templateVerify {
            float: left;
            font-size: 16px;
            margin-top: 10px;

            position: relative;

            b {
              float: left;
              font-weight: normal;
            }
            p::before {
              content:"\007C ";
              opacity:0;
            }
            p {
              float: left;
              width: 120px;
              overflow: hidden;/*超出部分隐藏*/
              white-space: nowrap;/*不换行*/
              text-overflow:ellipsis;/*超出部分省略号显示*/
            }
          }

          .templateTitle {
            display: block;
            font-size: 16px;
            padding-top: 8px;
            color: #8e8e8e;
            float: left;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分省略号显示*/
            width: 100%;
            float: left;
          }
          .templateTitle::before{
            content:"\007C ";
            opacity:0;
          }
          .detailsNum {
            float: right;
            position: relative;
            width: 100%;
            margin-top: 5px;
          }
        }

      }
    }
  }
  .allTopBo{
    float: left;
    display: flex;
    z-index: 999;
    position: relative;

    padding-left: 10px;
  }
  .clickThing:active{
    background: red;
  }
  .clickThing:hover{
    background: red;
  }
  .clickThing:visited{
     background: red;
   }
  .clickThing:link{
    background: red;
  }
  .infoNum{
    position: absolute;
    right: 0;
    top: 25%;
    font-size: 18px;
    color: #97a8be;
  }
  .detailgrey{
    color: red !important;
  }
  .hit1{
    background: red;
    color: #fff;
  }
  .searchHit1:hover{
    background: #fff;
    color: #333;
  }
  .searchHit1.hit1:hover{
    background: red;
    color: #fff;
  }
</style>
