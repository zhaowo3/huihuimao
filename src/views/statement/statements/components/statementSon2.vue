<!--<template>-->
<!--  <div class="baoB">-->
<!--    <el-main class="baoBScoll">-->
<!--      <el-row>-->
<!--        <el-col :span="24">-->
<!--          <div class="baoBTop">-->
<!--            <div class="block">-->
<!--              <el-date-picker-->
<!--                v-model="value2"-->
<!--                @change="handledaterange(value2)"-->
<!--                type="date"-->
<!--                value-format="yyyy-MM-dd"-->
<!--                placeholder="选择日期">-->
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


<!--              <el-button type="primary" class="trayClose"   @click="print" >打印</el-button>-->
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
<!--&lt;!&ndash;            <el-col :span="16" class="resWith">&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="baoBMain">&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="table-container">&ndash;&gt;-->
<!--&lt;!&ndash;                  <el-table ref="brandTable"&ndash;&gt;-->
<!--&lt;!&ndash;                            :data="list"&ndash;&gt;-->
<!--&lt;!&ndash;                            style="width: 100%;"&ndash;&gt;-->
<!--&lt;!&ndash;                            v-loading="listLoading"&ndash;&gt;-->
<!--&lt;!&ndash;                            show-summary&ndash;&gt;-->
<!--&lt;!&ndash;                            border>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-table-column label="名称" sortable align="left">&ndash;&gt;-->
<!--&lt;!&ndash;                      <template slot-scope="scope">{{scope.row.name}}</template>&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-table-column prop="size" label="规格" sortable align="center" >&ndash;&gt;-->
<!--&lt;!&ndash;                      <template slot-scope="scope" sortable>{{scope.row.size}}</template>&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-table-column  label="条码" align="center" >&ndash;&gt;-->
<!--&lt;!&ndash;                      <template slot-scope="scope" sortable>{{scope.row.barcode}}</template>&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-table-column prop="outQuantity" sortable label="使用量" width="150" align="center">&ndash;&gt;-->
<!--&lt;!&ndash;                      <template slot-scope="scope" sortable>{{scope.row.outQuantity}}</template>&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-table-column prop="remnantQuantity" sortable label="剩余量" width="150" align="center">&ndash;&gt;-->
<!--&lt;!&ndash;                      <template slot-scope="scope" sortable>{{scope.row.remnantQuantity}}</template>&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-table-column  sortable label="效期" width="200" align="center">&ndash;&gt;-->
<!--&lt;!&ndash;                      <template slot-scope="scope" sortable>{{scope.row.statiDate}}</template>&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                    &lt;!&ndash;                    <el-table-column prop="totalPrice" sortable label="总价" width="200" align="center">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                    &lt;!&ndash;                      <template slot-scope="scope" sortable>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                    &lt;!&ndash;                        {{scope.row.totalPrice}}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                    &lt;!&ndash;                      </template>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                    &lt;!&ndash;                    </el-table-column>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                  </el-table>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="baoBTableFoot">&ndash;&gt;-->

