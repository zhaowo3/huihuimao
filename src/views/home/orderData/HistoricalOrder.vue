<template>
  <div style="height: 100%;">

    <div name="homeHeaders" class="menuMainContent">
      <div style="float: right;">
        <el-button type="primary" class="trayClose" @click="back">返回</el-button>
        <div class="autoSeach">
          <el-input v-model="searchtxt" @keyup.enter.native="queryClick(searchtxt)"
                    class="inputs1" placeholder="请输入关键字" clearable>
            <i class="iconfont icon-icon-test35" @click="queryClick(searchtxt)" slot="suffix"></i>
          </el-input>

        </div>

      </div>
    </div>
    <div class="detailsScroll" style="padding-bottom: 0;">
      <el-main class="historicalHead">
        <el-button type="primary" round>全部</el-button>
        <el-button round @click="roomSort">手术室<i class="el-icon-caret-bottom" v-if="iconBottom"></i><i
          class="el-icon-caret-top" v-if="iconTop"></i></el-button>
        <el-button round @click="roomTime">手术时间<i class="el-icon-caret-bottom" v-if="iconBottom1"></i><i
          class="el-icon-caret-top" v-if="iconTop1"></i></el-button>
        <p class="infoNum"><span>已显示:{{current}},</span><span>总数:{{houseNum}}</span></p>
      </el-main>
      <el-main class="historicalBody" v-loading="listLoading">
        <el-row :gutter="20" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                infinite-scroll-distance="10">
          <el-col :span="8" v-for="(data,index) in houseList" :key="index" style="margin-top: 10px">
            <el-card class="historicalHour">
              <router-link :to="{path:'/HistoricalHistory/',query: {orderNumber:data.orderNumber }}">
                <div class="allocationList">
                  <div class="allocationListHead"><h3>{{data.name}}</h3><i v-if="data.urgency==='1'">急</i></div>
                  <div class="bottom clearfix allocationListBody">
                    <!--            <time class="time">{{ currentDate }}</time>-->
                    <p style="width: 100%;text-align: left;" class="allocationHights">{{data.operation}}</p>
                    <p>{{data.operatiingRoom}}</p>
                    <p>{{data.scheduledTime}}</p>
                    <p>{{data.sequence}}台次</p>
                    <p>{{data.wardCode}}</p>
                    <p>{{data.betno}}床位</p>
                    <p>住院号:<span>{{data.patientId}}</span></p>
                    <p>医师：<span>{{data.doctorIncharge}}</span></p>
                    <div class="allocationListBoot">
                      <div class="allocationListBootLi" :span="6">
                        <el-tag>已 取</el-tag>
                        <span>{{data.supposeQuantity}}</span></div>
                      <div class="allocationListBootLi" :span="6">
                        <el-tag>已 用</el-tag>
                        <span>{{data.useQuantity}}</span></div>
                      <div class="allocationListBootLi" :span="6">
                        <el-tag>已 退</el-tag>
                        <span>{{data.returnQuantity}}</span></div>
                      <div class="allocationListBootLi" :span="6">
                        <el-button type="primary" @click.shop.prevent="recovery(data.orderNumber)" class="buttonBored"
                                   circle><i class="iconfont icon-huifu-"></i></el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </el-card>

          </el-col>
          <div
            style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px;float: left;"
            v-show="droping">加载中
          </div>
          <div
            style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px;float: left;"
            v-show="noMore">没有更多的数据
          </div>

        </el-row>
      </el-main>
    </div>
  </div>
</template>

