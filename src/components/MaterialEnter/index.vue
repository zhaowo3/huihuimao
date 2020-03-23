<template>
  <el-row class="detailsScroll">
    <div class="templateSubject" style="overflow: hidden;">

      <el-col :span="8" class="templateLeft" style="overflow: hidden;">

        <div class="templateLeft" style="overflow: hidden;">
          <ul class="clearfix" id="leftBox">
            <li v-for="(data,index) in dataDrug" :key="index" :class="index==cur?'hit':''"
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
                <div class="templateLeftSpan"><p>{{data.name}}</p><span>库位:{{data.location}}</span>
                  <el-button class="templateButton" v-if="data.type==1">包</el-button>
                </div>
              </el-main>
            </li>
            <li v-if="leftInfo.loading"
                style="text-align: center;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;">正在加载，请稍后
            </li>
            <li v-if="leftInfo.isFinsh"
                style="text-align: center;color: #ddd;border: none; margin-top: 10px; margin-bottom: 5px;">没有更多数据了
            </li>
            <!--          <span  class="show-msg" >这里什么都没有了哦</span>-->
          </ul>
        </div>


      </el-col>


      <el-col :span="16" class="templateRight" style="display: block">
        <!--        <div v-if="danViewsLoadding" class="danViewsLoadding">正在加载</div>-->
        <div>
          <el-main>
            <el-container>
              <div class="listHeader" v-for="(data,index) in dataDrug" :key="index">
                <div class="listHeaderOne">
                  <el-col :span="12"><h3>{{data.name}}</h3></el-col>
                  <el-col :span="12"><h4>{{data.location}}</h4>
                    <p>库位:</p></el-col>
                </div>
                <div class="listHeaderTwo">
                  <span>{{data.size}}</span>
                  <el-button v-if="required">{{btnText}}</el-button>
                  <el-button v-else="required1">{{btnTextT}}</el-button>
                </div>
                <div class="picturesList">
                  <div class="picturesListImg">
                    <el-image :src="data.imgUrl">
                      <div slot="error" class="image-slot">
                        <img alt=""  :src="big">
                      </div>
                      <div slot="placeholder" class="image-slot">
                        <img alt=""  :src="big">

                      </div>
                    </el-image>
                    <i class="iconfont icon-mianma-" v-if="data.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i><i class="iconfont icon-yiwuyima" v-if="data.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i></div>
                  <div class="picturesListCenter">
                    <el-row>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>包装单位</p><span>{{data.bigUnitDesc}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>最小单位</p><span>{{data.smallUnitDesc}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>数量</p><span>{{data.supplyQuantity}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>预警数量</p><span>{{data.warnQuantity}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple"><p>是否启用</p><span>{{data.isDel===null?'是':'否'}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple-light"><p>计费</p><span>{{data.isFee===null?'是':'否'}}</span>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple-light"><p>关联HIS</p><span>{{data.hisCode}}</span></div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple-light"><p>拼音</p><span>{{data.pinyin}}</span></div>
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

  export default {
    name: "MaterialEnter",
    // components: {
    //   PullTo
    // },
    data() {
      return {
        leftInfo: {
          loading: false,
          isFinsh: false,  //是否完成加载
          allSize: '',
          pageSize: 0,
          pageNumber: 1,
          dataList: [],
        },
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
        filesList: []
      }

    },
    props: {
      btnText: String,
      btnTextT: String,
      required: true,
      datasd: Array,
      dataDrug: {
        type: Array,
        // default:function () {
        //   return [];
        // }
      },
    },
    created() {
      // this.getMoreList();
    },
    mounted() {
      // this.eventsBand( document.querySelectorAll('.templateLeft')[1]).then(res=>{
      //   let item=datasd;
      //   if(item.length>0) {
      //     this.infoViews(item[0].id,0)
      //   }
      // })
    },
    methods: {
      // btnText(){
      //   this.$emit('btnText')
      // },

      eventsBand(e) {
        // return new Promise(resolve => {
        //   let ev=e.target||e;
        //   let el=document.querySelector('#leftBox');
        //   if(ev.offsetHeight>el.offsetHeight) {
        //     resolve(this.getMoreList());
        //   }else if(ev.scrollHeight==el.offsetHeight){   //到底了 我们需要加载
        //     resolve(this.getMoreList());
        //   }
        // })
      },
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
          width: 100%;
          height: 580px;

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
