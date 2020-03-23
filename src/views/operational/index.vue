<template>
  <div class="baoB">
    <el-main class="baoBScoll">
      <el-row>
        <el-col :span="24">

          <div class="baoBTop">
            <div class="baoTopBo" id="hamburger-SelectionModule">
              <el-select v-model="value3" placeholder="类型" @change="handleCommand(value3)">
                <el-option
                  v-for="item in options2"
                  :key="item.id"
                  :label="item.index_name"
                  :value="item.id"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </div>
            <div class="block" id="hamburger-periodTime">
              <el-date-picker
                @change="handledaterange(value2)"
                v-model="value2"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                popper-class="picker-no-text"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
            <div class="filter-container" style="float: left;" shadow="never">

              <div class="baoBShout" id="hamburger-periodTimePersonnel">
                <el-select v-model="value4" class="input-width" @change="handleUserList(value4)" placeholder="全部人员" clearable>
                  <el-option v-for="item in sourceTypeOptions"
                             :key="item.userName"
                             :label="item.userName"
                             :value="item.userName">
                  </el-option>
                </el-select>
<!--                <el-form :inline="true" :model="listQuery" label-width="140px">-->
<!--                  <el-form-item>-->
<!--                    <el-input style="width: 203px" v-model="listQuery.userName" placeholder="请输入用户名">-->
<!--                      <i slot="suffix" class="el-input__icon el-icon-search"></i>-->
<!--                    </el-input>-->
<!--                  </el-form-item>-->
<!--                </el-form>-->
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
<!--            <div class="baoTopRight">-->
<!--              <el-button type="success" size="medium" class="trayClose" @click="">导出</el-button>-->
<!--            </div>-->
          </div>
          <div class="baoBMain">
            <div class="table-container">
              <el-table ref="brandTable"
                        :data="list"
                        style="width: 100%;"
                        v-loading="listLoading"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        border>
                <el-table-column prop="operateName" sortable label="操作人" width="100" align="left">
                  <template slot-scope="scope">{{scope.row.operateName}}</template>
                </el-table-column>
                <el-table-column prop="operateModule" label="操作模块" width="100" align="left">
                  <template slot-scope="scope" sortable>{{scope.row.operateModule}}</template>
                </el-table-column>
                <el-table-column prop="operateDate" sortable label="操作时间" width="200" align="left">
                  <template slot-scope="scope" sortable>{{scope.row.operateDate}}</template>
                </el-table-column>
                <el-table-column prop="orderName,operateContent" sortable label="操作内容"  align="left">
                  <template slot-scope="scope" sortable>{{scope.row.orderName}} --- {{scope.row.operateContent}}</template>
                </el-table-column>
                <el-table-column prop="operateResult" sortable label="操作结果" width="150" align="left">
                  <template slot-scope="scope" sortable>{{scope.row.operateResult}}</template>
                </el-table-column>
                <el-table-column prop="operateIp" sortable label="操作IP" width="150" align="left">
                  <template slot-scope="scope" sortable>{{scope.row.operateIp}}</template>
                </el-table-column>
<!--                <el-table-column prop="totalPrice" label="总价" width="200" align="center">-->
<!--                  <template slot-scope="scope" sortable>-->
<!--                    {{scope.row.totalPrice}}-->
<!--                  </template>-->
<!--                </el-table-column>-->
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

          <el-footer>

          </el-footer>
        </el-col>
      </el-row>
    </el-main>


  </div>
</template>

<script>
  import {operationIndex,getOperationLogList,operationUserList} from '@/api/baoBiao'
  export default {
    name: "operational1",

    data() {
      return {
        listQuery:{
          search:'',
          pageNumber: 1,
          pageSize: 10,
          startDate:'',
          endDate:'',
          userName:'',
        },
        sourceTypeOptions:[],
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
        options2: [],
        value3: '出库',
        list: null,
        total: null,
        listLoading: false,
        value2: '',
        value4:'',
        input: '',
        options2s:'',
      };
    },
    created() {
      this.operationIndex();
      this.operationUserList();

    },
    methods: {
      getList() {
        this.listLoading = true;

        getOperationLogList(this.listQuery).then(response => {
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
      operationIndex(){
          let mv=this;
        operationIndex().then(response=> {
          if(response.code=='-1'){
            this.$message({
              message: response.msg,
              type: 'error',
            });
            return
          }
            mv.options2=response.data;
            mv.options2s=response.data[0];
            let h=mv.listQuery;
            h.search=mv.options2s.index_path;
          this.getList();
        })
      },
      operationUserList(){
        operationUserList().then(response=> {
          if(response.code !=='1'){
            this.$message({
              message: response.msg,
              type: 'error',
            });
            return
          }
          this.sourceTypeOptions=response.data
        })
      },
      handleUserList(val){
        let mv=this;
        mv.listQuery.pageNumber=1;
        mv.listQuery.userName=val;
        mv.getList();
      },
      handledaterange(val){
        let mv=this;
        if(val==null){
          mv.listQuery.endDate='';
          mv.listQuery.pageNumber=1;
          mv.listQuery.startDate='';
          mv.getList();
        }else {
          mv.searchBrandList();
        }
      },
      //  重置搜索
      // sortChange(data) {
      //   const { prop, order } = data
      //   if (prop === 'id') {
      //     this.sortByID(order)
      //   }
      // },
      handleCommand(val) {
        let mv=this;
        mv.listQuery.pageNumber=1;
        switch(val) {
          case val:
            mv.listQuery.search=mv.options2[val-1].index_path;
            mv.getList();
            break;

        }

      },
      searchBrandList() {
        this.listQuery.pageNumber = 1;
        if(this.value2==null){
          this.listQuery.startDate=[];
          this.listQuery.endDate=[];
        }else {
          this.listQuery.startDate=this.value2[0];
          this.listQuery.endDate=this.value2[1];
        }

        this.getList();
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
    },
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
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
    }

    .block {
      display: flex;
      float: left;
     padding-right: 10px;
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
      float: left;
      display: flex;
      z-index: 999;
      position: relative;
      line-height: 40px;
      padding-right: 10px;
    }
    .baoBShout {
      display: flex;
      float: left;
      padding-right: 10px;
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
</style>
