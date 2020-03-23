<template>
  <el-row class="detailsScroll">
    <div class="templateSubject">

      <el-col :span="8" class="templateLeft" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
              infinite-scroll-distance="10" v-loading="listLoading">

        <ul class="clearfix" id="leftBox">
          <li v-for="(data,index) in houseList" :data1="data.id" :key="index" :class="index==cur?'hit':''"
              @click="infoViews(data.id,index)">
            <el-main>
              <div class="templateLeftImg">
                <el-image :src="data.imgUrl">
                <div slot="error" class="image-slot">
                  <img alt=""  :src="smalls">
                </div>
                <div slot="placeholder" class="image-slot">
                  <img alt=""  :src="smalls">

                </div>
              </el-image>
                <i class="iconfont icon-mianma-" v-if="data.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i><i class="iconfont icon-yiwuyima" v-if="data.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i></div>
              <div class="templateLeftSpan"><p>{{data.name}}</p><span>库位：{{data.location}}</span>
                <el-button class="templateButton" v-if="data.type==1">包</el-button>
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


      </el-col>


      <el-col :span="16" class="templateRight" style="display: block">
        <!--        <div v-if="danViewsLoadding" class="danViewsLoadding">正在加载</div>-->
        <div>
          <el-main>
            <el-container>
              <div class="listHeader" v-if="Object.keys(danViews).length>0">
                <div class="listHeaderOne">
                  <el-col :span="12"><h3>{{danViews.name}}</h3></el-col>
                  <el-col :span="12"><h4>{{danViews.location}}</h4>
                    <p>库位：</p></el-col>
                </div>
                <div class="listHeaderTwo">
                  <span>{{danViews.size}}</span>
                  <el-button v-if="required" type="primary">{{btnText}}</el-button>
                  <el-button v-else="required1" type="primary">{{btnTextT}}</el-button>
                </div>
                <div class="picturesList">
                  <div class="picturesListImg">
                    <el-image :src="danViews.imgUrl">
                      <div slot="error" class="image-slot">
                        <img alt=""  :src="big">
                      </div>
                      <div slot="placeholder" class="image-slot">
                        <img alt=""  :src="big">

                      </div>
                    </el-image>
                  </div>
                  <div class="picturesListCenter">
                    <el-row>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>包装单位</p><span>{{danViews.bigUnitDesc}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>最小单位</p><span>{{danViews.smallUnitDesc}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>数量</p><span>{{danViews.supplyQuantity}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>预警数量</p><span>{{danViews.warnQuantity}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>是否启用</p><span>{{danViews.isDel===null?'是':'否'}}</span>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple-light"><p>计费</p>
                          <span>{{danViews.isFee===null?'是':'否'}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple-light"><p>关联HIS</p><span>{{danViews.hisCode}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple-light"><p>拼音</p><span>{{danViews.pinyin}}</span></div>
                      </el-col>
                    </el-row>

                  </div>
                </div>

                <!--                <el-row class="picturesBun"><el-button>查看更多</el-button></el-row>-->
                <!--                <div style="display: none">-->
                <!--                  <el-date-picker-->
                <!--                    v-model="value2"-->
                <!--                    align="right"-->
                <!--                    type="date"-->
                <!--                    placeholder="选择日期"-->
                <!--                    :picker-options="pickerOptions">-->
                <!--                  </el-date-picker>-->
                <!--                </div>-->
                <!--                <ul>-->
                <!--                  <li  v-for="(news,index) in da.temp" :key="index">-->
                <!--                    <el-row class="templateLis">-->
                <!--                      <div class="templateHover">-->
                <!--                        <div class="templateImg">-->
                <!--                          <img :src="smalls">-->
                <!--                        </div>-->
                <!--                        <el-card class="templateR">-->
                <!--                          <h4>{{news.title}}</h4>-->
                <!--                          &lt;!&ndash;                  <span class="templateSpan">库位:<p>{{news.storehouse}}</p></span>&ndash;&gt;-->
                <!--                          <span class="templateTitle">{{news.remarks}}</span>-->
                <!--                          <h3>{{news.amount}}</h3>-->
                <!--                          <p>8</p>-->
                <!--                          <el-button class="templateButton">包</el-button>-->
                <!--                        </el-card>-->
                <!--                      </div>-->
                <!--                    </el-row>-->
                <!--                  </li>-->
                <!--                </ul>-->
                <!--                <div class="templateAdd">-->
                <!--                  <el-button style="margin:0 auto;padding: 0.104167rem 0.104167rem"><svg-icon icon-class="add" class="color-main"></svg-icon></el-button>-->
                <!--                </div>-->
              </div>

            </el-container>
          </el-main>
        </div>
      </el-col>
    </div>
  </el-row>
</template>

<script>
  import smalls from '@/assets/images/small.jpg';
  import big from '@/assets/images/big.jpg';
  // import PullTo from 'vue-pull-to'
  import {
    catalogs, catalget
  } from '@/api/material';
  import {
    openL, closeL, searchS
  } from '@/api/systemsL'

  export default {
    name: "GroupTabulation",
    // components: {
    //   PullTo
    // },
    data() {
      return {
        // leftInfo:{
        //   loading:false,
        //   isFinsh:false,  //是否完成加载
        //   allSize:'',
        //   pageSize:0,
        //   pageNumber:1,
        //   dataList:[],
        // },
        houseList: [],
        searchHouse: {
          pageSize: 10,
          pageNumber: 1,
          columnName: 'supply_quantity',
          orderType: 'desc',
          keyWords: '',
        },
        busy: false,
        listLoading: false,
        droping: false,
        noMore: false,
        loading: false,
        cur: 0,
        danViews: {},
        danViewsLoadding: false,
        smalls,
        big,
        required1: false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
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
          }]
        },
        value2: '',
        orderVoData: [],
        filesList: [],
        datas: '',
      }

    },
    props: {
      btnText: String,
      btnTextT: String,
      required: true,
    },
    // created() {
    //   this.getMoreList();

    // },
    mounted() {

      // this.infoViews(11, 0);

    },
    methods: {


      munOK(data) {
        let vm = this;
          this.$store.state.LibraryLo=data.location;
        openL(data.location).then(res => {
          if(res.code=='-1'){
            this.$message({
              message: res.msg,
              type: 'error',
            });
            return
          }
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

          if (!this.busy) {
            this.busy = true;// 将无限滚动给禁用
            this.searchHouse.pageNumber++ // 增加页数
            this.searchSource() // 请求数据

          }
        }, 500);
      },
      searchSource() {
        let mv = this;
        catalogs({
          pageSize: this.searchHouse.pageSize,
          pageNumber: this.searchHouse.pageNumber
        }).then(response => {
          if(response.code=='-1'){
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
          mv.houseList = mv.houseList.concat(response.data.result)
          let DownloadTotal =
            (mv.searchHouse.pageNumber + 1) * mv.searchHouse.pageSize;
          let total = response.data.total;
          mv.houseNum = response.data.total;
          let totalPage = (mv.houseNum + mv.searchHouse.pageSize - 1) / mv.searchHouse.pageSize;
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
        }).catch(function (error) {
          this.$message.error(error);
          this.droping = false
        });


      },
      //     eventsBand(e){
      //       return new Promise(resolve => {
      //         let ev=e.target||e;
      //         let el=document.querySelector('#leftBox');
      //         if(ev.offsetHeight>el.offsetHeight) {
      //           resolve(this.getMoreList());
      //
      //         }else if(ev.scrollHeight==el.offsetHeight){   //到底了 我们需要加载
      //           resolve(this.getMoreList());
      //           this.leftInfo.isFinsh=false;
      //
      //         }
      //       })
      // },
      //  列表头部
      // getMoreList() {
      // return  new Promise((resolve, reject)=>{
      //   if(this.leftInfo.isFinsh){
      //     return  false
      //   }
      //   if(this.leftInfo.loading){
      //     return false;
      //   }
      //   this.leftInfo.loading=true;
      //   this.leftInfo.pageSize+=10;
      //   catalogs({
      //     pageSize:this.leftInfo.pageSize,
      //     pageNumber:this.leftInfo.pageNumber
      //   }).then(res=>{
      //       this.leftInfo.allSize=res.data.total;
      //       this.leftInfo.dataList=res.data.result;
      //       this.leftInfo.loading=false;
      //       if(this.leftInfo.allSize<=this.leftInfo.pageSize){
      //         this.leftInfo.isFinsh=true;
      //       }else{
      //         this.leftInfo.isFinsh=false;
      //         this.eventsBand( document.querySelectorAll('.templateLeft')[1]);
      //       }
      //       resolve(res);
      //   })
      // })
      // },
      infoViews(id, index) {

        this.cur = index;
        this.danViewsLoadding = true;
        catalget(id).then(res => {
          if(res.code=='-1'){
            this.$message({
              message: res.msg,
              type: 'error',
            });
            return
          }
          this.danViews = res.data;
          this.danViewsLoadding = false;
        })
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

    .templateLeft {
      background: #fff;
      height: 100%;
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

        .templateLeftImg {
          width: 138px;
          height: 90px;
          float: left;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .templateLeftSpan {
          padding-left: 20px;
          float: left;
          width: calc(100% - 138px);

          p {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            height: 45px;
          }

          span {
            float: left;
            font-size: 16px;
            margin-top: 10px;
            width: 100%;
          }

          button {
            float: right;
            color: #0eb2ea;
            border: 2px dashed #0eb2ea;
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

    .templateRight {
      margin: 0;
      height: 100%;
      overflow-y: auto;
      position: relative;

      .danViewsLoadding {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        font-size: .3rem;
        color: #fff;
        z-index: 19970806114;
      }

      .picturesList {
        float: left;
        width: 100%;
        margin-top: 20px;

        .picturesListImg {
          width: 80%;
          display: block;
          margin: 0 auto;
          height: auto;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .picturesListCenter {
          .grid-content {
            line-height: 40px;
            height: 40px;
            float: left;
          }

          span {
            font-size: 16px;
            float: left;
          }

          p {
            font-size: 16px;
            float: left;
            padding-right: 28px;
          }

        }
      }

      .picturesBun {
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        float: left;
        width: 100%;

        button {
          background: #1fd7d8;
          color: #fff;
          display: block;
          margin: 0 auto;
          padding: 15px 30px;
        }
      }

      .listHeader {
        justify-content: space-between;

        .listHeaderOne {
          width: 100%;
          font-weight: normal;
          float: left;

          h3 {
            font-size: 26px;
            float: left;
            font-weight: normal;
          }

          p {
            font-size: 24px;
            float: right;
            font-weight: normal;
          }

          h4 {
            font-size: 24px;
            float: right;
            font-weight: normal;
          }
        }

        .listHeaderTwo {
          width: 100%;
          float: left;
          margin-top: 10px;

          span {
            font-size: 16px;
            float: left;
          }

          button {
            /*font-size: 24px;*/
            float: right;
            /*background: #1fd7d8;*/
            /*color: #fff;*/
          }
        }


      }

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
        height: 170px;
        position: relative;
      }

      .templateHover:hover {
        border-width: 2px;
        border-color: #13bdf6;
        border-style: solid;
      }

      .el-card__body {
        height: 100%;
        position: relative;
      }

      li {
        float: left;
        width: 100%;

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

          p {
            float: right;
            font-size: 36px;
            position: relative;
            bottom: 50px;
            right: 10px;
          }

          .templateNum {
            position: absolute;
            right: 80px;
            bottom: 25px;
          }

          .templateButton {
            position: absolute;
            right: 20px;
            background: #0eb2ea;
            color: #fff;
            bottom: 25px;
            font-size: 16px;
            padding-left: 15px;
            padding-right: 15px;
          }

          .templateSpan {
            float: right;
            font-size: 18px;

            p {
              float: right;
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


      }
    }
  }
</style>
