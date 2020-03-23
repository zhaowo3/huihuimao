<template>
  <div style="height: 100%;">
    <el-row class="detailsScroll">
      <div class="templateSubject">
        <el-col :span="8" class="templateLeft">
          <ul>
<!--            <li class="addPlus" @click="AdditionPops" id="hamburger-AdditionPops"><i class="iconfont icon-add"></i>导入历史手术订单</li>-->
            <li @click="MaterialM" style="border: 1px solid #66b1ff" :class="{hit: curg ==0}" id="hamburger-MaterialM">自选物资</li>
            <el-col :span="24" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                    infinite-scroll-distance="10" v-loading="listLoading">
            <li v-for="(data,index) in templates"  :key="index" :class="{hit: cur ==index}" :data-id="data.id"
                @click="clickLists(data,index)">{{data.operationName}}
            </li>
            </el-col>
          </ul>
        </el-col>
        <el-col :span="16" class="templateRight">
          <el-main>
            <!--          v-for="data,index in datas" :style="{display: index==cur?'block':'none'}"-->
            <ul v-if="getW">
              <div class="templateAdd" v-if="$route.query.materialAdd==1">
                <el-button class="addHy" @click="$emit('showChange')" id="hamburger-templateAdd">
                  <svg-icon icon-class="add" class="color-main"></svg-icon>
                </el-button>
              </div>
              <li v-for="newData in orderMaterials">
                <el-row class="templateLis">
                  <div class="templateHover">
                    <div class="templateImg">
                      <el-image :src="newData.imgUrl">
                        <div slot="error" class="image-slot">
                          <img alt=""  :src="smalls">
                        </div>
                        <div slot="placeholder" class="image-slot">
                          <img alt=""  :src="smalls">

                        </div>
                      </el-image>
                    </div>
                    <div class="templateR" style="height: 100%;position: relative">
                      <div class="templateS">
                        <div class="nextLeft">
                          <h4 :title="newData.materialName">{{newData.materialName}}</h4>
                          <!--                  <span class="templateSpan">库位:<p>{{data.storehouse}}</p></span>-->
                          <span class="templateTitle">{{newData.size}}</span>
                          <div class="inText">
                            <i><b>应：</b>{{newData.quantity}}</i>
                            <i><b>已：</b>{{newData.supplyQuantity}}</i>
                            <i><b>库存：</b>{{newData.stockQuantity}}</i>
                            <i><b>库位：</b>{{newData.location}}</i>
                            <el-button class="templateButton" v-if="newData.type==1">包</el-button>
                          </div>
                        </div>
                        <div class="nextRight">
                          <p>{{newData.quantity}}{{newData.bigUnitDesc}}</p>
                          <div class="nextI">
                            <el-button type="primary" @click="ToDeposit(newData)" id="hamburger-ToDeposit"
                                         v-if="newData.status!==0&&$route.query.materialIn==1" class="colorsGreen"><i
                              class="iconfont icon-shanchu-1"></i>入单
                            </el-button>
                            <el-button type="primary" @click="clickDeletes(newData.id)" id="hamburger-clickDeletes" v-if="$route.query.materialDel==1"><i
                              class="iconfont icon-shanchu-" ></i>删除
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-row>
              </li>

            </ul>
            <ul v-if="getE">
              <li v-for="news in materials">
                <el-row class="templateLis">
                  <div class="templateHover">
                    <div class="templateImg">
                      <el-image :src="news.imgUrl">
                        <div slot="error" class="image-slot">
                          <img alt=""  :src="smalls">
                        </div>
                        <div slot="placeholder" class="image-slot">
                          <img alt=""  :src="smalls">

                        </div>
                      </el-image>
                    </div>
                    <div class="templateR">
                      <div class="templateS">
                        <div class="nextLeft">
                          <h4 :title="news.materialName">{{news.materialName}}</h4>
                          <!--                  <span class="templateSpan">库位:<p>{{data.storehouse}}</p></span>-->
                          <span class="templateTitle">{{news.size}}</span>
                          <div class="inText">
                            <i><b>应：</b>{{news.quantity}}</i>
                            <i><b>已：</b>{{news.supplyQuantity}}</i>
                            <i><b>库存：</b>{{news.stockQuantity}}</i>
                            <i><b>库位：</b>{{news.location}}</i>
                            <el-button class="templateButton" v-if="news.type==1">包</el-button>
                          </div>
                        </div>
                        <div class="nextRight">
                          <p>{{news.quantity}}{{news.bigUnitDesc}}</p>
                          <div class="nextI">
                            <el-button type="primary" @click="ToDeposit(news)"
                                       v-if="news.status!==0&&news.awayQuantity-news.supplyQuantity>0" class="colorsGreen"><i
                              class="iconfont icon-shanchu-1"></i>入单
                            </el-button>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>
                </el-row>

              </li>
            </ul>
            <!--            <div class="templateAdd">-->
            <!--              <el-button  style="margin:0 auto 50px;padding: 0.104167rem 0.104167rem" @click="$emit('showChange')"><svg-icon icon-class="add" class="color-main"></svg-icon></el-button>-->
            <!--            </div>-->


          </el-main>

        </el-col>
      </div>
    </el-row>


  </div>
