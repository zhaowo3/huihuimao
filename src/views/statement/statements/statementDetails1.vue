<template>
  <div class="baoB">
    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <el-button type="primary" class="trayClose" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <el-main class="baoBScoll">
      <el-row style="height: 100%;">
        <el-col :span="24" style="height: 100%;">
          <div class="baoBTop">
            <div class="block">
              <el-date-picker
                v-model="value2"
                @change="handledaterange(value2)"
                popper-class="picker-no-text"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="baoButton">
              <!--              <el-button type="primary" size="medium" class="trayClose" @click="">查询</el-button>-->
              <el-button type="success"  class="trayClose" @click="export2Excel">导出</el-button>

            </div>
            <div class="filter-container" style="float: left;" shadow="never">

              <div class="baoBShout" >
                <el-select v-model="value4" class="input-width" @change="handleUserList(value4)" placeholder="全部巷道" clearable>
                  <el-option  v-for="item in options5"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                              :disabled="item.disabled">
                  </el-option>
                </el-select>
              </div>
              <!--              <div>-->
              <!--                <el-button-->
              <!--                  style="float: right"-->
              <!--                  @click="searchBrandList()"-->
              <!--                  type="primary"-->
              <!--                  size="medium">-->
              <!--                  查询结果-->
              <!--                </el-button>-->
              <!--              </div>-->

            </div>

            <div class="inputPlace">
              <el-input
                placeholder="请输入物资名称或规格"
                v-model="searchtxt"
                @keyup.enter.native="queryClick(searchtxt)"
                clearable class="inputPlace">
                <i class="iconfont icon-icon-test35" @click="queryClick(searchtxt)" slot="suffix"></i>
              </el-input>

            </div>
            <el-button type="primary" class="trayClose traySh" style="float: left;" v-if="printHide"  @click="doPrint" >下载图表</el-button>
            <div class="baoTopRight">

              <el-button type="primary" class="trayClose"   @click="reportButton" >报表</el-button>

              <!--              <el-button type="primary" class="trayClose" @click="">下载</el-button>-->
              <!--              <el-button type="primary" class="trayClose" @click="">重新生成</el-button>-->
            </div>
            <div class="baoTopBo" v-if="baoHide">
              <el-select v-model="value3" placeholder="图表" @change="handleCommand(value3)">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </div>
          </div>
          <el-row ref="print" class="baoBTopH">
            <h3 v-if="printT" style="text-align: center;">盘库统计</h3>


            <el-col :span="24" v-if="iHide" class="resWith" style="height: 100%;">
              <div class="baoBMain">
                <div class="table-container">
                  <el-table ref="brandTable"
                            :data="list"
                            style="width: 100%;"
                            v-loading="listLoading"
                            show-summary
                            border>
                    <el-table-column prop="name" label="名称" sortable align="left">
                      <template slot-scope="scope">{{scope.row.name}}</template>
                    </el-table-column>
                    <el-table-column label="规格" sortable align="center" >
                      <template slot-scope="scope" sortable>{{scope.row.size}}</template>
                    </el-table-column>
                    <el-table-column label="条码" sortable align="center" >
                      <template slot-scope="scope" sortable>{{scope.row.manyBarcode||scope.row.barcode}}</template>
                    </el-table-column>
                    <el-table-column prop="supplyQuantity" sortable label="数量" width="150" align="center">
                      <template slot-scope="scope" sortable>{{scope.row.supplyQuantity}}</template>
                    </el-table-column>
                    <el-table-column prop="stockDate" sortable label="盘库时间" width="200" align="center">
                      <template slot-scope="scope" sortable>{{scope.row.stockDate}}</template>
                    </el-table-column>
                    <!--                    <el-table-column prop="totalPrice" sortable label="总价" width="200" align="center">-->
                    <!--                      <template slot-scope="scope" sortable>-->
                    <!--                        {{scope.row.totalPrice}}-->
                    <!--                      </template>-->
                    <!--                    </el-table-column>-->
                  </el-table>
                </div>
              </div>
              <div class="baoBTableFoot">

                <div class="pagination-container">
                  <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes,prev, pager, next,jumper"
                    :page-size="listQuery.pageSize"
                    :page-sizes="[5,10,total]"
                    :current-page.sync="listQuery.pageNumber"
                    :total="total">
                  </el-pagination>
                </div>
              </div>
            </el-col>
            <el-col :span="24" v-else-if="iHide==false" id="print-content" class="resImg" style="height: 100%;">
              <stateChart :chartData="chartData" :ids="ids" id="seven" :extend="extend"  :settings="chartSettings" :data-zoom="dataZoom" ></stateChart>
              <div ref="chartPrint" style="display: none;"></div>
            </el-col>

            <!--            <el-col :span="8" class="resImg">-->
            <!--              <stateChart :chartData="chartData" :ids="ids" :extend="extend"  :settings="chartSettings" :data-zoom="dataZoom" ></stateChart>-->
            <!--            </el-col>-->
          </el-row>


        </el-col>
      </el-row>
    </el-main>
    <el-dialog :visible.sync="dialogTableVisible" :modal="false" width="100%" :fullscreen="fullscreen"
               custom-class="el-dialog__header-custom dialoVisible">
      <!--  <statementSon2></statementSon2>-->
    </el-dialog>

  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {inventoryPageList,inventoryChart} from '@/api/baoBiao'
    import {
        deviceList
    } from '@/api/material'
    import {debounce} from '@/utils/debounce';
    import stateChart from '@/components/stateChart';
    // import vueEasyPrint from "vue-easy-print";
    // import statementSon2 from './component/statementSon2';
    export default {
        name: "statementDetails1",
        components: {
            stateChart,
            // vueEasyPrint
            //    statementSon2
        },
        data() {
            this.dataZoom = [
                {
                    type: 'slider',
                    start: 0,
                    end: 20
                }
            ]
            this.extend = {
                //x轴文本设置
                // 'xAxis.0.axisLabel.rotate': 60,//x轴文本倾斜
            }
            this.chartSettings = {
                metrics: ['剩余量',],
                //     dimension: ['名称']
            }
            return {
                listQuery:{
                    pageNumber: 1,
                    pageSize: 10,
                    deviceNo:'',
                    endTime:null,
                    startTime:null,
                    search:'',
                },
                baoHide:false,
                printHide:false,
                // pickerOptions: {
                //     shortcuts: [{
                //         text: '最近一周',
                //         onClick(picker) {
                //             const end = new Date();
                //             const start = new Date();
                //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                //             picker.$emit('pick', [start, end]);
                //         }
                //     }, {
                //         text: '最近一个月',
                //         onClick(picker) {
                //             const end = new Date();
                //             const start = new Date();
                //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                //             picker.$emit('pick', [start, end]);
                //         }
                //     }, {
                //         text: '最近三个月',
                //         onClick(picker) {
                //             const end = new Date();
                //             const start = new Date();
                //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                //             picker.$emit('pick', [start, end]);
                //         }
                //     }]
                // },
                iHide:true,
                dialogTableVisible:false,
                fullscreen: false,   // 弹窗是否全屏
                searchtxt:'',
                ids:'0',
                list: [],
                total: null,
                listLoading: false,
                value2: '',
                options5: [],
                value4: '',
                input: '',
                search: '',
                printT:false,
                options2: [{
                    value: 'a',
                    label: '柱状图'
                }, {
                    value: 'b',
                    label: '折线图',
                }, {
                    value: 'c',
                    label: '条形图'
                }, {
                    value: 'd',
                    label: '散点图'
                }],
                value3: '柱状图',
                chartData: {},
            };
        },
        computed: {
            ...mapGetters([
                'cutting',
            ]),
        },
        created() {
            this.operationIndex();
            this.$watch('searchtxt', debounce((newQuery) => {
                this.queryClick(newQuery);
            }, 1000))
        },
        methods: {
            getList() {
                this.listLoading = true;
                inventoryPageList(this.listQuery).then(response => {
                    if(response.code !=='1'){
                        this.$message({
                            message: response.msg,
                            type: 'error',
                            duration: 1000
                        });
                        return
                    }
                    this.listLoading = false;
                    this.list = response.data.result;
                    this.total = response.data.total;
                });
            },
            queryClick(newQuery) {
                let mv = this;
                mv.listQuery.pageNumber = 1;
                mv.list = [];
                mv.listQuery.search=newQuery;
                mv.getList();
                mv.inventoryChart(mv.value3);
            },
            handleUserList(val){
                let mv=this;
                // mv.searchHouse.pageNumber=1;
                if(val==''){
                    mv.listQuery.deviceNo='';
                    mv.getList();
                    return
                }else {
                    switch(val) {
                        case val:
                            mv.listQuery.deviceNo=val;
                            mv.getList();
                            mv.inventoryChart(mv.value3);
                            break;
                    }
                }
            },
           reportButton(){
            let mv=this;
            mv.iHide =!mv.iHide;
               mv.baoHide =!mv.baoHide;
               mv.printHide =!mv.printHide;
            mv.inventoryChart();
            },
            //下拉
            operationIndex(){
                let mv=this;
                deviceList().then(response=> {
                    if(response.code !=='1'){
                        mv.$message({
                            message: response.msg,
                            type: 'error',
                        });
                        return
                    }
                    // let IpPositonhome=  sessionStorage.getItem('IpPositonhome');
                    mv.options5=response.data;
                    // for(let i=0;i<response.data.length;i++){
                    //     if(response.data[i].controlIp== IpPositonhome){
                    //         mv.listQuery.deviceNo=response.data[i].deviceNo;
                    //         mv.value4=response.data[i].id;
                    //         // mv.machineDeviceNo=response.data[i].id;
                    //     }else {
                    //
                    //
                    //     }
                    // }
                    mv.listQuery.deviceNo=response.data[0].deviceNo;
                    mv.value4=response.data[0].id;
                    // mv.listQuery.deviceNo=response.data[0].id;
                    // let h=this.listQuery;
                    // h.search=this.listQuery.deviceNo;
                    mv.inventoryChart(mv.value3);
                    mv.getList();
                })
            },
            // printMe(){
            //   this.$print(this.$refs.print) // 使用
            // },
            handleCommand(val) {
                let mv=this;
                switch(val) {
                    case 'a':
                        mv.ids='0';
                        break;
                    case 'b':
                        mv.ids='1';
                        break;
                    case 'c':
                        mv.ids='2';
                        break;
                    case 'd':
                        mv.ids='3';
                        break;
                    case 'e':
                        mv.ids='4';
                        break;
                }

            },

            inventoryChart(val){
                let mv=this;
                let sendData = '';
                sendData += `deviceNo=${ mv.listQuery.deviceNo}&`;
                sendData += `pageNumber=${mv.listQuery.pageNumber}&`;
                sendData += `pageSize=${mv.listQuery.pageSize}&`;
                sendData += `search=${mv.listQuery.search}&`;
                if(mv.listQuery.startTime==undefined||mv.listQuery.endTime==undefined){
                    this.$delete(mv.listQuery,"endTime");
                    this.$delete(mv.listQuery,"startTime");
                }else if(mv.listQuery.startTime==null||mv.listQuery.endTime==null){
                    this.$delete(mv.listQuery,"endTime");
                    this.$delete(mv.listQuery,"startTime");
                }else {
                    sendData += `startTime=${mv.listQuery.startTime}&`;
                    sendData += `endTime=${mv.listQuery.endTime}&`;
                }

                inventoryChart(sendData).then(response=> {
                    if(response.code !=='1'){
                        mv.$message({
                            message: response.msg,
                            type: 'error',
                        });
                        return
                    }
                    mv.chartData=response.data.chartData
                });
            },
            //打印图表
            doPrint () {
                this.createImage();
                this.$nextTick(() => {
                    if (this.$refs.chartPrint.innerHTML) {
                        let PrintContent = document.getElementById('print-content');
                        let newContent = PrintContent.innerHTML;
                        let oldContent = document.body.innerHTML;
                        document.body.innerHTML = newContent;
                        // window.print();
                        window.location.reload();
                        document.body.innerHTML = oldContent;
                        return false;
                    }

                });
            },
            createImage () {
                const canvas = document.getElementsByTagName('canvas')[0];
                const box = this.$refs.chartPrint;
                let image = canvas.toDataURL({
                    type:"png",
                    pixelRatio: 2,
                    backgroundImage:{
                        backgroundColor: '#fff',//不设置此项，导出图片的底色是黑色
                    }

                });

                //在页面中展示
                box.innerHTML = '<img src="' + image + '" alt="">';
                //下载
                this.downloadFile('测试.png', image);
            },
            downloadFile(fileName, content) {
                let aLink = document.createElement('a');
                let blob = this.base64ToBlob(content); //new Blob([content]);

                let evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
                aLink.download = fileName;
                aLink.href = URL.createObjectURL(blob);
                aLink.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));//兼容火狐
            },
            //base64转blob
            base64ToBlob(code) {
                let parts = code.split(';base64,');
                let contentType = parts[0].split(':')[1];
                let raw = window.atob(parts[1]);
                let rawLength = raw.length;

                let uInt8Array = new Uint8Array(rawLength);

                for (let i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }
                return new Blob([uInt8Array], {type: contentType});
            },
            export2Excel(){
                require.ensure([], () => {
                    const { export_json_to_excel } = require('../../../vendor/Export2Excel');
                    const tHeader = ['名称','规格','条码','条码','数量','盘库时间'];
                    const filterVal = ['name', 'size','barcode', 'manyBarcode', 'supplyQuantity','stockDate'];
                    const list = this.list;
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '物资库存统计');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            handledaterange(val){
                let mv=this;
                if(val==null){
                    this.$delete(mv.listQuery,"endTime");
                    this.$delete(mv.listQuery,"startTime");
                    // mv.listQuery.startTime='';
                    mv.listQuery.pageNumber=1;
                    mv.getList();
                    mv.inventoryChart()
                }else {
                    mv.searchBrandList();
                }
            },
            handleSizeChange(val) {
                this.listQuery.pageNumber = 1;
                this.listQuery.pageSize = val;
                this.getList();
                this.inventoryChart()
            },
            handleCurrentChange(val) {
                this.listQuery.pageNumber = val;
                this.getList();
                this.inventoryChart()
            },
            searchBrandList() {
                let mv=this;
                this.listQuery.pageNumber = 1;
                if(this.value2==null){
                    mv.listQuery.startTime='';
                    mv.listQuery.endTime='';
                }else {
                    mv.listQuery.startTime=mv.value2;
                    mv.listQuery.endTime=mv.value2;
                }

                this.getList();
                this.inventoryChart()
            },
            printBtn() {
                this.$print(this.$refs.print) // 使用
            },
            //打印触发的方法
            // printBtn() {
            //     let that = this;
            //     // $('.operatorBox').css({ //从新绘制这块区域让它固定在每一个页面底部
            //     //     'position':'fixed',
            //     //     'bottom':'15px'
            //     // })//此方法仅限单页
            //     let div_print = document.getElementById('print-area');
            //     let newstr = div_print.innerHTML;
            //     let oldstr = document.body.innerHTML;
            //     document.body.innerHTML = newstr;
            //     // that.showCharts()
            //     // console.log(this.imgBase)
            //     // 吧charts图表弄成图片，在挨边替换空白图表
            //     /* Object.keys(this.imgBase).forEach(function(key){
            //         document.getElementById(key).innerHTML="<img style='width:100%' src="+that.imgBase[key]+">"
            //     });  */
            //
            //     setTimeout(function(){
            //         window.print();
            //         alert('如未打印，请右键选择打印!')
            //         // window.location.reload();
            //         // document.body.innerHTML = oldstr;
            //     },1000)
            // },

            // getSummaries(param) {
            //   const { columns, data } = param;
            //   const sums = [];
            //   columns.forEach((column, index) => {
            //     if (index === 0) {
            //       sums[index] = '总值';
            //       return;
            //     }
            //     const values = (data||[]).map(item => Number(item[column.property]));
            //     if (!values.every(value => isNaN(value))) {
            //       sums[index] = values.reduce((prev, curr) => {
            //         const value = Number(curr);
            //         if (!isNaN(value)) {
            //           return prev + curr;
            //         } else {
            //           return prev;
            //         }
            //       }, 0);
            //       sums[index] += ' ';
            //     } else {
            //       sums[index] = 'N/A';
            //     }
            //   });
            //
            //   return sums;
            // }
        },
    }
