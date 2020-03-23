<!--<template>-->
<!--  <div class="baoB">-->
<!--    <el-main class="baoBScoll">-->
<!--      <el-row>-->
<!--        <el-col :span="24">-->
<!--          <div class="baoBTop">-->
<!--            <div class="block">-->
<!--              <el-date-picker-->
<!--                @change="handledaterange(value2)"-->
<!--                v-model="value2"-->
<!--                type="daterange"-->
<!--                align="right"-->
<!--                unlink-panels-->
<!--                range-separator="至"-->
<!--                start-placeholder="开始日期"-->
<!--                end-placeholder="结束日期"-->
<!--                value-format="yyyy-MM-dd">-->
<!--              </el-date-picker>-->
<!--            </div>-->
<!--            <div class="baoButton">-->
<!--              &lt;!&ndash;              <el-button type="primary" size="medium" class="trayClose" @click="">查询</el-button>&ndash;&gt;-->
<!--              <el-button type="success" size="medium" class="trayClose" @click="export2Excel">导出</el-button>-->
<!--            </div>-->
<!--            <div class="filter-container" style="float: left;" shadow="never">-->

<!--              <div class="baoBShout">-->
<!--                <el-select v-model="value4" class="input-width" @change="handleUserList(value4)" placeholder="全部巷道" clearable>-->
<!--                  <el-option  v-for="item in options5"-->
<!--                              :key="item.id"-->
<!--                              :label="item.name"-->
<!--                              :value="item.id"-->
<!--                              :disabled="item.disabled">-->
<!--                  </el-option>-->
<!--                </el-select>-->
<!--              </div>-->
<!--              &lt;!&ndash;              <div>&ndash;&gt;-->
<!--              &lt;!&ndash;                <el-button&ndash;&gt;-->
<!--              &lt;!&ndash;                  style="float: right"&ndash;&gt;-->
<!--              &lt;!&ndash;                  @click="searchBrandList()"&ndash;&gt;-->
<!--              &lt;!&ndash;                  type="primary"&ndash;&gt;-->
<!--              &lt;!&ndash;                  size="medium">&ndash;&gt;-->
<!--              &lt;!&ndash;                  查询结果&ndash;&gt;-->
<!--              &lt;!&ndash;                </el-button>&ndash;&gt;-->
<!--              &lt;!&ndash;              </div>&ndash;&gt;-->

<!--            </div>-->
<!--            <div class="inputPlace">-->
<!--              <el-input-->
<!--                placeholder="请输入物资名称或规格"-->
<!--                v-model="searchtxt"-->
<!--                @keyup.enter.native="queryClick(searchtxt)"-->
<!--                clearable class="inputPlace">-->
<!--                <i class="iconfont icon-icon-test35" @click="queryClick(searchtxt)" slot="suffix"></i>-->
<!--              </el-input>-->
<!--            </div>-->
<!--            <div class="baoTopRight">-->

<!--              <el-button type="primary" class="trayClose"   @click="reportButton" >报表</el-button>-->

