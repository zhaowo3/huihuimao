<template>
  <el-row class="detailsScroll">
    <div class="templateSubject" style="overflow: hidden;">
      <div style="height: 100%;">
        <div style="height: 100%;overflow-y: auto;overflow-x: hidden" v-infinite-scroll="morescall"
             infinite-scroll-disabled="busy"
             infinite-scroll-distance="10">
          <el-row :gutter="12">
            <el-col :span="12" v-for="(item,index) in leftInfo.houseList" :key="index" class="columnSearch">
              <el-row class="templateLis">
                <div class="templateHover">
                  <div class="templateImg">
                    <el-image :src="item.imgUrl">
                      <div slot="error" class="image-slot">
                        <img alt=""  :src="smalls">
                      </div>
                      <div slot="placeholder" class="image-slot">
                        <img alt=""  :src="smalls">

                      </div>
                    </el-image>
                  </div>
                  <el-card class="templateR templateHeight">
                    <div style="position: relative; height: 100%;display: flex;">
                      <el-col :span="18" style='position: relative;height: 100%;'>
                        <h4>{{item.name}}</h4>
                        <span class="templateTitle">{{item.size}}</span>
                        <h3>{{item.hisCode}}</h3>
                        <div class="leftHightS">
                          <span class="templateSpan"><b>库位:</b><p>{{item.location}}</p></span>
                          <!--                        <el-button class="templateOK" v-if="" @click="munOK(item)">打开</el-button>-->
                        </div>

                      </el-col>
                      <el-col :span="6" style='position: relative;height: 100%;'>
                        <div class="templateTime"><b>{{item.dif}}天</b>
                          <p>剩余:</p><span>{{item.time}}</span></div>
                        <p class="templateP">{{item.warnQuantity}}{{item.bigUnitDesc}}</p>
                        <el-button class="templateButton" v-if="item.type==1">包</el-button>
                      </el-col>
                    </div>


                  </el-card>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script>
  import smalls from '@/assets/images/small.jpg';
  import big from '@/assets/images/big.jpg';
  import {
    searchS
  } from '@/api/systemsL'
  // import PullTo from 'vue-pull-to'
  import {
    catalogs, catalget
  } from '@/api/material';

  export default {
    name: "MaterialEnter",
    // components: {
    //   PullTo
    // },
    data() {
      return {
        leftInfo: {
          houseList: [],
          searchHouse: {
            pageSize: 10,
            pageNumber: 1,
          },
          houseNum: '',
        },
        busy: false,
        cur: 0,
        danViews: {},
        danViewsLoadding: false,
        smalls,
        big,
        required1: false,
        value2: '',
        orderVoData: [],
        filesList: [],
        childrenMessage: '',
      }

    },
    props: {
      btnText: String,
      btnTextT: String,
      required: true,
      datasd: Array,

    },
    // created() {
    //   this.moreShow11();
    // },


    methods: {
      moreShow11(val) {
        mv.leftInfo.searchHouse = [];
        mv.busy = true;// 将无限滚动给禁用
        this.morescall(val);
      },
      //点击更多
      morescall(childrenMessage, i) {
        let mv = this;
        if (!mv.busy) {
          mv.busy = true;// 将无限滚动给禁用
          mv.leftInfo.searchHouse.pageNumber++ // 增加页数
          mv.querySearch(childrenMessage, i);// 请求数据
        }
        // mv.leftInfo.searchHouse.pageNumber=1;
        // mv.leftInfo.houseList=[];
        // mv.querySearch(childrenMessage);
      },
      //点击更多
      querySearch(childrenMessage) {
        let mv = this;
        let hou = this.leftInfo.searchHouse;
        let Interface = mv.Interface;
        hou.keyWords = childrenMessage;
        searchS(this.Qs.stringify(hou)).then(res => {
          if(res.code=='-1'){
            this.$message({
              message: res.msg,
              type: 'error',
                duration: 1000
            });
            return
          }
          let listTotal = res.data.materials.total;
          if (listTotal > 0) {
            this.busy = true
          } else {
            this.busy = false
          }
          this.loading = false;
          mv.leftInfo.houseList = mv.leftInfo.houseList.concat(res.data.materials.result);
          let DownloadTotal =
            (mv.leftInfo.searchHouse.pageNumber + 1) * mv.leftInfo.searchHouse.pageSize;
          let total = res.data.materials.total;
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
        }).catch(function (error) {
          this.$message.error(error);
          this.droping = false
        });
      },
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .detailsScroll {
    height: 100%;
    position: relative;

  }

  .templateSubject {
    overflow: auto;
    height: 100%;

    .templateLis {
      padding-bottom: 20px;
    }

    .templateImg {
      width: 246px;
      height: 166px;
      float: left;

      img {
        width: 100%;
        height: 100%;
        float: left;
      }
    }

    .templateR {
      height: 100%;

      h4 {
        font-size: 24px;
        font-weight: normal;
      }

      h3 {
        font-size: 16px;
        color: #00adf8;
        margin-top: 10px;
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

      .leftHightS {
        position: absolute;
        bottom: 0;
        width: 100%;

      }

      .templateSpan {
        float: left;
        font-size: 16px;
        margin-top: 10px;

        b {
          float: left;
          font-weight: normal;
        }

        p {
          float: left;

        }
      }

      .templateTitle {
        display: block;
        font-size: 16px;
        padding-top: 8px;
        color: #8e8e8e;
      }
      .templateTitle::before{
        content:"\007C ";
        opacity:0;
      }
    }

    .templateHover {
      display: initial;
      float: left;
      width: 100%;
      height: 170px;
      position: relative;
    }
  }
</style>