</script>

<style type="text/scss"  rel="stylesheet/scss" lang="scss" scoped>

  .baoB {
    height: 100%;

    .baoBScoll {
      height: calc(100% - 1px);
    }

    .baoBTop {
      background: #fff;
      padding: 10px;
      width: 100%;
      float: left;
      position: relative;
      z-index: 9;
    }
    .baoBTopH{

      float: left;
      width: 100%;
      height: calc(100% - 80px);
      margin-top: 0.104167rem;

    }
    .block {
      display: flex;
      float: left;
    }

    .baoButton {
      float: left;
      display: flex;
      padding: 0 10px;

    }

    .filter-container {
      display: flex;
      float: left;
    }
    .baoTopBo{
      float: right;
      display: flex;
      z-index: 999;
      position: relative;
      line-height: 40px;
      padding-right: 10px;
    }
    .baoBShout {
      display: flex;
      float: left;

      .el-form-item {
        display: flex;
        float: left;
        margin-bottom: 0;
      }
    }

    .baoTopRight {
      float: right;
      display: flex;
    }

    .baoBMain {
      margin: 0 0 0 0;
      display: flex;
      float: left;
      width: 100%;
      height: calc(100% - 80px);

      .table-container {
        width: 100%;
        margin-top: 0;
        height: 100%;
        overflow-y: auto;

      }
    }

    .baoBTableFoot {
      float: left;
      display: flex;
      width: 100%;
      background: #fff;
      padding: 10px 0;

      .el-pagination {
        float: left;
        display: flex;
      }
    }
  }
  .baoRightB{
    background: #fff;
    height: 100%;
    margin-top: 22px;
    /*margin-left: 22px;*/
    padding-top: 20px;
  }
  .inputPlace{
    margin-left: 5px;
    float: left;
  }
  .traySh{
    margin-left:15px;
  }
  @media print {
             .no-print{
                display: none;
           }
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
</style>