<!--              &lt;!&ndash;              <el-button type="primary" class="trayClose" @click="">下载</el-button>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-button type="primary" class="trayClose" @click="">重新生成</el-button>&ndash;&gt;-->
<!--            </div>-->
<!--            <div class="baoTopBo" >-->
<!--              <el-select v-model="value3" placeholder="图表" @change="handleCommand(value3)">-->
<!--                <el-option-->
<!--                  v-for="item in options2"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value"-->
<!--                  :disabled="item.disabled">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </div>-->
<!--          </div>-->
<!--          <el-row  id="printTest">-->
<!--            <h3 v-if="printT" style="text-align: center;">盘库统计</h3>-->
<!--            <el-col :span="24" class="resWith" v-if="iHide">-->
<!--              <div class="baoBMain">-->
<!--                <div class="table-container">-->
<!--                  <el-table ref="brandTable"-->
<!--                            :data="list"-->
<!--                            style="width: 100%;"-->
<!--                            v-loading="listLoading"-->
<!--                            show-summary-->
<!--                            border>-->
<!--                    <el-table-column prop="name" label="名称" sortable align="left">-->
<!--                      <template slot-scope="scope">{{scope.row.name}}</template>-->
<!--                    </el-table-column>-->
<!--                    <el-table-column label="规格" sortable align="center" >-->
<!--                      <template slot-scope="scope" sortable>{{scope.row.size}}</template>-->
<!--                    </el-table-column>-->
<!--                    <el-table-column label="条码" sortable align="center" >-->
<!--                      <template slot-scope="scope" sortable>{{scope.row.manyBarcode||scope.row.barcode}}</template>-->
<!--                    </el-table-column>-->
<!--                    <el-table-column prop="supplyQuantity" sortable label="数量" width="150" align="center">-->
<!--                      <template slot-scope="scope" sortable>{{scope.row.supplyQuantity}}</template>-->
<!--                    </el-table-column>-->
<!--                    <el-table-column prop="stockDate" sortable label="盘库时间" width="200" align="center">-->
<!--                      <template slot-scope="scope" sortable>{{scope.row.stockDate}}</template>-->
<!--                    </el-table-column>-->
<!--                    &lt;!&ndash;                    <el-table-column prop="totalPrice" sortable label="总价" width="200" align="center">&ndash;&gt;-->
<!--                    &lt;!&ndash;                      <template slot-scope="scope" sortable>&ndash;&gt;-->
<!--                    &lt;!&ndash;                        {{scope.row.totalPrice}}&ndash;&gt;-->
<!--                    &lt;!&ndash;                      </template>&ndash;&gt;-->
<!--                    &lt;!&ndash;                    </el-table-column>&ndash;&gt;-->
<!--                  </el-table>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="baoBTableFoot">-->

<!--                <div class="pagination-container">-->
<!--                  <el-pagination-->
<!--                    background-->
<!--                    @size-change="handleSizeChange"-->
<!--                    @current-change="handleCurrentChange"-->
<!--                    layout="total, sizes,prev, pager, next,jumper"-->
<!--                    :page-size="listQuery.pageSize"-->
<!--                    :page-sizes="[5,10,total]"-->
<!--                    :current-page.sync="listQuery.pageNumber"-->
<!--                    :total="total">-->
<!--                  </el-pagination>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-col>-->

<!--            <el-col :span="24" class="resImg" v-else-if="iHide==false">-->
<!--              <stateChart :chartData="chartData" :ids="ids" :extend="extend"  :settings="chartSettings" :data-zoom="dataZoom" ></stateChart>-->
<!--            </el-col>-->

<!--          </el-row>-->


<!--        </el-col>-->
<!--      </el-row>-->
<!--    </el-main>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--    // import {mapGetters} from 'vuex'-->
<!--    import {inventoryPageList,inventoryChart} from '@/api/baoBiao'-->
<!--    import {-->
<!--        deviceList-->
<!--    } from '@/api/material'-->
<!--    import {debounce} from '@/utils/debounce';-->
<!--    import stateChart from '@/components/stateChart'-->
<!--    import vueEasyPrint from "vue-easy-print";-->

