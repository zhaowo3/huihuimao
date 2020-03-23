<template>
  <div style="height: 100%;">
    <div name="homeHeaders" class="menuMainContent">

      <div style="float: right;">

        <el-button type="primary" class="trayClose" @click="tmpDownload" v-if="materialImport"  id="hamburger-tmpDownload">模板下载</el-button>
        <el-upload
          class="upload-demo uploadImport"
          ref="upload"
          :multiple="false"
          :http-request="customUpload"
          action="http://dist:8081/api/file/import"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :show-file-list="false"
          :file-list="fileList"
          :auto-upload="true"
          accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :limit="1"
        >
          <el-button type="primary" class="trayClose" v-if="materialImport">物资导入</el-button>
          <!--          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
        <el-upload
          class="upload-demo uploadImport"
          ref="upload"
          :multiple="false"
          :http-request="importMaterial"
          action="http://dist:8081/api/file/import"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :show-file-list="false"
          :file-list="fileList"
          :auto-upload="true"
          accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :limit="1"
        >
          <el-button type="primary" class="trayClose" v-if="materialImport" >库位导入</el-button>
          <!--          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
        <div class="warningIcon">
          <span class="warningEarly"  id="hamburger-periodEffective">
            <router-link to="/warningEarly">
              <i class="iconfont icon-icon-test38"></i>
              <!--            <svg-icon icon-class="38" class="color-main"></svg-icon>-->
              <span>过期</span>
              <b>{{remind.quantityWarn}}</b>
            </router-link>
          </span>
          <span class="periodEffective" id="hamburger-warningEarly">
            <router-link to="/management">
              <i class="iconfont icon-icon-test39"></i>
              <!--          <svg-icon icon-class="39" class="color-main"></svg-icon>-->
              <span>补货</span>
              <b>{{remind.expirationWarn}}</b>
            </router-link>
          </span>
        </div>
        <div class="autoSeach">

          <!--          <el-autocomplete-->
          <!--            class="inline-input"-->
          <!--            v-model="state2"-->
          <!--            :fetch-suggestions="querySearch"-->
          <!--            placeholder="请输入内容"-->
          <!--            :trigger-on-focus="false"-->
          <!--            @select="handleSelect"-->
          <!--          ><i-->
          <!--            class="iconfont icon-icon-test35"-->
          <!--            slot="suffix"-->
          <!--            >-->
          <!--          </i></el-autocomplete>-->
          <el-input v-model="searchtxt" id="hamburger-searcts" @keyup.enter.native="queryClick(searchtxt)" class="inputs1" placeholder="请输入关键字" clearable>
            <i class="iconfont icon-icon-test35" @click="queryClick(searchtxt)" slot="suffix"></i>
          </el-input>
        </div>
      </div>
    </div>

    <el-container style="height: 100%;">
      <el-header class="effectiveHead" style="height: auto;">
        <el-row class="effectiveLie">

          <el-button @click="numName" id="hamburger-numNameL">名称

            <i class="el-icon-caret-bottom" v-if="iconBottom"></i><i class="el-icon-caret-top" v-if="iconTop"></i>
          </el-button>
          <el-button @click="numSort">库位

            <i class="el-icon-caret-bottom" v-if="iconBottoms"></i><i class="el-icon-caret-top" v-if="iconTops"></i>
          </el-button>
<!--          <el-button @click="numLocation">库位-->

