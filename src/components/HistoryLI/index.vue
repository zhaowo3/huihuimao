<template>
  <el-main class="detailsScroll">
    <el-row :gutter="20" class="detailsMain">
      <div style="height: 100%">
        <el-col :span="12" class="detailsCot" v-for="(item,index) in materials" :key="index">
          <div class="detailsHover" @click="BClick(item,index)">
            <div class="detailsImg">
              <el-image :src="item.imgUrl">
                <div slot="error" class="image-slot">
                  <img alt=""  :src="smalls">
                </div>
                <div slot="placeholder" class="image-slot">
                  <img alt=""  :src="smalls">

                </div>
              </el-image>
            </div>
            <el-card class="detailsRight">
              <div style="position: relative;height: 100%;">
                <h4>{{item.materialName}}</h4>
                <h4>{{item.aliasName}}</h4>
                <span class="detailsSpan"><p>{{item.storehouse}}</p></span>
                <span class="detailsTitle">{{item.size}}</span>
                <div class="allocationT" v-if="dialogVisible"><p>已提取</p><b>{{item.awayQuantity}}</b></div>
                <div class="allocationListBoot">
                  <div class="allocationListBootLi" :span="6">
                    <el-tag>应 配</el-tag>
                    <span>{{item.quantity}}</span></div>
                  <div class="allocationListBootLi" :span="6">
                    <el-tag>已 取</el-tag>
                    <span>{{item.supplyQuantity}}</span></div>
                  <div class="allocationListBootLi" :span="6">
                    <el-tag>已 退</el-tag>
                    <span>{{item.realQuantity}}</span></div>
                  <div class="allocationListBootLi" :span="6">
                    <div class="allocationStorehouse"><p>库位：</p><b>{{item.location}}</b></div>
                  </div>
                  <!--              <div class="allocationListBootLi" :span="4"a><el-button type="primary" @click="handleAdd(item)" class="buttonBored" icon="el-icon-check" circle></el-button></div>-->
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
    name: "HistoryLi",
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
      BClick(data, index) {
        this.$emit('BClickli', data, index);
      },
      openT(data, index) {
        this.$emit('openF', data, index);
      },
      // handleAdd(item){
      //   this.$emit('showChange',item);
      // }
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .detailsScroll {
    height: calc(100% - 218px);
    position: relative;
  }

  .detailsMain {
    overflow: auto;

    .detailsCot {
      height: 170px;
      margin-bottom: 20px;

      .detailsHover {
        display: initial;
        float: left;
        width: 100%;
        height: 100%;
      }

      .detailsHover:hover {
        border-width: 2px;
        border-color: #13bdf6;
        border-style: solid;
      }

      .detailsImg {
        width: 246px;
        height: 166px;
        float: left;

        img {
          width: 100%;
          height: 100%;
          float: left;
        }
      }

      .detailsRight {
        margin: 0;
        height: 100%;

        .el-card__body {
          height: 100%;
          position: relative;
        }

        h4 {
          font-size: 24px;
          float: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
width: 100%;
        }
        h4::before,h3::before {
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

        .detailsTitle {
          width: 100%;
          font-size: 14px;
          float: left;

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
          height: 45px;
          line-height: 45px;
          display: flex;
          justify-content: space-between;
          margin-top: 25.2px;
          position: absolute;
          bottom: 0;

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
              height: 100%;
              padding-right: 10px;
              padding-left: 10px;
              line-height: 45px;
              text-align: center;
              float: left;
              border: 1px dashed #00b2ed;
              color: #00b2ed;
            }

            span:nth-child(2) {
              font-size: 16px;
              /*width: 45px;*/
              height: 45px;
              padding-right: 10px;
              padding-left: 10px;
              line-height: 45px;
              text-align: center;
              color: #00b2ed;
              float: left;
            }

            .buttonBored {
              float: left;
              width: 50px;
              height: 50px;
            }
          }

        }
      }
    }

  }

</style>