<!--&lt;!&ndash;                <div class="pagination-container">&ndash;&gt;-->
<!--&lt;!&ndash;                  <el-pagination&ndash;&gt;-->
<!--&lt;!&ndash;                    background&ndash;&gt;-->
<!--&lt;!&ndash;                    @size-change="handleSizeChange"&ndash;&gt;-->
<!--&lt;!&ndash;                    @current-change="handleCurrentChange"&ndash;&gt;-->
<!--&lt;!&ndash;                    layout="total, sizes,prev, pager, next,jumper"&ndash;&gt;-->
<!--&lt;!&ndash;                    :page-size="listQuery.pageSize"&ndash;&gt;-->
<!--&lt;!&ndash;                    :page-sizes="[5,10,total]"&ndash;&gt;-->
<!--&lt;!&ndash;                    :current-page.sync="listQuery.pageNumber"&ndash;&gt;-->
<!--&lt;!&ndash;                    :total="total">&ndash;&gt;-->
<!--&lt;!&ndash;                  </el-pagination>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-col>&ndash;&gt;-->
<!--            <el-col :span="24" class="resImg">-->
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
<!--    import {stockPageList,stockChart} from '@/api/baoBiao'-->
<!--    import {-->
<!--        deviceList-->
<!--    } from '@/api/material'-->
<!--    import stateChart from '@/components/stateChart'-->
<!--    export default {-->
<!--        name: "statementSon2",-->
<!--        components: {-->
<!--            stateChart,-->
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
<!--            }-->
<!--            this.chartSettings = {-->
<!--                metrics: ['剩余量',],-->
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

<!--                // pickerOptions: {-->
<!--                //     shortcuts: [{-->
<!--                //         text: '最近一周',-->
<!--                //         onClick(picker) {-->
<!--                //             const end = new Date();-->
<!--                //             const start = new Date();-->
<!--                //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);-->
<!--                //             picker.$emit('pick', [start, end]);-->
<!--                //         }-->
<!--                //     }, {-->
<!--                //         text: '最近一个月',-->
<!--                //         onClick(picker) {-->
<!--                //             const end = new Date();-->
<!--                //             const start = new Date();-->
<!--                //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);-->
<!--                //             picker.$emit('pick', [start, end]);-->
<!--                //         }-->
<!--                //     }, {-->
<!--                //         text: '最近三个月',-->
<!--                //         onClick(picker) {-->
<!--                //             const end = new Date();-->
<!--                //             const start = new Date();-->
<!--                //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);-->
<!--                //             picker.$emit('pick', [start, end]);-->
<!--                //         }-->
<!--                //     }]-->
<!--                // },-->
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
<!--        //     ...mapGetters([-->
<!--        //         'cutting',-->
<!--        //     ]),-->
<!--        // },-->
<!--        created() {-->
<!--            this.operationIndex();-->
<!--            // this.$watch('searchtxt', debounce((newQuery) => {-->
<!--            //     this.queryClick(newQuery);-->
<!--            // }, 1000))-->
<!--        },-->
<!--        methods: {-->
<!--            getList() {-->
<!--                this.listLoading = true;-->
<!--                stockPageList(this.listQuery).then(response => {-->
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

<!--                stockChart(sendData).then(response=> {-->
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
<!--                    const tHeader = ['名称','规格','条码','剩余量','使用量','效期'];-->
<!--                    const filterVal = ['name', 'size','barcode', 'outQuantity', 'remnantQuantity','statiDate'];-->
<!--                    const list = this.list;-->
<!--                    const data = this.formatJson(filterVal, list);-->
<!--                    export_json_to_excel(tHeader, data, '物资库存统计');-->
<!--                })-->
<!--            },-->
<!--            formatJson(filterVal, jsonData) {-->
<!--                return jsonData.map(v => filterVal.map(j => v[j]))-->
<!--            },-->
<!--            handledaterange(val){-->
<!--                let mv=this;-->
<!--                if(val==null){-->
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
<!--                let mv=this;-->
<!--                this.listQuery.pageNumber = 1;-->
<!--                if(this.value2==null){-->
<!--                    mv.listQuery.startTime='';-->
<!--                    mv.listQuery.endTime='';-->
<!--                }else {-->
<!--                    mv.listQuery.startTime=mv.value2;-->
<!--                    mv.listQuery.endTime=mv.value2;-->
<!--                }-->

<!--                this.getList();-->
<!--                this.inventoryChart()-->
<!--            },-->
<!--            //打印触发的方法-->
<!--            print() {-->
<!--                let that = this;-->
<!--                $('.resImg,.resWith').css({ //从新绘制这块区域让它固定在每一个页面底部-->
<!--                    'width':'700px',-->
<!--                    // 'left':'px'-->
<!--                })//此方法仅限单页-->
<!--                $('.el-table__body').css({ //从新绘制这块区域让它固定在每一个页面底部-->
<!--                    'width':'100% !important',-->

<!--                })-->
<!--                that.printT=true;-->
<!--                let oldstr = document.body.innerHTML; // 获取当前页面内容用以还原-->
<!--                let div_print = document.getElementById("printTest"); // 获取要打印部分的内容-->
<!--                let cv = document.getElementsByTagName("canvas")[0]; //获取canvas-->
<!--                let resImg = document.getElementsByClassName("resImg")[0]; //获取包裹canvas的标签-->
<!--                // 将canvas转为图片-->
<!--                let context = cv.getContext("2d");-->
<!--                let img = new Image();-->
<!--                let strDataURI = cv.toDataURL("image/png");-->
<!--                img.src = strDataURI;-->
<!--                // 图片加载完成之后-->
<!--                img.onload = function() {-->
<!--                    // 执行打印-->
<!--                    // console.log(img);-->
<!--                    setTimeout(function() {-->
<!--                        resImg.innerHTML = `<img src="${strDataURI}">`; // 用图片替代canvas-->
<!--                        let newstr = div_print.innerHTML;-->
<!--                        document.body.innerHTML = newstr; // 将页面内容改为修改后的内容-->
<!--                        window.print(); // 打印-->
<!--                        window.location.reload(); // 重新加载页面-->
<!--                        document.body.innerHTML = oldstr; // 将页面内容还原-->
<!--                    }, 1000);-->
<!--                };-->
<!--            },-->

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
