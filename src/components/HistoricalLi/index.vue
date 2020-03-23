<template>
  <el-main class="detailsScroll">
    <el-row :gutter="20" class="detailsMain" :class="{'traygranH':$route.query.materialOut==0}">
      <div style="height: 100%" >
        <el-col :span="12" class="detailsCot" v-for="(item,index) in materials" :key="index" id="hamburger-detailsCot">
          <div class="detailsHover" @click="BClick(materials,index,item)" :class="{'traygran':item.buttons}" >
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
                <h4 :title="item.materialName">{{item.materialName}}</h4>
                <h4 :title="item.aliasName">{{item.aliasName}}</h4>
                <span class="detailsSpanH">{{item.size}}</span>
                <span class="detailsSpan"><p>{{item.storehouse}}</p></span>
                <span class="detailsTitle">{{item.remarks}}</span>
                <div class="allocationT" v-if="dialogVisible"><p>已提取</p><b>{{item.awayQuantity}}</b></div>
                <div class="allocationListBoot">
                  <div class="allocationListBootLi" :span="8">
                    <el-tag>应</el-tag>
                    <span>{{item.supplyQuantity}}</span></div>
                  <div class="allocationListBootLi" :span="8">
                    <el-tag>已</el-tag>
                    <span>{{item.awayQuantity}}</span></div>
                  <div class="allocationListBootLi" :span="4">
                    <div class="allocationStorehouse"><p>库位：</p><b>{{item.location}}</b></div>
                  </div>
                  <div class="allocationListBootLi" :span="4">
<!--                    <div class="nextI">-->
<!--                      <el-button type="primary" @click="clickDeletes(newData.id)"><i-->
<!--                        class="iconfont icon-shanchu-"></i>删除-->
<!--                      </el-button>-->
<!--                    </div>-->
<!--                    <el-button type="primary" @click="handleAdd(item)"  class="buttonBored" icon="el-icon-check"-->
<!--                               circle></el-button>-->
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
        <div v-if="isFinsh"
             style="text-align: center;color: #ddd;border: none; margin-top: 10px; margin-bottom: 5px;font-size: 16px">
          没有更多数据了
        </div>
      </div>
    </el-row>
  </el-main>

</template>

<script>
  import smalls from '@/assets/images/small.jpg';

  export default {
    name: "HistoricalLi",
    data() {
      return {
        // item:[
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6'},
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6'},
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6'},
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6'},
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6'},
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6'},
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6'},
        //   {name:'三期宝',storehouse:'2-2-1',remarks:'施爱得NPCM-100-2-B',amount:'6'},
        //   ],
        num: 1,
        smalls,

      }

    },
    props: {
      materials: {
        type: Array,
      },
      isFinsh: false,
      dialogVisible: false,
    },
    methods: {
      BClick(data, index,item) {
          let showIndex = 0;
          data.forEach((item)=>{

              if(item.supplyQuantity-item.awayQuantity!==0){
                  item.showIndex = showIndex;
                  item.numMax=item.supplyQuantity-item.awayQuantity;
                  item.numMin=1;
                  item.num1=item.supplyQuantity-item.awayQuantity;
                  showIndex++
              }
          })
        this.$emit('BClickli', data, index,data[index]);
      },
      openT(data, index) {
        this.$emit('openF', data, index);
      },
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .detailsScroll {
    height: calc(100% - 218px);
    position: relative;
  }
  .traygran{
      background: #ddd !important;
      cursor: not-allowed;
      pointer-events:none;

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
  .traygranH{
    background: #ddd !important;
    cursor: not-allowed;
    pointer-events:none;
    opacity: 0.6;
  }
  .detailsMain {
    overflow: auto;

    .detailsCot {
      height: 100%;
      margin-bottom: 20px;

      .detailsHover {
        display: initial;
        float: left;
        width: 100%;
        height: 100%;
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
        .heightNominal {
          height: 100%;
          position: relative;

          .el-card__body {
            height: 100%;

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
          h4::after{
            content:"\007C ";
            opacity:0;
          }
          h3 {
            font-size: 26px;
            float: left;
            position: absolute;
            bottom: 30px;
            color: #00adf8;
          }

          .detailsNum {
            position: absolute;
            right: 80px;
            bottom: 25px;
          }

          .detailsButton {
            position: absolute;
            right: 20px;
            background: #1dcfbd;
            color: #fff;
            bottom: 25px;
            font-size: 16px;
            padding-left: 15px;
            padding-right: 15px;
          }

          .detailsSpan {
            float: right;
            font-size: 18px;

            p {
              float: right;
            }
          }
          .detailsSpan::after,.detailsSpanH::after {
            content:"\007C ";
            opacity:0;
          }
          .detailsSpanH {
            float: left;
            font-size: 14px;
            width: 100%;
            margin-top: 10px;
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

          .allocationT {
            position: absolute;
            right: 20px;
            top: 70px;
            font-size: 24px;
            color: #26d1c2;

            p {
              float: left;
            }

            b {
              float: left;
              margin-left: 10px;

            }
          }

          .allocationListBoot {
            width: 100%;
            float: left;
            height: 30px;
            line-height: 30px;
            display: flex;
            justify-content: space-between;
            position: relative;

            .allocationListBootLi {
              .allocationStorehouse {
                font-size: 16px;

                p {
                  float: left;
                }

                b {
                  float: left;
                }
              }

              span:nth-child(1) {
                font-size: 16px;
                /*width: 45px;*/
                /*height: 100%;*/
                /*padding-right: 10px;*/
                /*padding-left: 10px;*/
                /*line-height: 45px;*/
                text-align: center;
                float: left;
                border: 1px dashed #00b2ed;
                color: #00b2ed;
              }

              span:nth-child(2) {
                font-size: 16px;
                /*width: 45px;*/
                /*height: 45px;*/
                /*padding-right: 10px;*/
                padding-left: 10px;
                /*line-height: 45px;*/
                text-align: center;
                color: #00b2ed;
                float: left;
              }

              .buttonBored {
                float: left;
                width: 50px;
                height: 50px;
                margin-top: -15px;
              }
            }

          }
        }

      }
    }

  }

</style>
