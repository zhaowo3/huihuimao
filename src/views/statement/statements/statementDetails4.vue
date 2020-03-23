<template>
  <div class="baoB">
    <el-main class="baoBScoll">
      <el-row>
        <el-col :span="24">
          <div class="baoBTop">
            <div class="block">
              <el-date-picker
                v-model="value2"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
            <div class="baoButton">
              <!--              <el-button type="primary" size="medium" class="trayClose" @click="">查询</el-button>-->
              <el-button type="success" size="medium" class="trayClose" @click="export2Excel">导出</el-button>
            </div>
            <div class="filter-container" style="float: left;" shadow="never">

              <div class="baoBShout">
                <el-form :inline="true" :model="listQuery" label-width="140px">
                  <el-form-item>
                    <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="请输入关键字">
                      <i slot="suffix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div>
                <el-button
                  style="float: right"
                  @click="searchBrandList()"
                  type="primary"
                  size="medium">
                  查询结果
                </el-button>
              </div>

            </div>
            <div class="baoTopRight">


              <el-button type="primary" class="trayClose"   @click="print" >打印</el-button>
              <!--              <el-button type="primary" class="trayClose" @click="">下载</el-button>-->
              <!--              <el-button type="primary" class="trayClose" @click="">重新生成</el-button>-->
            </div>
            <div class="baoTopBo" >
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
          <el-row  id="printTest">
            <h3 v-if="printT" style="text-align: center;">消耗统计</h3>
            <el-col :span="16" class="resWith">
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
                    <el-table-column prop="size" label="规格" sortable align="center">
                      <template slot-scope="scope" sortable>{{scope.row.size}}</template>
                    </el-table-column>
                    <el-table-column prop="useQuantity" sortable label="使用量" width="100" align="left">
                      <template slot-scope="scope" sortable>{{scope.row.useQuantity}}</template>
                    </el-table-column>
                    <el-table-column prop="pirce" sortable label="单价" width="100" align="center">
                      <template slot-scope="scope" sortable>{{scope.row.pirce}}</template>
                    </el-table-column>
                    <el-table-column prop="totalPrice" sortable label="总价" width="200" align="center">
                      <template slot-scope="scope" sortable>
                        {{scope.row.totalPrice}}
                      </template>
                    </el-table-column>
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
                    :page-sizes="[5,10,15]"
                    :current-page.sync="listQuery.pageNumber"
                    :total="total">
                  </el-pagination>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="resImg">
              <stateChart :chartData="chartData" :ids="ids" ></stateChart>
            </el-col>
          </el-row>


        </el-col>
      </el-row>
    </el-main>


  </div>
</template>

<script>
  import {mapGetters,} from 'vuex'
  import {consumptionStat} from '@/api/baoBiao'
  import stateChart from '@/components/stateChart'
  const defaultListQuery = {
    pageNumber: 1,
    pageSize: 5,
    keyword: null
  };
  export default {
    name: "statementDetails4",
    components: {
      stateChart,
    },
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        ids:'',
        list: [],
        total: null,
        listLoading: false,
        value2: '',
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
          label: '饼图'
        }, {
          value: 'd',
          label: 'K线图'
        }, {
          value: 'e',
          label: '散点图'
        }],
        value3: '柱状图',
        chartData: {
          columns: ['日期', '使用量'],
          rows: [
            { '日期': '8/27', '使用量': 93},
            { '日期': '8/26', '使用量': 30},
            { '日期': '8/25', '使用量': 23},
            { '日期': '8/24', '使用量': 23},
            { '日期': '8/23', '使用量': 92},
            { '日期': '8/22', '使用量': 93}
          ]
        },
      };
    },
    computed: {
      ...mapGetters([
        'cutting',
      ]),
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        consumptionStat(this.listQuery).then(response => {
          if(response.code=='-1'){
            this.$message({
              message: response.msg,
              type: 'error',
            });
            return
          }
          this.listLoading = false;
          this.list = response.data.result;
          this.total = response.data.total;
        });
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
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },

      export2Excel(){
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../../vendor/Export2Excel');
          const tHeader = ['名称','规格','使用量','单价','总价',];
          const filterVal = ['name', 'size', 'useQuantity', 'pirce', 'totalPrice', ];
          const list = this.list;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '消耗统计');
        })
      },
      handleSizeChange(val) {
        this.listQuery.pageNumber = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNumber = val;
        this.getList();
      },
      searchBrandList(){
        this.listQuery.pageNumber = 1;
        this.getList();
      },
      //打印触发的方法
      print() {
        let that = this;
        $('.resImg,.resWith').css({ //从新绘制这块区域让它固定在每一个页面底部
          'width':'700px',
          // 'left':'px'
        })//此方法仅限单页
        $('.el-table__body').css({ //从新绘制这块区域让它固定在每一个页面底部
          'width':'100% !important',

        })
        that.printT=true;
        let oldstr = document.body.innerHTML; // 获取当前页面内容用以还原
        let div_print = document.getElementById("printTest"); // 获取要打印部分的内容
        let cv = document.getElementsByTagName("canvas")[0]; //获取canvas
        let resImg = document.getElementsByClassName("resImg")[0]; //获取包裹canvas的标签
        // 将canvas转为图片
        let context = cv.getContext("2d");
        let img = new Image();
        let strDataURI = cv.toDataURL("image/png");
        img.src = strDataURI;
        // 图片加载完成之后
        img.onload = function() {
          // 执行打印
          // console.log(img);
          setTimeout(function() {
            resImg.innerHTML = `<img src="${strDataURI}">`; // 用图片替代canvas
            let newstr = div_print.innerHTML;
            document.body.innerHTML = newstr; // 将页面内容改为修改后的内容
            window.print(); // 打印
            window.location.reload(); // 重新加载页面
            document.body.innerHTML = oldstr; // 将页面内容还原
          }, 1000);
        };
      },

      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总值';
            return;
          }
          const values = (data||[]).map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' ';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }
    },
  }
</script>

<style type="text/scss"  rel="stylesheet/scss" lang="scss" scoped>

  .baoB {
    height: 100%;

    .baoBScoll {
      height: calc(100% - 1px)
    }

    .baoBTop {
      background: #fff;
      padding: 10px;
      width: 100%;
      float: left;
      position: relative;
      z-index: 9;
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

      .table-container {
        width: 100%;
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
    margin-left: 22px;
    padding-top: 20px;
  }

</style>
