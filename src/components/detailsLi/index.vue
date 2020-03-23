<template>
  <el-main class="detailsScroll">
    <el-row :gutter="20" class="detailsMain" :class="{'traygranH':$route.query.materialReturn==0}">
      <div style="height: 100%">
        <div id="leftBox">
          <el-col :span="12" class="detailsCot" v-for="(item,index) in materials" :key="index" id="hamburger-detailsMains">
            <div class="detailsHover" @click="handleAdd(materials,index,item)" :class="{'traygran':item.useQuantity==0}">
              <div class="detailsImg">
                <el-image :src="item.imgUrl">
                  <div slot="error" class="image-slot">
                    <img alt="" :src="smalls" >
                  </div>
                  <div slot="placeholder" class="image-slot">
                    <img alt="" :src="smalls" >
                  </div>

                </el-image>
                <i class="iconfont icon-mianma-" v-if="item.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i><i class="iconfont icon-yiwuyima" v-if="item.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i>
              </div>
              <el-card class="detailsRight">
                <div class="heightNominal">
                  <h4>{{item.materialName}}</h4>
                  <h4>{{item.aliasName}}</h4>
                  <span class="detailsSpanH" :title="item.size">{{item.size}}</span>
                  <span class="detailsSpan">库位：<p>{{item.location}}</p></span>

                  <div class="bottomN">
                    <h3 style="width: 40%;">已用--{{item.useQuantity}}{{item.smallUnitDesc}}</h3>
                    <h3 style="width: 40%;">已退--{{item.returnQuantity}}{{item.smallUnitDesc}}</h3>
                    <!--              <el-input-number v-model="item.returnQuantity" @change="handleChange" :min="0" :max="item.quantity" label="描述文字" class="detailsNum"></el-input-number>-->
                    <el-button class="detailsButton" :class="{'detailgrey':item.useQuantity==0}" >退</el-button>
                  </div>
                </div>

              </el-card>
            </div>
          </el-col>
          <div v-if="loading"
               style="text-align: center;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px">
            正在加载，请稍后
          </div>
          <div v-if="isFinsh"
               style="text-align: center;color: #ddd;border: none; margin-top: 10px; margin-bottom: 5px;font-size: 16px">
            没有更多数据了
          </div>
        </div>
      </div>
    </el-row>
  </el-main>

</template>

<script>
  import smalls from '@/assets/images/small.jpg';
  import {
    detailns
  } from '@/api/home'

  export default {
    name: "detailsLi",
    data() {
      return {
        // item:[
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6',num: 1},
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6',num: 1},
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6',num: 1},
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6',num: 1},
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6',num: 1},
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6',num: 1},
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6',num: 1},
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6',num: 1},
        //   ],
        num: 1,
        smalls,
        detailgrey:'',

      }

    },
    props: {
      materials: {
        type: Array,
      },
      isFinsh: false,
      loading: false,
    },
    mounted() {
    },
    methods: {
      // handleChange(value) {
      //   console.log(value);
      // },
      handleAdd(data, index,item) {
          let showIndex = 0;
          data.forEach((item)=>{

              if(item.awayQuantity>0){
                  item.showIndex = showIndex;
                  item.numMax=item.awayQuantity-item.returnQuantity;
                  item.numMin=1;
                  item.num1=item.awayQuantity-item.returnQuantity;
                  showIndex++
              }
          })
        this.$emit('showChange', data, index,data[index]);
      }
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .detailgrey{

      cursor: not-allowed;
      pointer-events:none
    }
  .traygran{
    background: #ddd !important;
    cursor: not-allowed;
    pointer-events:none;
    .heightNominal{
      h4{
        color: #ddd;
      }
      span{
        color: #ddd;
      }
      .allocationStorehouse{
        color: #ddd;
      }
    }

  }
  .traygranH{
    background: #ddd !important;
    cursor: not-allowed;
    pointer-events:none;
    opacity: 0.6;
  }
  .detailsScroll {
    height: calc(100% - 250px);
    position: relative;
  }

  .detailsMain {
    overflow-y: auto;

    .detailsCot {
      height: 100%;
      margin-bottom: 20px;

      .detailsHover {
        display: initial;
        float: left;
        width: 100%;
        height: 100%;
        cursor: pointer;
        position: relative;
      }

      .detailsHover:hover {
        outline: 2px #13bdf6 solid;
        outline-offset: -2px;
      }

      .detailsImg {
        width: 246px;
        height: 100%;
        float: left;
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px;
        img {
          width: 100%;
          height: 100%;
          float: left;
        }
      }

      .detailsRight {
        margin: 0;
        height: 100%;
        padding-left: 246px;
        .el-card__body {
          height: 100%;
          position: relative;
          float: left !important;
        }
        .heightNominal {
          height: 100%;
          position: relative;
          width: 100%;
          .bottomN {
            position: relative;
            width: 100%;
            float: left;
            margin-top: 5px;
          }

          h4 {
            font-size: 24px;
            float: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            /*height: 55px;*/
            width: 100%;
          }
          h4::after,h3::after {
            content:"\007C ";
            opacity:0;
          }
          h3 {
            font-size: 26px;
            float: left;
            line-height: 41px;
            color: #00adf8;
          }

          .detailsNum {
            position: absolute;
            right: 80px;
            bottom: 25px;
          }

          .detailsButton {
            float: right;
            border:1px dashed #1dcfbd;
            color: #1dcfbd;
            bottom: 25px;
            font-size: 16px;
            padding-left: 15px;
            padding-right: 15px;
          }
          .detailsButton:hover{
            color: #fff;
          }
          .detailsSpan {
            float: left;
            font-size: 18px;
            margin-top: 10px;
            p {
              float: right;
            }
          }
          .detailsSpan::after,.detailsSpanH::before {
            content:"\007C ";
            opacity:0;
          }
          .detailsSpanH {
            float: left;
            font-size: 14px;
            width: 100%;
            margin-top: 10px;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分省略号显示*/
            p {
              float: left;
            }
          }
          .detailsTitle {
            width: 100%;
            font-size: 18px;
            float: left;
            padding-top: 8px;
          }
        }
      }
    }

  }

</style>