<!--    export default {-->
<!--        name: "statementDetails1",-->
<!--        components: {-->
<!--            vueEasyPrint,stateChart-->
<!--        },-->
<!--        data() {-->
<!--            this.dataZoom = [-->
<!--                {-->
<!--                    type: 'slider',-->
<!--                    start: 0,-->
<!--                    end: 20-->
<!--                }-->
<!--            ]-->
<!--            this.extend = {-->
<!--                //x轴文本设置-->
<!--                // 'xAxis.0.axisLabel.rotate': 60,//x轴文本倾斜-->
<!--                // 'axisLabel':{-->
<!--                //     interval:0 ,-->
<!--                //     formatter:function(val){-->
<!--                //         return val.split("").join("\n");-->
<!--                //     }-->
<!--                // }-->
<!--            }-->
<!--            this.chartSettings = {-->
<!--                metrics: ['数量'],-->
<!--                //     dimension: ['名称']-->
<!--            }-->
<!--            return {-->
<!--                listQuery:{-->
<!--                    pageNumber: 1,-->
<!--                    pageSize: 10,-->
<!--                    deviceNo:'',-->
<!--                    endTime:null,-->
<!--                    startTime:null,-->
<!--                    search:'',-->
<!--                },-->

<!--                pickerOptions: {-->
<!--                    shortcuts: [{-->
<!--                        text: '最近一周',-->
<!--                        onClick(picker) {-->
<!--                            const end = new Date();-->
<!--                            const start = new Date();-->
<!--                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);-->
<!--                            picker.$emit('pick', [start, end]);-->
<!--                        }-->
<!--                    }, {-->
<!--                        text: '最近一个月',-->
<!--                        onClick(picker) {-->
<!--                            const end = new Date();-->
<!--                            const start = new Date();-->
<!--                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);-->
<!--                            picker.$emit('pick', [start, end]);-->
<!--                        }-->
<!--                    }, {-->
<!--                        text: '最近三个月',-->
<!--                        onClick(picker) {-->
<!--                            const end = new Date();-->
<!--                            const start = new Date();-->
<!--                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);-->
<!--                            picker.$emit('pick', [start, end]);-->
<!--                        }-->
<!--                    }]-->
<!--                },-->
<!--                iHide:true,-->
<!--                iHideShow:false,-->
<!--                searchtxt:'',-->
<!--                ids:'0',-->
<!--                list: null,-->
<!--                total: null,-->
<!--                listLoading: false,-->
<!--                value2: '',-->
<!--                options5: [],-->
<!--                value4: '',-->
<!--                input: '',-->
<!--                search: '',-->
<!--                printT:false,-->
<!--                options2: [{-->
<!--                    value: 'a',-->
<!--                    label: '柱状图'-->
<!--                }, {-->
<!--                    value: 'b',-->
<!--                    label: '折线图',-->
<!--                }, {-->
<!--                    value: 'c',-->
<!--                    label: '条形图'-->
<!--                }, {-->
<!--                    value: 'd',-->
<!--                    label: '散点图'-->
<!--                }],-->
<!--                value3: '柱状图',-->
<!--                chartData: {},-->
<!--            };-->
<!--        },-->
<!--        // computed: {-->
<!--        //   ...mapGetters([-->
<!--        //     'cutting',-->
<!--        //   ]),-->
<!--        // },-->
<!--        created() {-->
<!--            this.operationIndex();-->
<!--            this.$watch('searchtxt', debounce((newQuery) => {-->
<!--                this.queryClick(newQuery);-->
<!--            }, 1000))-->
<!--        },-->
<!--        methods: {-->
<!--            getList() {-->
<!--                this.listLoading = true;-->
<!--                inventoryPageList(this.listQuery).then(response => {-->
<!--                    if(response.code !=='1'){-->
<!--                        this.$message({-->
<!--                            message: response.msg,-->
<!--                            type: 'error',-->
<!--                            duration: 1000-->
<!--                        });-->
<!--                        return-->
<!--                    }-->
<!--                    this.listLoading = false;-->
<!--                    this.list = response.data.result;-->
<!--                    this.total = response.data.total;-->
<!--                });-->
<!--            },-->
<!--            queryClick(newQuery) {-->
<!--                let mv = this;-->
<!--                mv.listQuery.pageNumber = 1;-->
<!--                mv.list = [];-->
<!--                mv.listQuery.search=newQuery;-->
<!--                mv.getList();-->
<!--                mv.inventoryChart(mv.value3);-->
<!--            },-->
<!--            handleUserList(val){-->
<!--                let mv=this;-->
<!--                // mv.searchHouse.pageNumber=1;-->
<!--                if(val==''){-->
<!--                    mv.listQuery.deviceNo='';-->
<!--                    mv.getList();-->
<!--                    return-->
<!--                }else {-->
<!--                    switch(val) {-->
<!--                        case val:-->
<!--                            mv.listQuery.deviceNo=val;-->
<!--                            mv.getList();-->
<!--                            mv.inventoryChart(mv.value3);-->
<!--                            break;-->
<!--                    }-->
<!--                }-->
<!--            },-->
<!--            //下拉-->
<!--            operationIndex(){-->
<!--                let mv=this;-->
<!--                deviceList().then(response=> {-->
<!--                    if(response.code !=='1'){-->
<!--                        mv.$message({-->
<!--                            message: response.msg,-->
<!--                            type: 'error',-->
<!--                        });-->
<!--                        return-->
<!--                    }-->
<!--                    // let IpPositonhome=  sessionStorage.getItem('IpPositonhome');-->
<!--                    mv.options5=response.data;-->
<!--                    // for(let i=0;i<response.data.length;i++){-->
<!--                    //     if(response.data[i].controlIp== IpPositonhome){-->
<!--                    //         mv.listQuery.deviceNo=response.data[i].deviceNo;-->
<!--                    //         mv.value4=response.data[i].id;-->
<!--                    //         // mv.machineDeviceNo=response.data[i].id;-->
<!--                    //     }else {-->
<!--                    //-->
<!--                    //-->
<!--                    //     }-->
<!--                    // }-->
<!--                    mv.listQuery.deviceNo=response.data[0].deviceNo;-->
<!--                    mv.value4=response.data[0].id;-->
<!--                    // mv.listQuery.deviceNo=response.data[0].id;-->
<!--                    // let h=this.listQuery;-->
<!--                    // h.search=this.listQuery.deviceNo;-->
<!--                    mv.inventoryChart(mv.value3);-->
<!--                    mv.getList();-->
<!--                })-->
<!--            },-->
<!--            // printMe(){-->
<!--            //   this.$print(this.$refs.print) // 使用-->
<!--            // },-->
<!--            handleCommand(val) {-->
<!--                let mv=this;-->
<!--                switch(val) {-->
<!--                    case 'a':-->
<!--                        mv.ids='0';-->
<!--                        break;-->
<!--                    case 'b':-->
<!--                        mv.ids='1';-->
<!--                        break;-->
<!--                    case 'c':-->
<!--                        mv.ids='2';-->
<!--                        break;-->
<!--                    case 'd':-->
<!--                        mv.ids='3';-->
<!--                        break;-->
<!--                    case 'e':-->
<!--                        mv.ids='4';-->
<!--                        break;-->
<!--                }-->

<!--            },-->

<!--            inventoryChart(val){-->
<!--                let mv=this;-->
<!--                let sendData = '';-->
<!--                sendData += `deviceNo=${ mv.listQuery.deviceNo}&`;-->
<!--                sendData += `pageNumber=${mv.listQuery.pageNumber}&`;-->
<!--                sendData += `pageSize=${mv.listQuery.pageSize}&`;-->
<!--                sendData += `search=${mv.listQuery.search}&`;-->
<!--                if(mv.listQuery.startTime==undefined||mv.listQuery.endTime==undefined){-->
<!--                    this.$delete(mv.listQuery,"endTime");-->
<!--                    this.$delete(mv.listQuery,"startTime");-->
<!--                }else if(mv.listQuery.startTime==null||mv.listQuery.endTime==null){-->
<!--                    this.$delete(mv.listQuery,"endTime");-->
<!--                    this.$delete(mv.listQuery,"startTime");-->
<!--                }else {-->
<!--                    sendData += `startTime=${mv.listQuery.startTime}&`;-->
<!--                    sendData += `endTime=${mv.listQuery.endTime}&`;-->
<!--                }-->

<!--                inventoryChart(sendData).then(response=> {-->
<!--                    if(response.code !=='1'){-->
<!--                        mv.$message({-->
<!--                            message: response.msg,-->
<!--                            type: 'error',-->
<!--                        });-->
<!--                        return-->
<!--                    }-->
<!--                    mv.chartData=response.data.chartData-->
<!--                });-->
<!--            },-->

<!--            export2Excel(){-->
<!--                require.ensure([], () => {-->
<!--                    const { export_json_to_excel } = require('../../../../vendor/Export2Excel');-->
<!--                    const tHeader = ['名称','规格','数量','盘库时间',];-->
<!--                    const filterVal = ['name', 'size', 'supplyQuantity', 'stockDate',];-->
<!--                    const list = this.list;-->
<!--                    const data = this.formatJson(filterVal, list);-->
<!--                    export_json_to_excel(tHeader, data, '盘库统计');-->
<!--                })-->
<!--            },-->
<!--            formatJson(filterVal, jsonData) {-->
<!--                return jsonData.map(v => filterVal.map(j => v[j]))-->
<!--            },-->
<!--            handledaterange(val){-->
<!--                let mv=this;-->
<!--                if(val==null){-->
<!--                    // mv.listQuery.endTime='';-->
<!--                    this.$delete(mv.listQuery,"endTime");-->
<!--                    this.$delete(mv.listQuery,"startTime");-->
<!--                    // mv.listQuery.startTime='';-->
<!--                    mv.listQuery.pageNumber=1;-->
<!--                    mv.getList();-->
<!--                    mv.inventoryChart()-->
<!--                }else {-->
<!--                    mv.searchBrandList();-->
<!--                }-->
<!--            },-->
<!--            handleSizeChange(val) {-->
<!--                this.listQuery.pageNumber = 1;-->
<!--                this.listQuery.pageSize = val;-->
<!--                this.getList();-->
<!--                this.inventoryChart()-->
<!--            },-->
<!--            handleCurrentChange(val) {-->
<!--                this.listQuery.pageNumber = val;-->
<!--                this.getList();-->
<!--                this.inventoryChart()-->
<!--            },-->
<!--            searchBrandList() {-->
<!--                this.listQuery.pageNumber = 1;-->
<!--                if(this.value2==null){-->
<!--                    this.listQuery.startTime=[];-->
<!--                    this.listQuery.endTime=[];-->
<!--                }else {-->
<!--                    this.listQuery.startTime=this.value2[0];-->
<!--                    this.listQuery.endTime=this.value2[1];-->
<!--                }-->

<!--                this.getList();-->
<!--                this.inventoryChart()-->
<!--            },-->
<!--            reportButton(){-->
<!--                let mv=this;-->
<!--                mv.iHide =!mv.iHide;-->
<!--                // mv.inventoryChart();-->
<!--            },-->
<!--            //打印条形码-->
<!--            print(){-->
<!--                this.$refs.easyPrint.print();-->
<!--            },-->
<!--            //打印触发的方法-->
<!--            // print() {-->
<!--            //   let that = this;-->
<!--            //   $('.resImg,.resWith').css({ //从新绘制这块区域让它固定在每一个页面底部-->
<!--            //     'width':'700px',-->
<!--            //     // 'left':'px'-->
<!--            //   })//此方法仅限单页-->
<!--            //   $('.el-table__body').css({ //从新绘制这块区域让它固定在每一个页面底部-->
<!--            //     'width':'100% !important',-->
<!--            //-->
<!--            //   })-->
<!--            //   that.printT=true;-->
<!--            //   let oldstr = document.body.innerHTML; // 获取当前页面内容用以还原-->
<!--            //   let div_print = document.getElementById("printTest"); // 获取要打印部分的内容-->
<!--            //   let cv = document.getElementsByTagName("canvas")[0]; //获取canvas-->
<!--            //   let resImg = document.getElementsByClassName("resImg")[0]; //获取包裹canvas的标签-->
<!--            //   // 将canvas转为图片-->
<!--            //   let context = cv.getContext("2d");-->
<!--            //   let img = new Image();-->
<!--            //   let strDataURI = cv.toDataURL("image/png");-->
<!--            //   img.src = strDataURI;-->
<!--            //   // 图片加载完成之后-->
<!--            //   img.onload = function() {-->
<!--            //     // 执行打印-->
<!--            //     // console.log(img);-->
<!--            //     setTimeout(function() {-->
<!--            //       resImg.innerHTML = `<img src="${strDataURI}">`; // 用图片替代canvas-->
<!--            //       let newstr = div_print.innerHTML;-->
<!--            //       document.body.innerHTML = newstr; // 将页面内容改为修改后的内容-->
<!--            //       window.print(); // 打印-->
<!--            //       window.location.reload(); // 重新加载页面-->
<!--            //       document.body.innerHTML = oldstr; // 将页面内容还原-->
<!--            //     }, 1000);-->
<!--            //   };-->
<!--            // },-->

<!--            // getSummaries(param) {-->
<!--            //   const { columns, data } = param;-->
<!--            //   const sums = [];-->
<!--            //   columns.forEach((column, index) => {-->
<!--            //     if (index === 0) {-->
<!--            //       sums[index] = '总值';-->
<!--            //       return;-->
<!--            //     }-->
<!--            //     const values = (data||[]).map(item => Number(item[column.property]));-->
<!--            //     if (!values.every(value => isNaN(value))) {-->
<!--            //       sums[index] = values.reduce((prev, curr) => {-->
<!--            //         const value = Number(curr);-->
<!--            //         if (!isNaN(value)) {-->
<!--            //           return prev + curr;-->
<!--            //         } else {-->
<!--            //           return prev;-->
<!--            //         }-->
<!--            //       }, 0);-->
<!--            //       sums[index] += ' ';-->
<!--            //     } else {-->
<!--            //       sums[index] = 'N/A';-->
<!--            //     }-->
<!--            //   });-->
<!--            //-->
<!--            //   return sums;-->
<!--            // }-->
<!--        },-->
<!--    }-->
<!--</script>-->