<script>
  import {
    pageList, againOrder
  } from '@/api/home';
  import {debounce} from '@/utils/debounce';
  import {
    searchS
  } from '@/api/systemsL'

  export default {
    name: "HistoricalOrder",
    data() {
      return {
        listLoading: false,
        loading: false,
        houseList: [],
        iconBottom: true,
        iconTop: false,
        iconBottom1: true,
        iconTop1: false,
        searchHouse: {
          status: 4,
          pageSize: 9,
          pageNumber: 0,
          columnName: 'scheduled_time',
          orderType: 'desc',

        },
        search: '',
        busy: false,
        houseNum: '',
          current:'',
        droping: false,
        noMore: false,
        searchtxt: '',
      }
    },
    created() {
      this.$store.state.showBottomNav = false;
      this.$watch('searchtxt', debounce((newQuery) => {
        this.queryClick(newQuery);
      }, 1000))
    },
    methods: {
      queryClick(newQuery) {
        let mv = this;
        mv.searchHouse.pageNumber = 1;
        mv.houseList = [];
        mv.querySearch(newQuery);
      },
      //搜索
      querySearch(newQuery) {
        let mv = this;
        let hou = this.searchHouse;
        hou.search = newQuery;
        pageList(hou).then(res => {
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
            if(listTotal<=mv.searchHouse.pageSize){
                mv.houseList=res.data.result;
                mv.houseNum = res.data.total;
                this.busy = true;
                mv.noMore = true; // 切换底部提示信息
                mv.droping = false
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
                    this.droping = false;
                    mv.current= mv.houseList.length;
                } else {
                    this.busy = false // 将无限滚动给打开
                    this.droping = true
                    this.noMore = false // 切换底部提示信息
                }
                mv.current= mv.houseList.length;
            }
        }).catch(function (error) {
          mv.$message({
            message: error.msg,
            type: 'error'
          });
          mv.droping = false
        });
      },
      //  恢复订单
      recovery(order) {
        this.$confirm('是否要恢复该订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          againOrder(
            this.Qs.stringify({
              orderNumber: order
            })).then(response => {
            if(response.code !=='1'){
              this.$message({
                message: response.msg,
                type: 'error',
                duration: 1000,
              });
              return
            }
            this.$message({
              type: 'success',
              message: response.msg
            });
            let mv = this;
            for (let i = 0; i < mv.houseList.length; i++) {
              let obj = mv.houseList[i];
              if (obj.orderNumber == order) {
                this.houseList.splice(i, 1);
                i--
              }
            }
            // mv.houseList=[];
            // this.$router.go(0);//返回上一层
            // this.searchSource() // 请求数据
          })
            .catch(() => {

            });
        }).catch(() => {

        });
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
        back() {
            this.$router.push({path: '/home'});//返回上一层
        },
      searchSource() {
        let mv = this;
        pageList(this.searchHouse).then(response => {
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
                mv.noMore = true; // 切换底部提示信息
                mv.droping = false;
                mv.current= mv.houseList.length;
            }else {
                mv.houseList = mv.houseList.concat(response.data.result);
                let DownloadTotal =
                    (mv.searchHouse.pageNumber + 1) * mv.searchHouse.pageSize
                let total = response.data.total;
                mv.houseNum = response.data.total;
                let totalPage = (mv.houseNum + mv.searchHouse.pageSize - 1) / mv.searchHouse.pageSize;
                // mv.searchHouse.pageNumber++; //增加页数
                if (mv.searchHouse.pageNumber + 1 >= totalPage) {
                    this.busy = true // 将无限滚动关闭
                    this.searchHouse.page = 0 // 页数变为0
                    this.noMore = true // 切换底部提示信息
                    this.droping = false;
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
            type: 'error'
          });
          this.droping = false
        });


      },
      roomSort() {
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
      roomTime() {
        if (this.searchHouse.columnName == 'scheduled_time') {
          this.searchHouse.columnName = 'betno';
          this.iconBottom1 = false;
          this.iconTop1 = true;
          this.houseList = [];
          this.searchHouse.pageNumber = 1;
          this.searchSource() // 请求数据
        } else {
          this.searchHouse.columnName = 'scheduled_time';
          this.iconBottom1 = true;
          this.iconTop1 = false;

          this.houseList = [];
          this.searchHouse.pageNumber = 1;
          this.searchSource() // 请求数据
        }

      },

    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
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

  .buttonBored {
    float: left;
    width: 50px;
    height: 50px;
    position: relative;
    top: -15px;
  }

  .detailsScroll {
    height: calc(100% - 100px);
    position: relative;

    .historicalHead {
      float: left;
      display: flex;
      width: 100%;
    position: relative;
      button {
        margin-right: 20px;
      }
    }

    .historicalBody {
      padding-top: 0;
      height: 100%;

      .historicalHour:hover {
        border-color: #0ebbf3;
        border-width: 1px;
        border-style: solid;
        cursor: pointer;
      }

      .allocationList {
        width: 100%;
        border-bottom-width: 1px;
        border-bottom-color: #f0f0f0;


        .allocationListHead {
          display: flex;
          justify-content: space-between;

          h3 {
            font-size: 18px;
            text-align: left;
            padding-top: 4px;
            margin-bottom: 10px;
          }

          i {
            font-size: 16px;
            border-radius: 50%;
            background: #ed0200;
            width: 36px;
            height: 36px;
            font-style: normal;
            line-height: 36px;
            color: #fff;
            text-align: center;
          }
        }

        .allocationListBody {
          .allocationHights {
            min-height: 40px;
            max-height: 40px;
            height: auto !important;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            white-space:normal !important;
            line-height:inherit;
          }

          p {
            width: 50%;
            font-size: 16px;
            float: left;
            line-height: initial;
            margin-top: 10px;
            box-sizing: border-box;
            display: flex;
          }

          p:before {
            content: '';
            clear: both;
            display: inline-block;
            border-width: 1px;
          }
          p::after {
            display:table;
            content: "\007C ";
            opacity: 0;
            /*visibility:hidden;*/
            /*font-size:0;*/
            /*height:0;*/
            /*clear:both;*/
          }
          p:nth-child(odd) {
            text-align: right;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分省略号显示*/
          }

          p:nth-child(even) {
            text-align: left;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分省略号显示*/
          }

          .allocationListBoot {
            width: 100%;
            float: left;
            height: 32px;
            line-height: 32px;
            display: flex;
            justify-content: space-between;
            margin-top: 10px;

            .allocationListBootLi {
              position: relative;
              span:nth-child(1) {
                font-size: 16px;
                /*width: 45px;*/
                /*height: 45px;*/
                /*line-height: 45px;*/
                text-align: center;
                float: left;
                border: 1px dashed #aeaeae;
                color: #aeaeae;

              }

              span:nth-child(2) {
                font-size: 16px;
                /*width: 45px;*/
                /*height: 45px;*/
                /*line-height: 45px;*/
                text-align: center;
                color: #aeaeae;
                padding-left: 10px;
                float: left;
                position: absolute;
                z-index: 99;
              }
            }

          }
        }
      }
    }

  }
  .infoNum{
    position: absolute;
    right: 30px;
    top: 25%;
    font-size: 18px;
    color: #97a8be;
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