<!--            <i class="el-icon-caret-bottom" v-if="iconBottom"></i><i class="el-icon-caret-top" v-if="iconTop"></i>-->
<!--          </el-button>-->
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
          <p class="infoNum"><span>已显示:{{current}},</span><span>总数:{{leftInfo.houseNum}}</span></p>
        </el-row>

      </el-header>
      <el-main v-loading="listLoading" style="padding-top: 5px;">
        <el-row :gutter="20" class="templateRight" id="templateRight" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                infinite-scroll-distance="10">
          <div id="leftBox" style="padding-top:2px;">
            <ul>
              <router-link :to="{path: '/allocationMaterial/allocationDetails/',query:{id:data.id,materialUpdate}}"
                           style="display: block" v-for="(data,index) in leftInfo.houseList" :key="index">

                <li style="display: block">
                  <el-col :span="12" id="hamburger-ViewDetails">
                    <el-row class="templateLis">
                      <div class="templateHover">
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
                        <el-card class="templateR" >
                          <el-col :span="18" style="position: relative;">
                            <h4 :title="data.name">{{data.name}}</h4>
                            <h4 :title="data.alias">{{data.alias}}</h4>
                            <span class="templateTitle">{{data.size}}</span>
                            <h3 v-if="data.codeType==1">{{data.barcode}}</h3>
                            <h3 v-if="data.codeType==2">{{data.manyBarcode}}</h3>
                            <h3 v-if="data.codeType==3"></h3>
                            <el-button class="allPosition"   @click.stop.prevent="allPosition(data)">条形码</el-button>
                            <el-button class="allPositionT" v-if="data.codeType ==1" @click.stop.prevent="ThingClick(data)">
                              详情
                            </el-button>
                            <span class="templateSpan"><b>库位:</b><p>{{data.location}}</p><b style="margin-left: 10px;">预警:</b><p>{{data.warnQuantity}}</p></span>
                          </el-col>
                          <el-col :span="6" style="position: relative;">
                            <!--                        <div class="templateTime"><b>{{data.times}}</b><p>剩余:</p><span >{{data.time}}</span></div>-->
                            <p class="templateP">{{data.supplyQuantity}}({{data.bigUnitDesc}})</p>
                            <el-button class="templateButton" v-if="data.type==1">包</el-button>

                          </el-col>
                        </el-card>
                      </div>
                    </el-row>
                  </el-col>

                </li>
              </router-link>
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
      title="导入失败"
      :visible.sync="centerDialogVisible"
      width="30%"
      center custom-class="additionHistory">
      <el-table :data="gridData"  max-height="300">
        <el-table-column property="error" label="错误信息"></el-table-column>
      </el-table>
      <div class="hButton">
        <el-button type="primary" @click="HistoryButton">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="条形码"
      :visible.sync="codeDialogVisible"
      width="30%"
      center custom-class="codeitionHistory" id="subOutputRankPrint">
      <vue-easy-print tableShow ref="easyPrint">
        <p style="text-align: center; width: 100%;font-size: 28px;font-weight: normal">{{nameValuegi}}</p>
        <p style="text-align: center; width: 100%;font-size: 14px">{{nameValue}}</p>
        <p style="font-size: 28px;width: 100%;text-align: center;height: 140px;line-height: 140px;" v-if="nameTypea==1">一物一码</p>
        <p style="font-size: 28px;width: 100%;text-align: center;height: 140px;line-height: 140px;" v-if="nameTypea==3">无码</p>
        <barcode v-bind:value="barcodeValue" class="allPositionClass" v-if="nameTypea==2">
        </barcode>
      </vue-easy-print>


      <div class="hButton" id="hButton">
        <el-button type="primary" @click="printBarcode"  @keyup.enter="printBarcode()">打印</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="一物一码详情"
      :visible.sync="ThingDialogVisible"
      width="770px" custom-class="DIFitionHistory" :before-close="handleClose">
      <el-table :data="thingData" @row-click="ThingDetails" max-height="300">
        <el-table-column property="intactBarcode" label="条码"></el-table-column>
        <el-table-column property="validDate" label="效期"></el-table-column>
        <el-table-column property="inOperator" label="存入人员"></el-table-column>
        <el-table-column property="inTime" label="存入时间"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import smalls from '@/assets/images/small.jpg';
  import {debounce} from '@/utils/debounce';
  import VueBarcode from 'vue-barcode';
  import vueEasyPrint from "vue-easy-print";
  import big from '@/assets/images/big.jpg';
  import allocationDetails from './allocationMaterialLie/allocationDetails'
  import {
    getInfo
  } from '@/api/login'

  import {
    catalogs, tmpD,deviceList,quantityDetail
  } from '@/api/material'
  import {
    fileImport,importMaterial
  } from '@/api/oss'
  import {
    searchPage,submenuMenuId
  } from '@/api/systemsL'
  export default {
    name: "allocationMaterialLie",
      components: {
          vueEasyPrint,
          'barcode': VueBarcode
      },
      inject: ['reload'],
    data() {
      return {
        Verified: true,
        activeName: 'second',
        smalls,
        leftInfo: {
          houseList: [],
          searchHouse: {
            pageSize: 10,
            pageNumber: 1,
            columnName: 'location',
            orderType: 'asc',
            deviceNo:'',
            // keyWords:'',
          },
          houseNum: '',
        },
          current:'',
        value3:'全部',
        peopleSearch: '',
        restaurants: [],
          thingData:[],
        // searchG:{
        //   pageSize:10,
        //   pageNumber:1,
        // },
        searchtxt: '',
        iconBottom: true,
        iconTop: false,
          iconBottoms: true,
          iconTops: false,
        busy: false,
        listLoading: false,
        droping: false,
        noMore: false,
        danViews: {},
        fileList: [],
        gridData:[],
        serverdesk: {},
          barcodeValue:'',
          nameValue:'',
          nameValuegi:'',
          nameTypea:'',
        options2:[],
        remind: {},
        centerDialogVisible:false,
          codeDialogVisible:false,
          ThingDialogVisible:false,
        materialImport:'',
        materialUpdate:'',
          ip: '',
          isFirstEnter: false, // 是否第一次进入，默认false
          scrollTop:'',

      };
    },
    columns: ['allocationDetails'],
    mounted() {

      // this.eventsBand( document.querySelector('.templateRight'));
      // this.restaurants = this.loadAll();
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
      beforeRouteLeave(to,from,next){
          from.meta.keepAlive = false;
          sessionStorage.setItem('askPositonhome',document.getElementById('templateRight').scrollTop);
          next();
      },
      activated(){
          if (this.$route.meta.isChange) {
              let changeData = JSON.parse(window.sessionStorage.getItem('changeData'));
              let askPositon= sessionStorage.getItem('askPositonhome');
              document.getElementById('templateRight').scrollTop = askPositon;
              this.leftInfo.houseList.forEach(item => {
                  if (item.id === changeData.id) {
                      item.warnQuantity =changeData.warnQuantity,
                      item.bigUnitDesc =changeData.bigUnitDesc,
                      item.smallUnitDesc =changeData.smallUnitDesc,
                      item.isDel =changeData.isDel,
                      item.isFee =changeData.isFee,
                      item.pinyin =changeData.pinyin,
                      item.imgUrl =changeData.imgUrl,
                          item.alias =changeData.alias,
                          item.location =changeData.location,
                          item.warnQuantity =changeData.warnQuantity
                  }
              })
              // this.reload();
          }else {
              this.leftInfo.houseList=[];
              this.queryClick();
          }
      },
      // beforeRouteEnter(to, from, next) {
      //     // if (from.path == "/DataStatistics/outpatientDetail") {
      //     //     isBack = true;
      //     // } else {
      //     //     isBack = false;
      //     // }
      //     next(vm => {
      //
      //     })
      // },
      // updated () {
      //     this.$nextTick(function(){
      //         let askPositon= sessionStorage.getItem('askPositonhome');
      //         document.getElementById('templateRight').scrollTop = askPositon;
      //     })
      // },
      created() {
          this.isFirstEnter = true;
      // this.dishFirst();
        this.dishFirst();
        this.operationIndex();

        this.$watch('searchtxt', debounce((newQuery) => {
            this.queryClick(newQuery);
        }, 1000));

      this.submenuMenuId();
          let lett = this;
          document.onkeydown = function(e) {
              let key = window.event.keyCode;
              if (key == 13) {
                  lett.printBarcode();
              }
          }
    },
    methods: {
      dishFirst() {
        //首页加载
        getInfo().then(response => {
          this.serverdesk = response.data;
          this.remind = response.data.warnNumberVo;
        });
      },
        askPositon(){
            let askPositon= sessionStorage.getItem('askPositonhome');
            document.getElementById('templateRight').scrollTop = askPositon;
        },

      //  补充数量
      //   handleQuantity(){
      //
      //   },
      //弹出条形码
        allPosition(data){
          let mv=this;
            mv.codeDialogVisible=true;
            if(data.codeType==1){
                mv.barcodeValue=data.barcode;
            }else if(data.codeType==2){
                mv.barcodeValue=data.manyBarcode;
            }
            mv.nameTypea=data.codeType;
            mv.nameValue=data.name;
            mv.nameValuegi=data.alias;

        },
      //下拉
      operationIndex(){
        let mv=this;
        deviceList().then(response=> {
          mv.options2=response.data;
            // document.getElementById('leftBox1').scrollTop = IpPositonhome;
          // let IpPositonhome=  sessionStorage.getItem('IpPositonhome');
            // mv.value3=response.data[0];
            // mv.machineDeviceNo=response.data[0].id;
            for(let i=0;i<response.data.length;i++){
                // if(response.data[i].controlIp== IpPositonhome){
                    mv.leftInfo.searchHouse.deviceNo=response.data[0].deviceNo;
                    mv.value3=response.data[0].id;
                // }else {
                //     mv.leftInfo.searchHouse.deviceNo=response.data[0].deviceNo;
                //     mv.value3=response.data[0].id;
                // }
            }
            // mv.leftInfo.searchHouse.deviceNo=response.data[0].deviceNo;
          // let h=this.listQuery;
          // h.search=this.options2s;
            mv.queryClick()

        })
      },

        // beforeAvatarUpload(file) {
        //     const isJPG = file.type === 'image/jpeg,image/png,image/jpg';
        //
        //     if (!isJPG) {
        //         this.$message.error('上传头像图片只能是 JPG,PNG,JPG 格式!');
        //     }
        //
        //     return isJPG;
        // },
      handleCommand(val) {
        let mv=this;
        // mv.leftInfo.searchHouse.pageNumber=1;
        if(val==''){
          // mv.leftInfo.searchHouse.deviceNo='';
          mv.queryClick();
            mv.current=0;
          return
        }else {
          switch(val) {
            case val:
              mv.leftInfo.searchHouse.deviceNo=val;
                // mv.machineDeviceNo=mv.options2[val-1].deviceNo;
              mv.queryClick();
                mv.current=0;
              break;
          }
        }

      },
      //首页加载权限
      submenuMenuId() {
        let mv=this;
        submenuMenuId(mv.$store.state.user.Submenu.allocationMaterial.id).then(response => {
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
            });
            return
          }
          // mv.jurisdiction = response.data;
          for(let i=0;i<response.data.length;i++) {
            if (response.data[i].children == 'materialImport') {
              mv.materialImport = response.data[i].ststus;
            }
            if (response.data[i].children == 'materialUpdate') {
              mv.materialUpdate = response.data[i].ststus;
            }
          }
        });
      },

      queryClick(val) {
        let mv = this;
        mv.leftInfo.searchHouse.pageNumber = 1;
        mv.leftInfo.houseList = [];
        mv.querySearch(val);
      },
      querySearch(val) {
        let mv = this;
        let hou = this.leftInfo.searchHouse;
        hou.keyWords = val;
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

            if(listTotal<=mv.leftInfo.searchHouse.pageSize){
                mv.leftInfo.houseList=res.data.result;
                mv.leftInfo.houseNum=res.data.total;
                this.busy = true;
                mv.noMore = true // 切换底部提示信息
                mv.droping = false;
                mv.current= mv.leftInfo.houseList.length;
            }else {
                mv.leftInfo.houseList = mv.leftInfo.houseList.concat(res.data.result);
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
                mv.current= mv.leftInfo.houseList.length;

            }
        }).catch(function (error) {
          this.$message.error(error);
          this.droping = false
        });
      },


      tmpDownload() {
          let arr = ["http://192.168.1.43:82/file/物资模板.xlsx", "http://192.168.1.43:82/file/库位模板.xlsx"];
          for(let i=0;i<arr.length;i++){
              try{
                  let elemIF = document.createElement("iframe");
                  elemIF.src = arr[i];
                  elemIF.style.display = "none";
                  document.body.appendChild(elemIF);
                  setTimeout(() => {
                      elemIF.remove();
                  },  5 * 60 * 1000);
              }catch(e){

              }
          }

      },

      HistoryButton(){
        this.centerDialogVisible = false;
      },
      //打印条形码
        printBarcode(){
          if(this.codeDialogVisible==true){
              this.$refs.easyPrint.print();
          }

        },

      //物资名称
      customUpload(file) {
        let mv = this;
        // this.generatorFileMd5(file.file)
        // 自定义上传row.id,{status:row.status}
        fileImport(file).then(response => {
          this.fileList = [];
          this.dialogVisible = false;
          //弹出错误
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
              duration: 1000
            });
            mv.centerDialogVisible = true;
            this.gridData = response.data;
            return;
          }
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1000
          });
        })
      },
        importMaterial(file) {
            let mv = this;
            // this.generatorFileMd5(file.file)
            // 自定义上传row.id,{status:row.status}
            importMaterial(file).then(response => {
                this.fileList = [];
                this.dialogVisible = false;
                //弹出错误
                if(response.code !=='1'){
                    this.$message({
                        message: response.msg,
                        type: 'error',
                        duration: 1000
                    });
                    mv.centerDialogVisible = true;
                    this.gridData = response.data;
                    return;
                }
                this.$message({
                    message: response.msg,
                    type: 'success',
                    duration: 1000
                });
            })
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
                this.ThingDialogVisible=true;
            });
        },
        //  选择一物一码的物资
        ThingDetails(){

        },
        handleClose(done){
            done();
        },
        handleClick(index,row){

        },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleChange(file) {
        console.log(file);
      },
      loadMore() {
        setTimeout(() => {
          let mv = this;
          if (!mv.busy) {
            mv.busy = true;// 将无限滚动给禁用
            if (mv.searchtxt == '') {
              mv.leftInfo.searchHouse.pageNumber++;// 增加页数
              mv.searchSource();// 请求数据

            } else {
              mv.leftInfo.searchHouse.pageNumber++;// 增加页数
              mv.querySearch(mv.searchtxt);



            }
          }
        }, 500);
      },
      searchSource() {
        let mv = this;
        // mv.hiddenMain=false;
        // mv.showMain=true;
        catalogs(this.leftInfo.searchHouse).then(response => {
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

            if(listTotal<=mv.leftInfo.searchHouse.pageSize){
                mv.leftInfo.houseList=response.data.result;
                this.busy = true;
                mv.noMore = true // 切换底部提示信息
                mv.droping = false
            }else {
                mv.leftInfo.houseList = mv.leftInfo.houseList.concat(response.data.result);
                let DownloadTotal =
                    (mv.leftInfo.searchHouse.pageNumber + 1) * mv.leftInfo.searchHouse.pageSize;
                let total = response.data.total;
                mv.leftInfo.houseNum = response.data.total;
                let totalPage = (mv.leftInfo.houseNum + mv.leftInfo.searchHouse.pageSize) / mv.leftInfo.searchHouse.pageSize;
                // mv.searchHouse.pageNumber++; //增加页数
                if (mv.leftInfo.searchHouse.pageNumber + 1 >= totalPage) {
                    this.busy = true // 将无限滚动关闭
                    this.leftInfo.searchHouse.pageNumber = 0 // 页数变为0
                    this.noMore = true // 切换底部提示信息
                    this.droping = false;
                } else {
                    this.busy = false // 将无限滚动给打开
                    this.droping = true
                    this.noMore = false // 切换底部提示信息
                }
                mv.current= mv.leftInfo.houseList.length;
            }
        }).catch(function (error) {
          this.$message.error(error)
          this.droping = false
        });


      },
      numSort() {
          this.leftInfo.searchHouse.columnName= 'location';
        if (this.leftInfo.searchHouse.orderType == 'desc') {
          this.leftInfo.searchHouse.orderType = 'asc';
          this.iconBottoms = false;
          this.iconTops = true;
          this.leftInfo.houseList = [];
          this.leftInfo.searchHouse.pageNumber = 1;
          this.searchSource() // 请求数据
        } else {
          this.leftInfo.searchHouse.orderType = 'desc';
          this.iconBottoms = true;
          this.iconTops = false;

          this.leftInfo.houseList = [];
          this.leftInfo.searchHouse.pageNumber = 1;
          this.searchSource() // 请求数据
        }

      },
      numName(){
          this.leftInfo.searchHouse.columnName= 'supply_quantity';
        if (this.leftInfo.searchHouse.orderType == 'desc') {
          this.leftInfo.searchHouse.orderType = 'asc';
          this.leftInfo.searchHouse.columnName = 'pinyin';
          this.iconBottom = false;
          this.iconTop = true;
          this.leftInfo.houseList = [];
          // this.$delete(this.searchHouse, "pageNumber")
           this.leftInfo.searchHouse.pageNumber = 1;
          this.searchSource() // 请求数据
        } else {
          this.leftInfo.searchHouse.orderType = 'desc';
          this.leftInfo.searchHouse.columnName = 'pinyin';
          this.iconBottom = true;
          this.iconTop = false;
          this.leftInfo.houseList = [];
          // this.$delete(this.searchHouse, "pageNumber");
          this.leftInfo.searchHouse.pageNumber = 1;
          this.searchSource() // 请求数据
        }
      },
      numLocation(){
        if (this.leftInfo.searchHouse.orderType == 'desc') {
          this.leftInfo.searchHouse.orderType = 'asc';
          this.leftInfo.searchHouse.columnName = 'location';
          this.iconBottom = false;
          this.iconTop = true;
          this.leftInfo.houseList = [];
          // this.$delete(this.searchHouse, "pageNumber")
          this.leftInfo.searchHouse.pageNumber = 1;
          this.searchSource() // 请求数据
        } else {
          this.leftInfo.searchHouse.orderType = 'desc';
          this.leftInfo.searchHouse.columnName = 'location';
          this.iconBottom = true;
          this.iconTop = false;
          this.leftInfo.houseList = [];
          // this.$delete(this.searchHouse, "pageNumber");
          this.leftInfo.searchHouse.pageNumber = 1;
          this.searchSource() // 请求数据
        }
      },
    },
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .allTopBo{
    float: left;
    display: flex;
    z-index: 999;
    position: relative;

    padding-left: 10px;
  }
  .menuMainContent {
    display: inline-block;
    position: absolute;
    right: 50px;
    top: 0;
    height: 72px;
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
    .trayClose {
      float: right;
      margin: 14px 28.8px 14px 0;
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

  .uploadImport {
    float: right;
    display: flex;
  }

  .effectiveHead {

    .effectiveLie {
      display: flex;
      margin: 10px 0;
      font-size: 16px;
      position: relative;
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

    .templateHover {
      display: initial;
      float: left;
      width: 100%;
      height: 100%;
      position: relative;
    }

    .templateHover:hover {
      /*border-width: 2px;*/
      /*border-color: #13bdf6;*/
      /*border-style: solid;*/
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
        outline: 1px solid #ddd;
        position: absolute;
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
          height: 100%;
          h4 {
            font-size: 24px;
            font-weight: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;//不换行
            height: 28px;
            float: left;
            width: 100%;
          }
          h4::after,h3::after,span::after {
            content:"\007C ";
            opacity:0;
          }
          h3 {
            font-size: 16px;
            color: #00adf8;
            margin-top: 5px;
            float: left;
            width: 100%;
          }

          .templateP {
            float: right;
            font-size: 36px;
            padding-top: 10px;
            padding-right: 8px;
            color: #02b2e9;
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
            color: #1bdc6f;
          }

          .templateNum {
            position: absolute;
            right: 80px;
            bottom: 25px;
          }

          .templateButton {
            position: absolute;
            right: 20px;
            border: 2px dashed #0eb2ea;
            color: #0eb2ea;
            bottom: 25px;
            font-size: 16px;
            padding-left: 15px;
            padding-right: 15px;

          }

          .templateSpan {
            float: left;
            font-size: 16px;
            margin-top: 5px;
            width: 100%;

            b {
              float: left;
              font-weight: normal;
            }

            p {
              float: left;

            }
          }

          .templateVerify {
            float: left;
            font-size: 16px;
            margin-top: 5px;
            width: 100%;

            b {
              float: left;
              font-weight: normal;
            }

            p {
              float: left;

            }
          }

          .templateTitle {
            display: flex;
            font-size: 16px;
            padding-top: 8px;
            float: left;
            width: 100%;
            color: #8e8e8e;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分省略号显示*/
          }
          .templateTitle::before{
            content:"\007C ";
            opacity:0;
          }
          .detailsNum {
            position: absolute;
            right: 100px;
            bottom: 25px;
          }
        }

      }
    }
  }
  .hButton{
    width: 100%;
    text-align: center;
    display: inline-block;
    margin-top: 24px;
  }

.allPosition{
  position: absolute;
  top: 40px;
  right: 0px;
}
  .allPositionT{
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
.codeitionHistory{
  position: relative;
  p{
    font-size: 20px;
    text-align: center;
    width: 100%;
    top: 20px;
  }

}
  .infoNum{
    position: absolute;
    right: 0;
    top: 25%;
    font-size: 18px;
    color: #97a8be;
  }
</style>