<!--<style type="text/scss"  rel="stylesheet/scss" lang="scss" scoped>-->

<!--  .baoB {-->
<!--    height: 100%;-->

<!--    .baoBScoll {-->
<!--      height: calc(100% - 1px)-->
<!--    }-->

<!--    .baoBTop {-->
<!--      background: #fff;-->
<!--      padding: 10px;-->
<!--      width: 100%;-->
<!--      float: left;-->
<!--      position: relative;-->
<!--      z-index: 9;-->
<!--    }-->

<!--    .block {-->
<!--      display: flex;-->
<!--      float: left;-->
<!--    }-->

<!--    .baoButton {-->
<!--      float: left;-->
<!--      display: flex;-->
<!--      padding: 0 10px;-->

<!--    }-->

<!--    .filter-container {-->
<!--      display: flex;-->
<!--      float: left;-->
<!--    }-->
<!--    .baoTopBo{-->
<!--      float: right;-->
<!--      display: flex;-->
<!--      z-index: 999;-->
<!--      position: relative;-->
<!--      line-height: 40px;-->
<!--      padding-right: 10px;-->
<!--    }-->
<!--    .baoBShout {-->
<!--      display: flex;-->
<!--      float: left;-->

<!--      .el-form-item {-->
<!--        display: flex;-->
<!--        float: left;-->
<!--        margin-bottom: 0;-->
<!--      }-->
<!--    }-->

<!--    .baoTopRight {-->
<!--      float: right;-->
<!--      display: flex;-->
<!--    }-->

<!--    .baoBMain {-->
<!--      margin: 0 0 0 0;-->
<!--      display: flex;-->
<!--      float: left;-->
<!--      width: 100%;-->

<!--      .table-container {-->
<!--        width: 100%;-->
<!--      }-->
<!--    }-->

<!--    .baoBTableFoot {-->
<!--      float: left;-->
<!--      display: flex;-->
<!--      width: 100%;-->
<!--      background: #fff;-->
<!--      padding: 10px 0;-->

<!--      .el-pagination {-->
<!--        float: left;-->
<!--        display: flex;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--  .baoRightB{-->
<!--    background: #fff;-->
<!--    height: 100%;-->
<!--    margin-top: 22px;-->
<!--    margin-left: 22px;-->
<!--    padding-top: 20px;-->
<!--  }-->
<!--  .inputPlace{-->
<!--    margin-left: 5px;-->
<!--    float: left;-->
<!--  }-->
<!--</style>-->