</template>

<script>

  import smalls from '@/assets/images/small.jpg';
  import eventBus from '../../utils/eventBus'

  export default {
    name: "TemplateList",
    data() {
      return {
        smalls,
        getW: true,
        getE: false,
      }

    },
    props: {
      templates: {
        type: Array,
      },
      materials: {
        type: Array,
      },
      orderMaterials: {
        type: Array,
      },
      materialAdd:Number,
      materialDel:Number,
      cur: 0,
      curg: 0,

    },
    watch: {},

    methods: {
      // AdditionPops() {
      //   this.$emit('AdditionH');//select事件触发后，自动触发showCityName事件
      // },
      //  删除物资
      clickDeletes(data) {
        // this.getW=false;
        // this.getE=true;
        this.$emit('materialDelete', data);//select事件触发后，自动触发showCityName事件
      },
      ToDeposit(data) {
        this.$emit('ToDepositAdd', data);//select事件触发后，自动触发ToDepositAdd事件
      },
      //  列表左侧列表点击
      clickLists(data, index) {
        this.getW = false;
        this.getE = true;
        this.$emit('showCityName', data, index);//select事件触发后，自动触发showCityName事件
      },
      MaterialM() {
        this.getW = true;
        this.getE = false;
        this.$emit('MaterialS');//追加额外材料
      }
      // addOrUpdatehandle(ture){
      //   eventBus.$emit('ddOrUpdate',this.addOrUpdatehandle)
      // }
      // materialNames(data){
      //   this.materials.push(data);
      //   // for(let v= 0,lens=data.length; v<lens; v++){
      //   //   let resultData = data[v];
      //   //   this.materials.push(data);
      //   // }
      // }
      // rouste(){
      //   this.$router.push({path: '/catalog/catalogWord'})
      // },

    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .addPlus {
    text-align: center !important;
    line-height: 80px;
    display: inline-block !important;

    i {
      padding-right: 20px;
    }
  }
  .addHy{
    margin:0 auto 20px;padding: 0.104167rem 0.104167rem
  }
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
        height: 84px;
        border-bottom-color: #dde8ec;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        padding: 0 20px;
        display: flex;
        align-items: center;
        /*justify-content: center;*/
        b {
          vertical-align: middle;
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

      .templateAdd {
        width: 100%;
        text-align: center;
        box-sizing: border-box;
        display: flex;
      }

      .templateHover {
        display: flex;
        float: left;
        width: 100%;
        height: 100%;
        position: relative;
        background: #fff;

      }

      .templateHover:hover {
        outline: 2px #13bdf6 solid;
        outline-offset: -2px;
      }

      .el-card__body {

        position: relative;
      }

      li {
        float: left;
        width: 100%;

        .templateLis {
          padding-bottom: 20px;
          position: relative;
        }

        .templateImg {
          width: 246px;
          height: 100%;
          float: left;
          position: absolute;
          left: 0;
          top: 0;
          img {
            width: 100%;
            height: 100%;
            float: left;
            padding: 2px;
          }
        }

        .nextLeft {
          width: 70%;
          float: left;
        }

        .nextRight {
          width: 30%;
          float: right;
          position: relative;
          height: 100%;
          .nextI {

            display: flex;
          float: right;
            position: absolute;
            right: 0;
            bottom: 0;
            button {
              margin-left: 20px;
              line-height: 20px;

              span {

              }
            }

            i {
              font-size: 20px;
              color: #fff;
              float: left;
              margin-right: 20px;
            }
          }

        }

        .inText {
          position: relative;
          float: left;

          b {
            padding-right: 10px;
            font-weight: normal;
          }

          i {
            font-size: 20px;
            float: left;
            font-style: normal;
            margin-right: 30px;
          }

        }

        .templateR {
          height: 100%;
          position: relative;
          width: 100%;
          display: flex;
          padding: 20px;
         .templateS{
           padding-left: 246px;
           width: 100%;
         }
          h4 {
            font-size: 24px;
            font-weight: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            height: 55px;
          }
          h4::after,h3::after,span::after {
            content:"\007C ";
            opacity:0;
          }
          h3 {
            font-size: 16px;
            color: #00adf8;
            margin-top: 10px;
          }

          p {
            float: right;
            font-size: 36px;
            width: 100%;
            text-align: right;
          }

          .templateNum {
            position: absolute;
            right: 80px;
            bottom: 25px;
          }

          .templateButton {
            float: left;
            border: 0.010417rem dashed #0eb2ea;
            color: #0eb2ea;
            padding: 10px;
            font-size: 16px;

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
            padding-top: 5px;
            padding-bottom: 5px;
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
